import { Image, Box, Flex, Button, Text } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { DropzoneField } from "../components/DropzoneField";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { Wrapper } from "../components/Wrapper";
import isAuth from "../customHooks/isAuth";
import {
  useProfileQuery,
  useUpdateProfileMutation,
} from "../generated/graphql";
import { Router, useRouter } from "next/router";
import { createUrqlClient } from "../utils/createUrqlClient";

interface InitialState {
  username: string | undefined;
  bio: string | null;
  avatar: string | null;
}

const Account: React.FC<any> = ({}) => {
  isAuth();
  const router = useRouter();
  const [{ data, fetching }] = useProfileQuery();
  const [, updateProfile] = useUpdateProfileMutation();
  const [isEditing, setEditing] = useState(false);
  let imageSource: string = "/static/blank-profile.png";
  const initialState: InitialState = {
    username: "",
    bio: "",
    avatar: "",
  };
  if (!fetching && data?.profile) {
    initialState.username = data.profile.user.username;
    data.profile.avatar ? (initialState.avatar = data.profile.avatar) : null;
    data.profile.bio ? (initialState.bio = data.profile.bio) : null;

    data.profile.avatar ? (imageSource = data.profile.avatar) : null;
  }
  if (fetching || (!fetching && !data)) {
    console.log("entered twice");
    return <Layout></Layout>;
  }
  return (
    <Layout>
      <Wrapper variant="regular">
        <Box
          w="full"
          height="750px"
          bgColor="gray.50"
          rounded="lg"
          shadow="2xl"
          mt={10}
        >
          <Box d="flex" justifyContent="center" w="full" h="27%" mx="auto">
            <Image
              borderRadius="full"
              boxSize="100px"
              src={imageSource}
              mt={10}
            />
          </Box>
          <Box w="86%" h="auto" mx="auto">
            <Formik
              initialValues={initialState}
              onSubmit={async (values, { setErrors }) => {
                const { avatar, bio } = values;
                const response = await updateProfile({
                  options: {
                    avatar,
                    bio,
                  },
                });
                if (response.data?.updateProfile) {
                  router.push("/home");
                }
              }}
              enableReinitialize
            >
              {({ isSubmitting }) => (
                <Form>
                  <Box w="full">
                    <Box w="60%">
                      <InputField
                        isDisabled={!isEditing}
                        variant={isEditing ? "outline" : "filled"}
                        label="Username"
                        name="username"
                        placeholder="username"
                      />
                    </Box>
                    {isEditing ? (
                      <Box mt={6}>
                        <Text>Avatar</Text>
                        <Flex
                          justify="center"
                          alignItems="center"
                          rounded="xl"
                          bgColor="gray.100"
                          h={8}
                          w="60%"
                        >
                          <Field name="avatar" component={DropzoneField} />
                        </Flex>
                      </Box>
                    ) : null}
                    <Box mt={6} w="60%">
                      <InputField
                        variant={isEditing ? "outline" : "filled"}
                        isDisabled={!isEditing}
                        label="Bio"
                        name="bio"
                        placeholder="bio..."
                      />
                    </Box>
                    <Flex mt={20} justify="flex-end">
                      {isEditing ? (
                        <Button
                          bgColor="red.600"
                          color="white"
                          isLoading={isSubmitting}
                          mr={4}
                          onClick={() => {
                            if (isEditing) {
                              setEditing(false);
                            }
                          }}
                        >
                          Cancel
                        </Button>
                      ) : null}
                      <Button
                        type={isEditing ? "submit" : "button"}
                        bgColor="green.500"
                        color="white"
                        isLoading={isSubmitting}
                        onClick={() => {
                          if (!isEditing) {
                            setEditing(true);
                          }
                        }}
                      >
                        Edit
                      </Button>
                    </Flex>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Wrapper>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Account);
