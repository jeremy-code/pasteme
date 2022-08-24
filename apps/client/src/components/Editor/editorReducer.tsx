import React from "react";
import { ContentState, convertFromRaw, RichUtils, EditorState } from "draft-js";
import type {
  RawDraftContentBlock,
  DraftBlockType,
  DraftInlineStyleType,
} from "draft-js";

// Due to Next.js SSR bug where the key is not the same, I'm using this emptyContentState to set the key
const emptyContentState = convertFromRaw({
  entityMap: {},
  blocks: [
    {
      text: "",
      key: "key",
    } as unknown as RawDraftContentBlock,
  ],
});

export type ACTIONTYPE =
  | { type: "DELETE" }
  | { type: "UPDATE_FROM_LOCAL_STORAGE"; payload: ContentState }
  | { type: "UPDATE_ON_CHANGE"; payload: EditorState }
  | { type: "TOGGLE_BLOCK_TYPE"; payload: DraftBlockType }
  | { type: "TOGGLE_INLINE_STYLE"; payload: DraftInlineStyleType };

function editorReducer(state: EditorState, action: ACTIONTYPE) {
  switch (action.type) {
    case "DELETE":
      return EditorState.push(
        state,
        ContentState.createFromText(""),
        "delete-character"
      );
    case "UPDATE_FROM_LOCAL_STORAGE":
      return EditorState.createWithContent(action.payload);
    case "UPDATE_ON_CHANGE":
      return action.payload;
    case "TOGGLE_BLOCK_TYPE":
      return RichUtils.toggleBlockType(state, action.payload);
    case "TOGGLE_INLINE_STYLE":
      return RichUtils.toggleInlineStyle(state, action.payload);
    default:
      throw new Error();
  }
}

export { editorReducer, emptyContentState };
