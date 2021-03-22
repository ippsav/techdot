import { Box, Badge, Img } from "@chakra-ui/react";
import React from "react";

interface EventProps {
  name: string;
  capacity: number;
  eventDate: string;
  startingHour: number;
  picture: string;
  endingHour: number;
}

const isAM = (hour: number): string => (hour <= 12 ? "AM" : "PM");

export const Event: React.FC<EventProps> = ({
  name,
  capacity,
  eventDate,
  startingHour,
  endingHour,
  picture,
}) => {
  const dateParts = new Date(parseInt(eventDate)).toDateString();
  const date = dateParts.slice(0, dateParts.length - 4);
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      w="600px"
      h="max-content"
      my={4}
    >
      <Img src={picture} objectFit="cover" width="full" />
      <Box p="6">
        <Box d="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            New
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {startingHour + isAM(startingHour)} &gt;{" "}
            {endingHour + isAM(endingHour)} &bull; {capacity}
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {name}
        </Box>

        <Box>{date}</Box>
      </Box>
    </Box>
  );
};
