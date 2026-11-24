/**
 * Tipos ambientales de la API que `src/electron/preload.cjs` expone en `window`.
 *
 * Este archivo es solo declarativo: no genera codigo ni se empaqueta, por lo que
 * no afecta al funcionamiento actual de la aplicacion. Su objetivo es que los
 * archivos que se vayan migrando a TypeScript puedan usar `window.fs`,
 * `window.http`, etc. con tipos en lugar de `any`.
 *
 * Los nombres llevan el prefijo `Pa` (Perfect API) para no chocar con tipos de
 * librerias ni con los tipos de dominio que se creen mas adelante.
 */

interface PaHeader {
    key: string;
    value: string;
    isActive: boolean;
}

interface PaQueryParam {
    key: string;
    value: string;
    isActive: boolean;
    id?: string;
}

interface PaRequestBody {
    raw: string;
    type: string;
}

interface PaCookie {
    key: string;
    value: string;
    domain?: string;
    path?: string;
    [key: string]: unknown;
}

interface PaCookieJarJson {
    version?: string;
    storeType?: string;
    rejectPublicSuffixes?: boolean;
    cookies: PaCookie[];
    [key: string]: unknown;
}

interface PaHttpRequestOptions {
    url: string;
    method: string;
    headers: Record<string, string>;
    body?: string;
    data?: unknown;
}

type PaResponseBodyType = "json" | "text" | "html" | "binary";

interface PaResponseBody {
    raw: unknown;
    contentType: string;
    type: PaResponseBodyType;
}

interface PaHttpResponse {
    cookies?: PaCookieJarJson | null;
    status: number;
    statusText: string;
    headers: Record<string, string>;
    body: PaResponseBody | null;
    time: number;
}

interface PaHttpError {
    type: "abort" | "http" | "Network";
    status: number;
    message: string;
}

/**
 * Entrada que devuelve el proceso principal tras ejecutar una peticion.
 * Corresponde a lo que arma `src/ui/utils/entry/entry.js` con la respuesta de
 * `src/electron/main.cjs` + `src/electron/response.cjs`.
 */
interface PaHttpEntry {
    id: string;
    isPinned: boolean;
    request: {
        method: string;
        inputUrl: string;
        headers: PaHeader[];
        queryParams: PaQueryParam[];
        finalUrl: string;
        body: PaRequestBody;
        /** En el codigo original el campo esta escrito con esta errata. */
        timestap: number;
    };
    response?: PaHttpResponse | null;
    error?: PaHttpError | null;
}

interface PaOpenDialogOptions {
    title?: string;
    defaultPath?: string;
    buttonLabel?: string;
    properties?: Array<
        | "openFile"
        | "openDirectory"
        | "multiSelections"
        | "showHiddenFiles"
        | "createDirectory"
        | "promptToCreate"
        | "noResolveAliases"
        | "treatPackageAsDirectory"
        | "dontAddToRecent"
    >;
    filters?: Array<{ name: string; extensions: string[] }>;
}

interface PaElectronApi {
    setTheme(theme: "dark" | "light" | "system"): Promise<void>;
}

interface PaHttpApi {
    fetch(
        options: PaHttpRequestOptions,
        id: string,
        cookies?: PaCookieJarJson | null,
    ): Promise<PaHttpEntry>;
    abort(id: string): Promise<void>;
}

interface PaFileSystemApi {
    readTextFile(path: string): Promise<string>;
    writeTextFile(path: string, content: string): Promise<void>;
    exists(path: string): Promise<boolean>;
    /**
     * El preload solo usa `path`; el segundo argumento se acepta por
     * compatibilidad con las llamadas actuales y se ignora en runtime.
     */
    mkdir(
        path: string,
        options?: { recursive?: boolean },
    ): Promise<string | undefined>;
    remove(path: string): Promise<void>;
    rename(oldPath: string, newPath: string): Promise<void>;
}

interface PaDialogApi {
    openDialog(options?: PaOpenDialogOptions): Promise<string[]>;
}

interface PaPathApi {
    join(...paths: string[]): string;
    appDataDir(): Promise<string>;
    documentDir(): Promise<string>;
}

interface Window {
    electron: PaElectronApi;
    http: PaHttpApi;
    fs: PaFileSystemApi;
    dialog: PaDialogApi;
    path: PaPathApi;
}
