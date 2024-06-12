import React from "react";
import { Flex, Link, Tooltip, Button,Image } from "@chakra-ui/react";
import { InstagramMobileLogo } from "../../assets/constants";
import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
import { Link as RouterLink } from "react-router-dom";

const MobileHeader = () => {
  const { handleLogout, isLoggingOut } = useLogout();

  return (
    <Flex
      bg="gray.800"
      py={2}
      px={4}
      alignItems="center"
      justifyContent="space-between"
      position="fixed"
      width="100%"
      top={0}
      zIndex={999}
    >
      <Link to="/" as={RouterLink}>
      <Image src="/logo.png" height={14} alt="Solemates" />
      </Link>
      <Tooltip
        hasArrow
        label={"Logout"}
        placement="bottom"
        openDelay={500}
      >
        <Button
          variant="ghost"
          _hover={{ bg: "transparent" }}
          isLoading={isLoggingOut}
          onClick={handleLogout}
        >
          <BiLogOut size={25} />
        </Button>
      </Tooltip>
    </Flex>
  );
};

export default MobileHeader;
