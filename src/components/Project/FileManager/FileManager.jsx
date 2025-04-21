import { useState } from "react";
import { FSNode, VirtualFileSystem } from "../../../utils/ProjectFileObject";
import "./FileManager.css";
import FileManagerDirElement from "./FileManagerElement/FileManagerDirElement";

// FileManager Elmenent resive un nodo de vfs por props tambien resive isOpen y lo almacena en un estado
// al cerrar updateamos el documento para guardar los isOpen
// Imprime solo los elementos que tengan por nombre
// recive el path absoluto

// TODO: hacer una funcion para mover archivos un drag and drop
export default function FileManager({ project }) {
  const vfs = new VirtualFileSystem(project.content.root);
  console.log(vfs);
  return (
    <div className="filemanager-container">
      <FileManagerDirElement
        node={vfs.getDirByPath(vfs.root.name)}
        isOpen={vfs.root.isOpen}
      />
      <button onClick={() => console.log(vfs)}>refresh</button>
    </div>
  );
}
