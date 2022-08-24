import { Map } from "immutable";
import { Heading, Code, ListItem } from "@chakra-ui/react";
import { DefaultDraftBlockRenderMap } from "draft-js";
import type { DraftBlockType, DraftBlockRenderConfig } from "draft-js";

const preblockRenderMap = Map<DraftBlockType, DraftBlockRenderConfig>({
  "header-one": {
    element: "span",
    wrapper: <Heading />,
  },
  "code-block": {
    element: "pre",
    wrapper: <Code />,
  },
  unstyled: {
    element: "div",
  },
});

export const blockRenderMap =
  DefaultDraftBlockRenderMap.merge(preblockRenderMap);
