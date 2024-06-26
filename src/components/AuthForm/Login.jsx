import { Alert, AlertIcon, Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { loading, error, login } = useLogin();

  return (
    <>
      <Input
        placeholder="Email"
        fontSize={18}
        type="email"
        size={"sm"}
        value={inputs.email}
        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
        _placeholder={{ color: "gray.300" }}  // Make placeholder color more grey
        borderColor="black"  // Make border more blackish
        _hover={{ borderColor: "black" }}  // Make border more blackish on hover
        _focus={{ borderColor: "black" }}  // Make border more blackish on focus
      />
      <Input
        placeholder="Password"
        fontSize={18}
        size={"sm"}
        type="password"
        value={inputs.password}
        onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
        _placeholder={{ color: "gray.300" }}  // Make placeholder color more grey
        borderColor="black"  // Make border more blackish
        _hover={{ borderColor: "black" }}  // Make border more blackish on hover
        _focus={{ borderColor: "black" }}  // Make border more blackish on focus
      />
      {error && (
        <Alert status="error" fontSize={13} p={2} borderRadius={4}>
          <AlertIcon fontSize={12} />
          {error.message}
        </Alert>
      )}
      <Button
        w={"full"}
        colorScheme="blue"
        size={"sm"}
        fontSize={18}
        isLoading={loading}
        onClick={() => login(inputs)}
      >
        Log in
      </Button>
    </>
  );
};

export default Login;
