export const fileContentDefault = {
    type: "GET",
    cookies: undefined,
    url: {
        inputUrl: "",
        finalUrl: "",
        queryParams: [],
    },
    history: {
        entries: {},
        order: [],
    },
    headers: [
        { key: "Accept", value: "*/*", isActive: true },
        {
            key: "Host",
            value: "",
            isActive: true,
        },
        { key: "User-Agent", value: "PerfectApi/0.1", isActive: true },
    ],
    body: {
        raw: "",
        type: "",
    },
    auth: {
        type: "none",
        data: {},
    },
    isRunning: false,
};

