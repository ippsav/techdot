import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import { Form, Formik } from "formik";
import React from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

interface LoginProps {}
const Login: React.FC<LoginProps> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const { username, password } = values;
          const response = await login({
            options: {
              username,
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
                name="username"
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
export default Login;
