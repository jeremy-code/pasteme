import React from "react";
import { Container } from "@chakra-ui/react";
import Navbar from "./Navbar";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <Container as="main" mt={8}>
        {children}
      </Container>
    </>
  );
};

export default Layout;
