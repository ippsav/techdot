import { withUrqlClient } from "next-urql";
import React, { useEffect } from "react";
import { Layout } from "../components/Layout";
import { useMeQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useRouter } from "next/router";

interface CreateEventProps {}

const CreateEvent: React.FC<CreateEventProps> = ({}) => {
  // const [{ data }] = useMeQuery();
  const router = useRouter();
  return <Layout>Create Event</Layout>;
};

export default withUrqlClient(createUrqlClient)(CreateEvent);
