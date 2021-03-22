import { Box, Flex, Spacer } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";
import { Navbar } from "./Navbar";

const StyledFlex = styled(Flex)`
  min-height: 100vh;
`;
interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <StyledFlex flexDirection="column">
      <Navbar />
      <Flex flex="1" flexDir="column">
        {children}
      </Flex>
    </StyledFlex>
  );
};
