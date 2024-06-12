import React, { useState } from "react";
import { Box, Flex, Tooltip, IconButton, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { BsFillHeartFill } from "react-icons/bs";
import { AiFillHome, AiOutlineSearch, AiOutlinePlusCircle } from "react-icons/ai";
import Search from "../Sidebar/Search";
import CreatePost from "../Sidebar/CreatePost";
import ProfileLink from "../Sidebar/ProfileLink";

const MobileFooter = () => {
  return (
    <>
      <Box
        position="fixed"
        bottom={0}
        left={0}
        width="100%"
        zIndex={999}
        bg="gray.800"
        p={2}
        display={{ base: "flex", md: "none" }}
      >
        <Flex justifyContent="space-between" alignItems="center" width="100%">
          <Tooltip hasArrow label="Home" placement="top" openDelay={500}>
            <IconButton
              as={RouterLink}
              to="/"
              icon={<AiFillHome color="white" />}
              aria-label="Home"
              variant="ghost"
              colorScheme="whiteAlpha"
              boxSize="12" 
              fontSize="24px"
            />
          </Tooltip>
          <Search />
          <Button
            leftIcon={<BsFillHeartFill color="red" />}
            as={RouterLink}
            to="/suggested-users"
            variant="solid"
            colorScheme="whiteAlpha"
            bg="white"
            _hover={{ bg: "gray.600" }}
          >
            For You
          </Button>
          <CreatePost />
          <ProfileLink />
        </Flex>
      </Box>
    </>
  );
};

export default MobileFooter;
