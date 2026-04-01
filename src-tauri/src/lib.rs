use once_cell::sync::Lazy;
use reqwest::{Client, cookie::Jar};
use std::sync::Arc;
use serde::Serialize;
use std::collections::HashMap;
use reqwest::cookie::CookieStore;
use url::Url;
use serde::Deserialize;
use tokio::sync::Mutex;
use tokio::task::JoinHandle;
use futures::future::{AbortHandle, Abortable};

static COOKIE_JAR: Lazy<Arc<Jar>> =
    Lazy::new(|| Arc::new(Jar::default()));


static ACTIVE_REQUESTS: Lazy<
    Arc<Mutex<HashMap<String, AbortHandle>>>
> = Lazy::new(|| Arc::new(Mutex::new(HashMap::new())));

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
    pub id: String,
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
    let id = req.id.clone();

    let (abort_handle, abort_reg) = AbortHandle::new_pair();

    ACTIVE_REQUESTS.lock().await.insert(id.clone(), abort_handle);

    let result = Abortable::new(async move {
        let mut request = CLIENT.get(&req.url);

        let response = request.send().await.map_err(|e| e.to_string())?;

        let status = response.status();
        let final_url = response.url().to_string();
        let body = response.text().await.map_err(|e| e.to_string())?;

        Ok(SmartResponse {
            status: status.as_u16(),
            statusText: status.canonical_reason().unwrap_or("").to_string(),
            url: final_url,
            headers: HashMap::new(),
            data: body,
            cookies: vec![],
            setCookies: vec![],
        })
    }, abort_reg)
    .await;

    match result {
        Ok(res) => res,
        Err(_) => Err("Request cancelled".into()),
    }
}

#[tauri::command]
async fn cancel_request(id: String) -> Result<(), String> {
    let mut map = ACTIVE_REQUESTS.lock().await;

    if let Some(handle) = map.remove(&id) {
        handle.abort();
    }

    Ok(())
}


#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![smart_fetch, cancel_request])
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


