export const fileContentDefault = {
  type: "GET",
  url: {
    inputUrl: "",
    parseUrl: "",
    queryParams: [],
  },
  responses: [],
  headers: [
    { key: "Accept", value: "*/*" },
    {
      key: "Host",
      value: "",
    },
    { key: "User-Agent", value: "PerfectApi/0.1", isActive: true },
  ],
  isRuning: false,
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
}
*/
