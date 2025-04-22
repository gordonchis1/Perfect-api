import FileManagerDirElement from "./FileManagerDirElement/FileManagerDirElement";
import FileManagerFileElement from "./FileManagerFileElement/FileManagerFileElement";

export default function FileManagerElement({ node, vfs }) {
  if (node.type === "dir") {
    return <FileManagerDirElement node={node} vfs={vfs} />;
  } else {
    return <FileManagerFileElement node={node} vfs={vfs} />;
  }
}
