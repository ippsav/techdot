import { Flex, Link, Text } from "@chakra-ui/layout";
import NextLink from "next/link";
import React from "react";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  return (
    <Flex
      h="16"
      bgGradient="linear(to-b,#009FFD,#2A2A72)"
      w="full"
      color="white"
      boxShadow="xl"
      align="center"
    >
      <Text marginLeft={5}>TECHDOT</Text>
      <Flex marginLeft="auto" w="32" marginRight={5} justify="space-between">
        <NextLink href="/login">
          <Link>Login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>Register</Link>
        </NextLink>
      </Flex>
    </Flex>
  );
};
