export function generateV0File(entry) {
    const fileStructure = {
        request: {
            endpoint: entry.request.finalUrl,
            method: entry.request.method,
            headers: entry.request.headers,
            queryParams: entry.request.queryParams,
        },
        reponse: entry.response.body
    }


    return JSON.stringify(fileStructure)
}
