import { Flex } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";
import { Navbar } from "./Navbar";

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const StyledFlex = styled(Flex)`
    min-height: 100vh;
  `;
  return (
    <StyledFlex flexDirection="column">
      <Navbar />
      {children}
    </StyledFlex>
  );
};
