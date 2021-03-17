import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import { Form, Formik } from "formik";
import React from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";

interface LoginProps {}
const Login: React.FC<LoginProps> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const { usernameOrEmail, password } = values;
          const response = await login({
            options: {
              usernameOrEmail,
              password,
            },
          });

          if (response.data?.login.errors) {
            console.log(response.data.login.errors);
            setErrors(toErrorMap(response.data.login.errors));
          } else {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box>
              <InputField
                label="Username or Email"
                name="usernameOrEmail"
                placeholder="username or email"
              />
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
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
export default withUrqlClient(createUrqlClient)(Login);
