import React from "react";
import { ACTIONTYPE } from "@/components/Editor";
import { Flex, IconButton } from "@chakra-ui/react";

import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineUnderline,
} from "react-icons/ai";

import type { IconType } from "react-icons";
import type { DraftInlineStyleType } from "draft-js";

type InlineButtonProps = {
  icon: IconType;
  ariaLabel: string;
  dispatch: React.Dispatch<ACTIONTYPE>;
  style: DraftInlineStyleType;
};

const InlineButton = ({
  icon,
  ariaLabel,
  dispatch,
  style,
}: InlineButtonProps) => {
  return (
    <IconButton
      aria-label={ariaLabel}
      icon={React.createElement(icon)}
      onClick={() => {
        dispatch({ type: "TOGGLE_INLINE_STYLE", payload: style });
      }}
    />
  );
};

const INLINE_STYLES = [
  {
    icon: AiOutlineBold,
    ariaLabel: "Bold",
    style: "BOLD",
  },
  {
    icon: AiOutlineItalic,
    ariaLabel: "Italic",
    style: "ITALIC",
  },
  {
    icon: AiOutlineUnderline,
    ariaLabel: "Underline",
    style: "UNDERLINE",
  },
] as const;

type InlineStyleControlsProps = {
  dispatch: React.Dispatch<ACTIONTYPE>;
};

const InlineStyleControls = ({ dispatch }: InlineStyleControlsProps) => {
  return (
    <Flex gap={2} mb={4}>
      {INLINE_STYLES.map((inline_style) => (
        <InlineButton
          key={`${inline_style.style}  button`}
          {...inline_style}
          dispatch={dispatch}
        />
      ))}
    </Flex>
  );
};

export default InlineStyleControls;
