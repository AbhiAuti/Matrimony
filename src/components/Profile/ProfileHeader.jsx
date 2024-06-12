import {
  Avatar,
  AvatarGroup,
  Button,
  Flex,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import EditProfile from "./EditProfile";
import useFollowUser from "../../hooks/useFollowUser";

const ProfileHeader = () => {
  const { userProfile } = useUserProfileStore();
  const authUser = useAuthStore((state) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(
    userProfile?.uid
  );
  const visitingOwnProfileAndAuth =
    authUser && authUser.username === userProfile.username;
  const visitingAnotherProfileAndAuth =
    authUser && authUser.username !== userProfile.username;

	  const handleSendMessage = async () => {
      try {
        // Construct the mailto URL with recipient's email pre-filled
        const mailtoUrl = `mailto:${userProfile.email}?subject=Message`;
  
        // Open the default email client with the pre-filled email
        window.open(mailtoUrl);
      } catch (error) {
        showToast("Error", error.message, "error");
      }
    };
  return (
    <Flex
      gap={{ base: 4, sm: 10 }}
      py={10}
      direction={{ base: "column", sm: "row" }}
      alignItems={{ base: "center", sm: "flex-start" }}
    >
      <AvatarGroup
        size={{ base: "xl", md: "2xl" }}
        justifySelf={"center"}
        alignSelf={{ base: "center", sm: "flex-start" }}
      >
        <Avatar src={userProfile.profilePicURL} alt="Profile picture" />
      </AvatarGroup>

      <VStack
        alignItems={{ base: "center", sm: "flex-start" }}
        gap={4}
        mx={"auto"}
        flex={1}
      >
        {visitingOwnProfileAndAuth && (
          <Flex alignSelf={{ base: "center", sm: "flex-end" }}>
            <Button
              bg={"blue.500"}
              color={"white"}
              _hover={{ bg: "blue.600" }}
              size={{ base: "sm", md: "md" }}
              onClick={onOpen}
            >
              Edit Profile
            </Button>
          </Flex>
        )}
        <Flex
          direction={"column"}
          alignItems={{ base: "center", sm: "start" }}
          gap={2}
        >
          <Text
            fontSize={{ base: "2xl", sm: "3xl" }}
            fontWeight={"bold"}
            color={"white"}
          >
            {userProfile.username}
          </Text>
          <Text
            fontSize={{ base: "xl", sm: "2xl" }}
            fontWeight={"bold"}
            color={"blue.500"}
          >
            {userProfile.fullName}
          </Text>
        </Flex>

        <Text
          fontSize={{ base: "md", sm: "xl" }}
          color={"grey.100"}
          textAlign={{ base: "center", sm: "left" }}
        >
          {userProfile.bio}
        </Text>

        {/* New Fields */}
        <VStack alignItems={{ base: "center", sm: "start" }} spacing={4}>
          <Flex alignItems={"center"} gap={4}>
            <Text fontSize={"lg"} color={"white"}>
              <span role="img" aria-label="birthday">
                🎂
              </span>
              <Text as="span" fontWeight={"bold"} mr={1}>
                Age (वय):
              </Text>
            </Text>
            <Text fontSize={"lg"} color={"blue.300"}>
              {userProfile.age}
            </Text>
          </Flex>
          <Flex alignItems={"center"} gap={4}>
            <Text fontSize={"lg"} color={"white"}>
              <span role="img" aria-label="height">
                📏
              </span>
              <Text as="span" fontWeight={"bold"} mr={1}>
                Height (उंची):
              </Text>
            </Text>
            <Text fontSize={"lg"} color={"blue.300"}>
              {userProfile.height}
            </Text>
          </Flex>
          <Flex alignItems={"center"} gap={4}>
            <Text fontSize={"lg"} color={"white"}>
              <span role="img" aria-label="caste">
                🪔
              </span>
              <Text as="span" fontWeight={"bold"} mr={1}>
                Caste (जात):
              </Text>
            </Text>
            <Text fontSize={"lg"} color={"blue.300"}>
              {userProfile.caste}
            </Text>
          </Flex>
          <Flex alignItems={"center"} gap={4}>
            <Text fontSize={"lg"} color={"white"}>
              <span role="img" aria-label="package">
                💼
              </span>
              <Text as="span" fontWeight={"bold"} mr={1}>
                Yearly Package:
              </Text>
            </Text>
            <Text fontSize={"lg"} color={"blue.300"}>
              {userProfile.yearlyPackage}
            </Text>
          </Flex>
          <Flex alignItems={"center"} gap={4}>
            <Text fontSize={"lg"} color={"white"}>
              <span role="img" aria-label="expectation">
                🌟
              </span>
              <Text as="span" fontWeight={"bold"} mr={1}>
                Expectation (अपेक्षा):
              </Text>
            </Text>
            <Text fontSize={"lg"} color={"blue.300"}>
              {userProfile.Expectation}
            </Text>
          </Flex>
        </VStack>

        {visitingAnotherProfileAndAuth && (
          <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
            <Button
              bg="blue.500"
              color="white"
              _hover={{ bg: "blue.600" }}
              size={{ base: "xs", md: "sm" }}
              onClick={handleSendMessage}
            >
              Message
            </Button>
          </Flex>
        )}
      </VStack>
      {isOpen && <EditProfile isOpen={isOpen} onClose={onClose} />}
    </Flex>
  );
};

export default ProfileHeader;
