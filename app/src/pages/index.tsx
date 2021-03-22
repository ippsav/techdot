import { Button, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React from "react";
import { Layout } from "../components/Layout";
import NextLink from "next/link";
import { createUrqlClient } from "../utils/createUrqlClient";
import isAuth from "../customHooks/isAuth";

const Index = () => {
  isAuth("/home");
  return (
    <Layout>
      <Flex justify="center" flexDir="column" my="auto">
        <Heading textAlign="center" fontSize="6xl" fontWeight="black">
          TECHDOT
        </Heading>
        <Container mt={3}>
          <Text fontSize="3xl" fontWeight="black" textAlign="center">
            A place for communities and friends
          </Text>
        </Container>
        <Flex align="center" mt={4} justify="center">
          <NextLink href="/create-event">
            <Button size="lg">Host an event</Button>
          </NextLink>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
