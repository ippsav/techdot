import { Flex, Text } from "@chakra-ui/layout";
import { Box, Button, Spinner } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { useProfileQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { Avatar } from "./Avatar";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const [{ fetching, data }] = useProfileQuery({
    pause: isServer(),
  });

  let body = null;
  if (fetching) {
    body = (
      <Flex
        alignItems="center"
        marginLeft="auto"
        w="26"
        marginRight={5}
        justify="space-between"
      >
        <Box>
          <Spinner size="md" />
        </Box>
      </Flex>
    );
  }
  console.log(data?.profile);
  if (!fetching && !data?.profile) {
    body = (
      <Flex marginLeft="auto" w="26" marginRight={5} justify="space-between">
        <Box marginRight={4}>
          <NextLink href="/login">
            <Button colorScheme="whiteAlpha" color="white" variant="ghost">
              Login
            </Button>
          </NextLink>
        </Box>
        <Box>
          <NextLink href="/register">
            <Button colorScheme="whiteAlpha" color="white" variant="ghost">
              Register
            </Button>
          </NextLink>
        </Box>
      </Flex>
    );
  } else if (data?.profile) {
    body = (
      <Flex
        alignItems="center"
        marginLeft="auto"
        w="26"
        marginRight={5}
        justify="space-between"
      >
        <Avatar avatar="hi" />
      </Flex>
    );
  }
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
      {body}
    </Flex>
  );
};
