import { Flex } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";
import CreatePost from "./CreatePost";
import Home from "./Home";
import ProfileLink from "./ProfileLink";
import Search from "./Search";

const SidebarItems = () => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  

  return (
    <Flex direction="column" gap={4}>
      <Home />
      <Search />
      <CreatePost />
      <ProfileLink />
    </Flex>
  );
};

export default SidebarItems;
