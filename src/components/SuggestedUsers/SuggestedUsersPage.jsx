import React from "react";
import { Box, Text, VStack, Flex } from "@chakra-ui/react";
import SuggestedUser from "../SuggestedUsers/SuggestedUser";
import useGetSuggestedUsers from "../../hooks/useGetSuggestedUsers";

const SuggestedUsersPage = () => {
  const { isLoading, suggestedUsers } = useGetSuggestedUsers();

  return (
    <Flex direction="column" alignItems="center" mt="60px" px={4}> {/* Adjust the margin-top */}
      <Box width="100%" maxWidth="600px">
        <Text fontSize="2xl" fontWeight="bold" mb={4}>Suggestions For You</Text>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <VStack spacing={4}>
            {suggestedUsers.map((user) => (
              <SuggestedUser key={user.id} user={user} />
            ))}
          </VStack>
        )}
      </Box>
    </Flex>
  );
};

export default SuggestedUsersPage;
