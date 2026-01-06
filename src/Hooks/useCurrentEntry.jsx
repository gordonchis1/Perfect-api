import { useHistoryStore } from "../stores/historyStore";
import { useProjectStore } from "../stores/ProjectStore";

export default function useCurrentEntry() {
  const currentId = useHistoryStore((s) => s.history.currentId);
  const currentFileId = useProjectStore((s) => s.currentFileId);
  const openFiles = useProjectStore((s) => s.openFiles);

  if (!currentId || !currentFileId) return null;

  const file = openFiles[currentFileId];
  if (!file) return null;

  return file.content?.history?.entries?.[currentId] ?? null;
}
