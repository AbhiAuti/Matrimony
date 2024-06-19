import { Box, Flex, Image, VStack } from "@chakra-ui/react";
import { useState } from "react";
import GoogleAuth from "./GoogleAuth";
import Login from "./Login";
import Signup from "./Signup";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  
  return (
    <>
      <Box border={"2px solid black"} borderRadius={4} padding={5} >
        <VStack spacing={4}>
          <Image src="/logo.png" h={24} cursor={"pointer"} alt="Solemates" />
          {isLogin ? <Login /> : <Signup />}
          <GoogleAuth prefix="Continue" fontWeight="bold"/>
        </VStack>
      </Box>
      
      <Box border={"2px solid black"} borderRadius={4} padding={5} marginTop={4}>
        <Flex alignItems={"center"} justifyContent={"center"}>
          <Box mx={2} fontSize={18} color={"black"}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </Box>
          <Box onClick={() => setIsLogin(!isLogin)} fontSize={18} fontWeight="bold" color={"blue.500"} cursor={"pointer"}>
            {isLogin ? "Sign up" : "Log in"}
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default AuthForm;
