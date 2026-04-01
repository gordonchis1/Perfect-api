use once_cell::sync::Lazy;
use reqwest::{Client, cookie::Jar};
use std::sync::Arc;
use serde::Serialize;
use std::collections::HashMap;
use reqwest::cookie::CookieStore;
use url::Url;
use serde::Deserialize;

static COOKIE_JAR: Lazy<Arc<Jar>> =
    Lazy::new(|| Arc::new(Jar::default()));

static CLIENT: Lazy<Client> = Lazy::new(|| {
    Client::builder()
        .cookie_provider(COOKIE_JAR.clone())
        .redirect(reqwest::redirect::Policy::limited(10))
        .build()
        .unwrap()
});


#[derive(Serialize)]
pub struct SmartResponse {
    pub status: u16,
    pub statusText: String,
    pub url: String,
    pub headers: HashMap<String, String>,
    pub data: String,
    pub cookies: Vec<String>,
    pub setCookies: Vec<String>,
}

#[derive(Deserialize)]
pub struct SmartRequest {
    pub url: String,
    pub method: String,
    pub headers: Option<HashMap<String, String>>,
    pub body: Option<String>,
}


fn get_cookies_for_url(url: &str) -> Vec<String> {
    let parsed = Url::parse(url).unwrap();

    if let Some(cookies) = COOKIE_JAR.cookies(&parsed) {
        cookies
            .to_str()
            .unwrap_or("")
            .split("; ")
            .map(|c| c.to_string())
            .collect()
    } else {
        vec![]
    }
}

#[tauri::command]
async fn smart_fetch(req: SmartRequest) -> Result<SmartResponse, String> {
    let method = req.method.to_uppercase();

    let mut request = match method.as_str() {
        "GET" => CLIENT.get(&req.url),
        "POST" => CLIENT.post(&req.url),
        "PUT" => CLIENT.put(&req.url),
        "PATCH" => CLIENT.patch(&req.url),
        "DELETE" => CLIENT.delete(&req.url),
        _ => return Err("Unsupported method".into()),
    };

    // headers dinámicos
    if let Some(headers) = req.headers {
        for (key, value) in headers {
            request = request.header(key, value);
        }
    }

    // body raw
    if let Some(body) = req.body {
        request = request.body(body);
    }

    let response = request.send().await.map_err(|e| e.to_string())?;

    let status = response.status();
    let final_url = response.url().to_string();

    // headers completos
    let mut headers_map = HashMap::new();
    for (key, value) in response.headers() {
        headers_map.insert(
            key.to_string(),
            value.to_str().unwrap_or("").to_string(),
        );
    }

    // set-cookie
    let set_cookies = response
        .headers()
        .get_all("set-cookie")
        .iter()
        .map(|v| v.to_str().unwrap_or("").to_string())
        .collect::<Vec<String>>();

    let body = response.text().await.map_err(|e| e.to_string())?;

    let cookies = get_cookies_for_url(&final_url);

    Ok(SmartResponse {
        status: status.as_u16(),
        statusText: status.canonical_reason().unwrap_or("").to_string(),
        url: final_url,
        headers: headers_map,
        data: body,
        cookies,
        setCookies: set_cookies,
    })
}


#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![smart_fetch])
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_persisted_scope::init())
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_dialog::init())
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}


