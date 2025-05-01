import { useState } from "react";
import { VirtualFileSystem } from "../../utils/ProjectFileObject";

export default function useVirtualFileSystem(init) {
  const [vfs, setVfs] = useState(() => new VirtualFileSystem(init));

  const updateVfs = (callback) => {
    const cloned = vfs.clone();
    callback(cloned);
    setVfs(cloned);
  };

  return { vfs, updateVfs };
}
