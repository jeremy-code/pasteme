import React from "react";
import { ACTIONTYPE } from "@/components/Editor";
import { Flex, IconButton } from "@chakra-ui/react";

import {
  FaHeading,
  FaCode,
  FaListUl,
  FaListOl,
  FaRemoveFormat,
} from "react-icons/fa";

import type { IconType } from "react-icons";
import type { DraftBlockType } from "draft-js";

type InlineButtonProps = {
  icon: IconType;
  ariaLabel: string;
  dispatch: React.Dispatch<ACTIONTYPE>;
  type: DraftBlockType;
};

const BlockButton = ({
  icon,
  ariaLabel,
  dispatch,
  type,
}: InlineButtonProps) => {
  return (
    <IconButton
      aria-label={ariaLabel}
      icon={React.createElement(icon)}
      onClick={() => {
        dispatch({ type: "TOGGLE_BLOCK_TYPE", payload: type });
      }}
    />
  );
};

const INLINE_STYLES = [
  {
    icon: FaHeading,
    ariaLabel: "Heading",
    type: "header-one",
  },
  {
    icon: FaCode,
    ariaLabel: "Code",
    type: "code-block",
  },
  {
    icon: FaListUl,
    ariaLabel: "Unordered List",
    type: "unordered-list-item",
  },
  {
    icon: FaListOl,
    ariaLabel: "Ordered List",
    type: "ordered-list-item",
  },
  {
    icon: FaRemoveFormat,
    ariaLabel: "Remove Format",
    type: "unstyled",
  },
] as const;

type BlockTypeControlsProps = {
  dispatch: React.Dispatch<ACTIONTYPE>;
};

const BlockTypeControls = ({ dispatch }: BlockTypeControlsProps) => {
  return (
    <Flex gap={2} mb={4}>
      {INLINE_STYLES.map((block_type) => (
        <BlockButton
          key={`${block_type.type} button`}
          {...block_type}
          dispatch={dispatch}
        />
      ))}
    </Flex>
  );
};

export default BlockTypeControls;
