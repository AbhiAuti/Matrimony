import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const SuggestedUser = ({ user }) => {
  // Function to open the default email client with the recipient's email pre-filled
  const openEmailClient = () => {
    window.location.href = `mailto:${user.email}?subject=Message`;
  };

  return (
    <Box
      as={Link}
      to={`/${user.username}`}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="4"
      mb="4"
      display="flex"
      flexDirection="column"
      alignItems="center"
      textAlign="center"
    >
      <Avatar src={user.profilePicURL} size="xl" mb="2" />
      <Text fontSize="lg" fontWeight="bold" noOfLines={1} mb="1">
        {user.fullName}
      </Text>
      <Text fontSize="sm" color="gray.500" mb="2">
        {user.age}
      </Text>
      <Flex>
        <Button
          as={Link}
          to={`/${user.username}`}
          fontSize="sm"
          bg="blue.400"
          color="white"
          fontWeight="medium"
          borderRadius="md"
          _hover={{ bg: "blue.500" }}
          mr="2"
        >
          View Profile
        </Button>
        <Button
          fontSize="sm"
          bg="blue.400"
          color="white"
          fontWeight="medium"
          borderRadius="md"
          onClick={openEmailClient}
          _hover={{ bg: "blue.500" }}
        >
          Message
        </Button>
      </Flex>
    </Box>
  );
};

export default SuggestedUser;
