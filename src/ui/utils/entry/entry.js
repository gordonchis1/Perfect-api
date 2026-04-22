
export const generateEntry = async (content, response, id) => {

    return {
        id,
        isPinned: false,
        request: {
            method: content.type,
            inputUrl: content.url.inputUrl,
            headers: content.headers || [],
            queryParams: content.url.queryParams,
            finalUrl: content.url.finalUrl,
            body: content.body,
            timestap: Date.now(),
        },
        ...response
    };
};
