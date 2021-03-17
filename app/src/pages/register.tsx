import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import { Form, Formik } from "formik";
import React from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
  const [, register] = useRegisterMutation();
  const router = useRouter();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({ options: values });
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box>
              <InputField
                label="Username"
                name="username"
                placeholder="username"
              />
            </Box>
            <Box mt={6}>
              <InputField label="Email" name="email" placeholder="email" />
            </Box>
            <Box mt={6}>
              <InputField
                label="Password"
                name="password"
                placeholder="password"
                type="password"
              />
            </Box>
            <Button
              mt={6}
              type="submit"
              bgColor="blue.800"
              color="white"
              isLoading={isSubmitting}
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
export default withUrqlClient(createUrqlClient)(Register);
