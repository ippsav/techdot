import { Flex, Text } from "@chakra-ui/layout";
import { Box, Button, Spinner } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const [{ fetching, data }] = useMeQuery({
    pause: isServer(),
  });
  const router = useRouter();

  const [, logout] = useLogoutMutation();
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
  if (!fetching && !data?.me) {
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
  } else if (data?.me) {
    body = (
      <Flex
        alignItems="center"
        marginLeft="auto"
        w="26"
        marginRight={5}
        justify="space-between"
      >
        <Text fontSize="large" my="auto">
          {data.me?.username.charAt(0).toUpperCase() +
            data.me.username.slice(1)}
        </Text>
        <Box ml={2}>
          <Button
            colorScheme="whiteAlpha"
            variant="ghost"
            onClick={() => {
              logout();
              router.push("/");
            }}
          >
            Logout
          </Button>
        </Box>
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
