import { Avatar, Box,Button, Flex, SkeletonCircle, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { timeAgo } from "../../utils/timeAgo";

const PostHeader = ({ post, creatorProfile }) => {
  return (
    <Flex justifyContent="space-between" alignItems="center" w="full" my={2}>
      <Flex alignItems="center" gap={2}>
        {creatorProfile ? (
          <Link to={`/${creatorProfile.username}`}>
            <Avatar src={creatorProfile.profilePicURL} alt="user profile pic" size="sm" />
          </Link>
        ) : (
          <SkeletonCircle size="10" />
        )}

        <Flex fontSize={12} fontWeight="bold" gap="2">
          {creatorProfile ? (
            <Link to={`/${creatorProfile.username}`}>{creatorProfile.username}</Link>
          ) : (
            <Box w="100px" h="10px" />
          )}

          <Text color="gray.500">• {timeAgo(post.createdAt)}</Text>
        </Flex>
      </Flex>
      <Box>
        <Button
          as={Link}
          to={`/${creatorProfile?.username}`}
          size="xs"
          bg="transparent"
          fontSize={12}
          color="blue.500"
          fontWeight="bold"
          _hover={{ color: "white" }}
          transition="0.2s ease-in-out"
        >
         View Profile
        </Button>
      </Box>
    </Flex>
  );
};

export default PostHeader;
