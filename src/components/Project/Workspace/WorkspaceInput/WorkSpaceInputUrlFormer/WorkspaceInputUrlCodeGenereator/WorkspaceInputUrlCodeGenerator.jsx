import { useEffect, useState } from "react";
import "./WorkspaceInputUrlCodeGenerator.css";
import { HTTPSnippet } from "httpsnippet-lite";
import { useProjectStore } from "../../../../../../stores/ProjectStore";
import CodeGeneratorEditor from "./CodeGeneratorEditor/CodeGeneratorEditor";
import CodeGeneratorTargetSelector from "./CodeGeneratorTargetSelector/CodeGeneratorTargetSelector";
import CodeGeneratorClientSelector from "./CodeGeneratorClientSelector/CodeGeneratorClientSelector";

export default function WorkspaceInputUrlCodeGenerator() {
  const content = useProjectStore(
    (state) => state.openFiles[state.currentFileId]?.content
  );
  const [output, setOutput] = useState("");
  const [currentTarget, setCurrentTarget] = useState(null);
  const [client, setClient] = useState(null);

  useEffect(() => {
    if (!(currentTarget && client)) return;
    const headers = [];
    let bodyType = null;

    if (content.headers.length != 0) {
      content.headers.forEach((header) => {
        if (header.key == "Content-Type") {
          bodyType = header.value;
        }
        headers.push({ name: header.key, value: header.value });
      });
    }

    const generateCode = async () => {
      const snippet = new HTTPSnippet({
        method: content.type,
        url: content.url.parseUrl,
        headers,
        postData: {
          mimeType: bodyType,
          text: content.body.bodyContent,
        },
      });

      const options = { indent: "\t" };
      const output = await snippet.convert(
        currentTarget.key,
        client.key,
        options
      );

      setOutput(output);
    };

    generateCode();
  }, [content, currentTarget, client]);

  return (
    <div className="workspace-input-url_code-generator-container">
      <div className="code-generator_selectors-container">
        <CodeGeneratorTargetSelector
          setCurrentTarget={setCurrentTarget}
          currentTarget={currentTarget}
          setClient={setClient}
        />
        {currentTarget?.clients && (
          <CodeGeneratorClientSelector
            client={client}
            setClient={setClient}
            clients={currentTarget.clients}
          />
        )}
      </div>
      {currentTarget && (
        <CodeGeneratorEditor output={output} language={currentTarget.key} />
      )}
    </div>
  );
}
