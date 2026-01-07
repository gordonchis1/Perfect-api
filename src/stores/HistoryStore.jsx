import { create } from "zustand";

export const useHistoryStore = create((set, get) => ({
  history: {
    order: [],
    entries: {},
    currentId: null,
  },

  init: (order, entries) => {
    const entriesObj = {};

    for (const id of order) {
      entriesObj[id] = {
        url: entries[id].request.finalUrl,
        status: entries[id]?.response?.status,
      };
    }

    const latestId = order.length > 0 ? order[0] : null;

    set({ history: { order, entries: entriesObj, currentId: latestId } });
  },

  addEntry: (id, entry) => {
    set((store) => ({
      history: {
        order: [id, ...store.history.order],
        entries: {
          ...store.history.entries,
          [id]: {
            url: entry.request.finalUrl,
            status: entry.response?.status,
          },
        },
        currentId: id,
      },
    }));
  },

  setCurrentId: (id) => {
    set((store) => ({
      history: {
        ...store.history,
        currentId: id,
      },
    }));
  },
}));
