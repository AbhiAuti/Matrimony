import { Box, Flex, Image, VStack } from "@chakra-ui/react";
import GoogleAuth from "./GoogleAuth";

const AuthForm = () => {
  return (
    <>
      <Box border={"2px solid black"} borderRadius={4} padding={5} >
        <VStack spacing={4}>
          <Image src="/logo.png" h={24} cursor={"pointer"} alt="Solemates" />
          <GoogleAuth prefix="Continue" fontWeight="bold"/>
		  
        </VStack>
      </Box>
    </>
  );
};

export default AuthForm;
