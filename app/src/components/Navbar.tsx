import { Flex, Link, Text } from "@chakra-ui/layout";
import NextLink from "next/link";
import React from "react";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  return (
    <Flex
      h="16"
      w="full"
      bgColor="blue.900"
      color="white"
      boxShadow="xl"
      align="center"
    >
      <Text marginLeft={5} fontSize={32}>
        TECHDOT
      </Text>
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
