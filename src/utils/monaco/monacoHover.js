function esImagenURL(url) {
  return /\.(png|jpe?g|gif|webp|svg|bmp|ico)$/i.test(url);
}

function reemplazarTamañoEnURL(url, width, height) {
  if (typeof url !== "string") return url;

  const patrones = [
    { regex: /\{w\}x\{h\}/gi, reemplazo: `${width}x${height}` },
    {
      regex: /=[wh](\d+)(-[wh](\d+))?/gi,
      reemplazo: `=w${width}-h${height}`,
    },
    { regex: /=s\d+/gi, reemplazo: `=s${Math.max(width, height)}` },
    { regex: /__w-\d+__/gi, reemplazo: `__w-${width}__` },
    { regex: /\{width\}x\{height\}/gi, reemplazo: `${width}x${height}` },
    { regex: /\{w\}/gi, reemplazo: `${width}` },
    { regex: /\{h\}/gi, reemplazo: `${height}` },
  ];

  let nuevaURL = url;
  for (const { regex, reemplazo } of patrones) {
    nuevaURL = nuevaURL.replace(regex, reemplazo);
  }

  return nuevaURL;
}

export const registerMonacoHover = (
  editor,
  monaco,
  editorRef,
  monacoRef,
  onDidDisposeDispRef,
  hoverRef
) => {
  editorRef.current = editor;
  monacoRef.current = monaco;

  if (hoverRef.current) {
    hoverRef.current.dispose();
    hoverRef.current = null;
  }

  const hover = monaco.languages.registerHoverProvider("json", {
    provideHover: function (model, position) {
      const content = model.getLineContent(position.lineNumber);
      const col = position.column;
      let startCol = col;
      let endCol = col;
      let range = {};

      while (startCol > 1 && content[startCol - 2] !== '"') {
        startCol--;
      }

      if (content[startCol - 2] === '"') {
        while (endCol <= content.length && content[endCol - 1] !== '"') {
          endCol++;
        }
        if (endCol <= content.length && content[endCol - 1] === '"') {
          range = {
            startLineNumber: position.lineNumber,
            startColumn: startCol,
            endLineNumber: position.lineNumber,
            endColumn: endCol,
          };
        }
      } else {
        return;
      }
      const text = model.getValueInRange(range);

      try {
        new URL(text);

        if (esImagenURL(text)) {
          return {
            contents: [
              {
                supportHtml: true,
                value: `<img src="${reemplazarTamañoEnURL(
                  text,
                  200,
                  200
                )}" style="max-width: 200px; max-height:200px;"></img>`,
              },
            ],
          };
        } else {
          return {
            contents: [{ value: "# Es url " }],
          };
        }
      } catch {
        return;
      }
    },
  });

  hoverRef.current = hover;

  if (onDidDisposeDispRef.current) {
    onDidDisposeDispRef.current.dispose();
    onDidDisposeDispRef.current = null;
  }
  onDidDisposeDispRef.current = editor.onDidDispose(() => {
    if (hoverRef.current) {
      hoverRef.current.dispose();
      hoverRef.current = null;
    }
    editorRef.current = null;
    if (onDidDisposeDispRef.current) {
      onDidDisposeDispRef.current.dispose();
      onDidDisposeDispRef.current = null;
    }
  });
};

export const addMonacoThemes = (monaco) => {
  // ? dark
  monaco.editor.defineTheme("vs-custom-dark", {
    base: "vs-dark",
    inherit: true,
    colors: {
      "editor.foreground": "#eeeeee",
      "editor.background": "#0d0d0d",
      "editorLineNumber.activeForeground": "#0090ff",
      "editorHoverWidget.background": "#060606",
    },
    rules: [{ token: "keyword", foreground: "0090ff", fontStyle: "regular" }],
  });

  // ? Light
  monaco.editor.defineTheme("vs-custom-light", {
    base: "vs",
    inherit: true,
    colors: {
      "editor.foreground": "#0b0b0b",
      "editor.background": "#e5e5e5",
      "editorLineNumber.activeForeground": "#0072db",
      "editorHoverWidget.background": "#fcfcfc",
    },
    rules: [{ token: "keyword", foreground: "0072db", fontStyle: "regular" }],
  });

  // ? Matcha
  monaco.editor.defineTheme("vs-matcha", {
    base: "vs",
    inherit: true,
    colors: {
      "editor.foreground": "#14270f",
      "editor.background": "#fbfdf5",
      "editorLineNumber.activeForeground": "#3e8343",
      "editorHoverWidget.background": "#f4f6ef",
    },
    rules: [{ token: "keyword", foreground: "3e8343", fontStyle: "regular" }],
  });

  // ? Sunset
  monaco.editor.defineTheme("vs-sunset", {
    base: "vs",
    inherit: true,
    colors: {
      "editor.foreground": "#290c08",
      "editor.background": "#fffaf6",
      "editorLineNumber.activeForeground": "#d64c29",
      "editorHoverWidget.background": "#fff2e9",
    },
    rules: [{ token: "keyword", foreground: "d64c29", fontStyle: "regular" }],
  });

  // ? lavender
  monaco.editor.defineTheme("vs-lavender", {
    base: "vs",
    inherit: true,
    colors: {
      "editor.foreground": "#1e142e",
      "editor.background": "#fdfaff",
      "editorLineNumber.activeForeground": "#7b67cc",
      "editorHoverWidget.background": "#f7f2ff",
    },
    rules: [{ token: "keyword", foreground: "7b67cc", fontStyle: "regular" }],
  });

  // ? ocean
  monaco.editor.defineTheme("vs-ocean", {
    base: "vs",
    inherit: true,
    colors: {
      "editor.foreground": "#001928",
      "editor.background": "#f2fafe",
      "editorLineNumber.activeForeground": "#00848b",
      "editorHoverWidget.background": "#e5f5fd",
    },
    rules: [
      { token: "keyword", foreground: "#08d4dfff", fontStyle: "regular" },
    ],
  });

  // ? cyberpunk
  monaco.editor.defineTheme("vs-cyberpunk", {
    base: "vs-dark",
    inherit: true,
    colors: {
      "editor.foreground": "#fff0ff",
      "editor.background": "#0d0111",
      "editorLineNumber.activeForeground": "#d433f5",
      "editorHoverWidget.background": "#020202",
    },
    rules: [{ token: "keyword", foreground: "#d433f5", fontStyle: "regular" }],
  });

  // ? nord
  monaco.editor.defineTheme("vs-nord", {
    base: "vs-dark",
    inherit: true,
    colors: {
      "editor.foreground": "#daebf1",
      "editor.background": "#09131a",
      "editorLineNumber.activeForeground": "#0091b5",
      "editorHoverWidget.background": "#060a0d",
    },
    rules: [{ token: "keyword", foreground: "#0091b5", fontStyle: "regular" }],
  });

  // ? solarized
  monaco.editor.defineTheme("vs-solarized", {
    base: "vs-dark",
    inherit: true,
    colors: {
      "editor.foreground": "#daebf1",
      "editor.background": "#1e130e",
      "editorLineNumber.activeForeground": "#0089ab",
      "editorHoverWidget.background": "#120905",
    },
    rules: [{ token: "keyword", foreground: "#0089ab", fontStyle: "regular" }],
  });
};
