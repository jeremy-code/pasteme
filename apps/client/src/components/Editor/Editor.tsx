import React, { useEffect, useReducer, useState } from "react";
import {
  Editor as DraftEditor,
  EditorState,
  convertToRaw,
  convertFromRaw,
  RawDraftContentState,
  RichUtils,
  Modifier,
  getDefaultKeyBinding,
} from "draft-js";
import {
  Box,
  Button,
  Flex,
  IconButton,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import { BiTrash, BiSave } from "react-icons/bi";

import {
  editorReducer,
  emptyContentState,
  blockRenderMap,
} from "@/components/Editor";
import InlineStyleControls from "./InlineStylesControls";
import { useLocalStorage } from "@/hooks";

import "draft-js/dist/Draft.css";
import BlockTypeControls from "./BlockTypeControls";

const dev = process.env.NODE_ENV !== "production";

export const API_BASE_URL = dev
  ? "http://localhost:8787"
  : "https://pasteme-functions.jeremynguyen.workers.dev";

const Editor = () => {
  const [editorState, dispatch] = useReducer(
    editorReducer,
    emptyContentState,
    (init) => EditorState.createWithContent(init)
  );
  const [savedEditorState, setSavedEditorState] = useLocalStorage<
    RawDraftContentState | undefined
  >("savedEditorState", undefined);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // If there is savedEditorState, load it into the editor.
    if (savedEditorState) {
      dispatch({
        type: "UPDATE_FROM_LOCAL_STORAGE",
        payload: convertFromRaw(savedEditorState),
      });
    }
  }, [savedEditorState]);

  const handleKeyCommand = (command: string, editorState: EditorState) => {
    const state = RichUtils.handleKeyCommand(editorState, command);
    if (state) {
      dispatch({ type: "UPDATE_ON_CHANGE", payload: state });
      return "handled";
    }
    return "not-handled";
  };

  return (
    <>
      <BlockTypeControls dispatch={dispatch} />
      <InlineStyleControls dispatch={dispatch} />
      <Box
        border="1px solid"
        borderColor={useColorModeValue("gray.200", "gray.900")}
        bg={useColorModeValue("white", "gray.700")}
        borderRadius="md"
        p={8}
      >
        <DraftEditor
          editorState={editorState}
          onChange={(updatedState) =>
            dispatch({ type: "UPDATE_ON_CHANGE", payload: updatedState })
          }
          blockRenderMap={blockRenderMap}
          stripPastedStyles
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={(e) => getDefaultKeyBinding(e)}
        />
      </Box>
      <Flex justify="flex-end" mt={4} gap={4}>
        <IconButton
          aria-label="Save"
          icon={<BiTrash />}
          onClick={() => {
            dispatch({ type: "DELETE" });
            toast({
              title: "Deleted",
              description: "Your content has been deleted.",
              status: "warning",
              isClosable: true,
            });
          }}
        />
        <IconButton
          aria-label="Save"
          icon={<BiSave />}
          onClick={() => {
            setSavedEditorState(convertToRaw(editorState.getCurrentContent()));
            toast({
              title: "Saved",
              description: "Your changes have been saved.",
              status: "success",
              isClosable: true,
            });
          }}
        />

        <Button
          colorScheme="primary"
          onClick={async () => {
            setIsLoading(true);
            await fetch(`${API_BASE_URL}/pastes`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                content: convertToRaw(editorState.getCurrentContent()),
              }),
            });
            setIsLoading(false);
            toast({
              title: "Paste created",
              description: "Your paste has been created.",
              status: "success",
              isClosable: true,
            });
          }}
          isLoading={isLoading}
        >
          Publish
        </Button>
      </Flex>
    </>
  );
};

export default Editor;
