import { useEffect } from "react";
import useWorkSpaceContentContext from "../../../../../../Hooks/WorkSpace/useWorkSpaceContentContext";
import { HTTPSnippet } from "httpsnippet-lite";

export default function WorkSpaceInputUrlFormerCode() {
  const [content] = useWorkSpaceContentContext();

  useEffect(() => {
    console.log({
      method: content.type,
      url: content.url.parseUrl,
    });

    const generateRequestCode = async () => {
      const snippet = new HTTPSnippet({
        method: content.type,
        url: content.url.parseUrl,
      });

      const options = { ident: "\t" };
      const output = await snippet.convert("javascript", "fetch", options);
      console.log(output);
    };

    generateRequestCode();
  }, [content]);

  return <div>WorkSpaceInputUrlFormerCode</div>;
}
