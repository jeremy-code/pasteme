import React, { useState, useEffect } from "react";

import { convertFromRaw, Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";

// import "./styles.css";

const emptyContentState = convertFromRaw({
  entityMap: {},
  blocks: [
    {
      text: "",
      key: "foo",
      type: "unstyled",
      entityRanges: [],
      depth: 0,
      inlineStyleRanges: [],
    },
  ],
});

function App() {
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(emptyContentState)
  );

  const editor = React.useRef<Editor>(null);

  function focusEditor() {
    editor?.current?.focus();
  }

  useEffect(() => {
    focusEditor();
  }, []);

  type StyleButtonProps = {
    label: string;
    style: string;
    onToggle: (style: string) => void;
  };
  const StyleButton = (props: StyleButtonProps) => {
    let onClickButton = (e: React.MouseEvent) => {
      e.preventDefault();
      props.onToggle(props.style);
    };
    return <button onMouseDown={onClickButton}>{props.label}</button>;
  };

  const BLOCK_TYPES = [
    { label: "H1", style: "header-one" },
    { label: "H2", style: "header-two" },
    { label: "H3", style: "header-three" },
    { label: "H4", style: "header-four" },
    { label: "H5", style: "header-five" },
    { label: "H6", style: "header-six" },
    { label: "Blockquote", style: "blockquote" },
    { label: "UL", style: "unordered-list-item" },
    { label: "OL", style: "ordered-list-item" },
    { label: "Code Block", style: "code-block" },
  ];

  const BlockStyleControls = (props: any) => {
    return (
      <div>
        {BLOCK_TYPES.map((type) => (
          <StyleButton
            key={type.label}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
          />
        ))}
      </div>
    );
  };

  const INLINE_STYLES = [
    { label: "Bold", style: "BOLD" },
    { label: "Italic", style: "ITALIC" },
    { label: "Underline", style: "UNDERLINE" },
    { label: "Monospace", style: "CODE" },
  ];
  const InlineStyleControls = (props: any) => {
    return (
      <div>
        {INLINE_STYLES.map((type) => (
          <StyleButton
            key={type.label}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
          />
        ))}
      </div>
    );
  };

  const onInlineClick = (e: any) => {
    let nextState = RichUtils.toggleInlineStyle(editorState, e);
    setEditorState(nextState);
  };

  const onBlockClick = (e: any) => {
    let nextState = RichUtils.toggleBlockType(editorState, e);
    setEditorState(nextState);
  };

  return (
    <div onClick={focusEditor}>
      <div className="App">
        <BlockStyleControls onToggle={onBlockClick} />
        <InlineStyleControls onToggle={onInlineClick} />
      </div>
      <div className="App">
        <Editor
          ref={editor}
          editorState={editorState}
          onChange={(editorState) => setEditorState(editorState)}
        />
      </div>
    </div>
  );
}

export default App;
