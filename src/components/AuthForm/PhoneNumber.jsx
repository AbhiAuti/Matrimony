import { Button, Flex, Input } from "@chakra-ui/react";
import { useState } from "react";

const PhoneNumber = ({ onPhoneNumberSubmit }) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = () => {
    // Here you can perform any validation on the phone number
    // For example, check if it's a valid phone number format
    // Then call the onPhoneNumberSubmit callback with the phone number
    onPhoneNumberSubmit(phoneNumber);
  };

  return (
    <Flex direction="column" alignItems="center">
      <Input
        type="tel"
        placeholder="Enter your phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        mb={4}
      />
      <Button colorScheme="blue" onClick={handleSubmit}>
        Submit
      </Button>
    </Flex>
  );
};

export default PhoneNumber;
