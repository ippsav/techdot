import { Box, Button, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React from "react";
import { Layout } from "../components/Layout";
import NextLink from "next/link";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => (
  <Layout>
    <Flex flex="1" w="full" justify="center" align="center">
      <Box>
        <Heading textAlign="center" fontSize="4xl" fontWeight="black">
          TECHDOT
        </Heading>
        <Container mt={3}>
          <Text fontSize="2xl" fontWeight="black">
            A place for communities and friends
          </Text>
        </Container>
        <Flex align="center" mt={2} justify="center">
          <NextLink href="/create-event">
            <Button>Host an event</Button>
          </NextLink>
        </Flex>
      </Box>
    </Flex>
  </Layout>
);

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
