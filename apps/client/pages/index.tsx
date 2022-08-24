import { Container, Textarea } from "@chakra-ui/react";
import { useState } from "react";

import Editor from "./Editor";

const IndexPage = () => {
  return (
    <>
      <Container>
        {/* <Textarea /> */}
        <Editor />
      </Container>
    </>
  );
};

export default IndexPage;
