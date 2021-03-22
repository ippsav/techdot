import { Box, Flex } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React from "react";
import { Event } from "../components/Event";
import { Layout } from "../components/Layout";
import isAuth from "../customHooks/isAuth";
import { useEventsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = ({}) => {
  const [{ data, fetching }] = useEventsQuery();
  isAuth();
  let body = null;
  if (fetching) {
    body = <Box>Loading</Box>;
  } else if (!fetching && !data) {
    body = <Box>No events found</Box>;
  } else {
    body = (
      <Box>
        {data?.events.map((event) => {
          const { __typename, id, ...eventData } = event;
          return <Event key={event.id} {...eventData} />;
        })}
      </Box>
    );
  }
  return (
    <Layout>
      <Flex flexDir="column" align="center" justify="center">
        {body}
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(HomePage);
