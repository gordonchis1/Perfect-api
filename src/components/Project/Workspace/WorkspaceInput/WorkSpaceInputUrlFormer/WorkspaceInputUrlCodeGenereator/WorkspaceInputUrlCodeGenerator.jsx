import { useEffect, useState } from "react";
import "./WorkspaceInputUrlCodeGenerator.css";
import { HTTPSnippet } from "httpsnippet-lite";
import { useProjectStore } from "../../../../../../stores/ProjectStore";
import CodeGeneratorEditor from "./CodeGeneratorEditor/CodeGeneratorEditor";
import CodeGeneratorSelector from "./CodeGeneratorSelector/CodeGeneratorSelector";

export default function WorkspaceInputUrlCodeGenerator() {
  const content = useProjectStore(
    (state) => state.openFiles[state.currentFileId]?.content
  );
  const [output, setOutput] = useState("");
  const [currentTarget, setCurrentTarget] = useState(null);

  useEffect(() => {
    if (!currentTarget) return;
    const headers = [];

    if (content.headers.length != 0) {
      content.headers.forEach((header) => {
        headers.push({ name: header.key, value: header.value });
      });
    }

    const generateCode = async () => {
      const snippet = new HTTPSnippet({
        method: content.type,
        url: content.url.parseUrl,
        headers,
      });

      const options = { indent: "\t" };
      const output = await snippet.convert(
        currentTarget.key,
        currentTarget.clients[0].key,
        options
      );

      setOutput(output);
    };

    generateCode();
  }, [content, currentTarget]);

  console.log(currentTarget);

  return (
    <div className="workspace-input-url_code-generator-container">
      <CodeGeneratorSelector
        currentTarget={currentTarget}
        setCurrentTarget={setCurrentTarget}
      />
      {currentTarget && (
        <CodeGeneratorEditor output={output} language={currentTarget.key} />
      )}
    </div>
  );
}
