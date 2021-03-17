import { Box } from "@chakra-ui/react";
import React from "react";

interface WrapperProps {
  variant?: "regular" | "small";
}

export const Wrapper: React.FC<WrapperProps> = ({
  variant = "regular",
  children,
}) => {
  return (
    <Box
      mt={8}
      w="100%"
      mx="auto"
      h="auto"
      maxW={`${variant === "regular" ? "800px" : "400px"}`}
    >
      {children}
    </Box>
  );
};
