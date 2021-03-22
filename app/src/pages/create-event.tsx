import { withUrqlClient } from "next-urql";
import React from "react";
import { Layout } from "../components/Layout";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Box, Button, Flex } from "@chakra-ui/react";
import isAuth from "../customHooks/isAuth";
import { Formik, Form, Field } from "formik";
import { InputField } from "../components/InputField";
import { useCreateEventMutation } from "../generated/graphql";
import { Wrapper } from "../components/Wrapper";
import { useRouter } from "next/router";
import { FileWithPath } from "react-dropzone";
import { DropzoneField } from "../components/DropzoneField";
interface CreateEventProps {}

interface InitialState {
  name: string;
  location: string;
  capacity: number;
  eventDate: string;
  startingHour: number;
  endingHour: number;
  picture: FileWithPath | null;
}
const initialState: InitialState = {
  eventDate: "",
  location: "",
  name: "",
  capacity: 1,
  startingHour: 8,
  endingHour: 20,
  picture: null,
};

const CreateEvent: React.FC<CreateEventProps> = ({}) => {
  isAuth();
  const router = useRouter();
  const [, createEvent] = useCreateEventMutation();
  return (
    <Layout>
      <Wrapper variant="small">
        <Formik
          initialValues={initialState}
          onSubmit={async (values, { setErrors }) => {
            console.log(values);
            if (values.capacity < 1) {
              setErrors({ capacity: "Must  be > 1" });
              return;
            }
            const response = await createEvent({
              options: {
                ...values,
              },
            });
            if (response.error) {
              console.log(response.error);
            } else {
              router.push("/home");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Box>
                <InputField
                  label="Event name"
                  name="name"
                  placeholder="Event name..."
                  required
                />
              </Box>
              <Box mt={6}>
                <InputField
                  label="Location"
                  name="location"
                  placeholder="Location..."
                  required
                />
              </Box>
              <Box mt={6}>
                <Field name="picture" component={DropzoneField} />
              </Box>
              <Box mt={6}>
                <InputField label="Capacity" name="capacity" type="number" />
              </Box>
              <Flex flexDir="row" mt={6}>
                <Box>
                  <InputField label="Start" name="startingHour" type="number" />
                </Box>
                <Box>
                  <InputField label="End" name="endingHour" type="number" />
                </Box>
              </Flex>
              <Box mt={10}>
                <InputField
                  type="date"
                  label="Event Date"
                  name="eventDate"
                  required
                />
              </Box>
              <Button
                mt={6}
                type="submit"
                bgColor="blue.800"
                color="white"
                isLoading={isSubmitting}
              >
                CreateEvent
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreateEvent);
