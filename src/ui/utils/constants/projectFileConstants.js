export const fileContentDefault = {
  type: "GET",
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

/*
RESPONSES
{
  time: number,
  status: number,
  reponse: JSON,
  headers: object,
  url: string,
  isPinned: bool,
  queryParams: string,
  headers: []
  body: object,
}
*/
