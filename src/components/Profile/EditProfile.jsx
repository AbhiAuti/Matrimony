import {
	Avatar,
	Button,
	Center,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Select,
	Stack,
  } from "@chakra-ui/react";
  import { useRef, useState, useEffect } from "react";
  import useAuthStore from "../../store/authStore";
  import usePreviewImg from "../../hooks/usePreviewImg";
  import useEditProfile from "../../hooks/useEditProfile";
  import useShowToast from "../../hooks/useShowToast";
  
  const EditProfile = ({ isOpen, onClose }) => {
	const authUser = useAuthStore((state) => state.user);
  
	const [inputs, setInputs] = useState({
	  fullName: "",
	  username: "",
	  bio: "",
	  age: "",
	  gender: "",
	  heightFeet: "",
	  heightInches: "",
	  caste: "",
	  yearlyPackage: "",
	  Expectation: "",
	});
  
	useEffect(() => {
	  if (authUser) {
		const [heightFeet, heightInches] = authUser.height
		  ? authUser.height.split("'").map((part) => part.replace('"', '').trim())
		  : ["", ""];
		setInputs({
		  fullName: authUser.fullName || "",
		  username: authUser.username || "",
		  bio: authUser.bio || "",
		  age: authUser.age || "",
		  gender: authUser.gender || "",
		  heightFeet: heightFeet || "",
		  heightInches: heightInches || "",
		  caste: authUser.caste || "",
		  yearlyPackage: authUser.yearlyPackage || "",
		  Expectation: authUser.Expectation || "",
		});
	  }
	}, [authUser]);
  
	const fileRef = useRef(null);
	const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
	const { isUpdating, editProfile } = useEditProfile();
	const showToast = useShowToast();
  
	const handleEditProfile = async () => {
	  try {
		await editProfile(
		  {
			...inputs,
			height: `${inputs.heightFeet}' ${inputs.heightInches}"`,
		  },
		  selectedFile
		);
		setSelectedFile(null);
		onClose();
	  } catch (error) {
		showToast("Error", error.message, "error");
	  }
	};
  
	const packageOptions = [
	 
	  "Not Working",
	  "3 Lakh",
	  "4 Lakh",
	  "5 Lakh",
	  "6 Lakh",
	  "7 Lakh",
	  "8 Lakh",
	  "9 Lakh",
	  "10 Lakh",
	  "12 Lakh",
	  "14 Lakh",
	  "16 Lakh",
	  "18 Lakh",
	  "20 Lakh",
	  "25 Lakh",
	  "30 Lakh",
	  "30 Lakh+",
	];
  
	return (
	  <Modal isOpen={isOpen} onClose={onClose}>
		<ModalOverlay />
		<ModalContent bg={"black"} boxShadow={"xl"} border={"1px solid gray"} mx={3}>
		  <ModalHeader />
		  <ModalCloseButton />
		  <ModalBody>
			<Flex bg={"black"}>
			  <Stack spacing={4} w={"full"} maxW={"md"} bg={"black"} p={6} my={0}>
				<Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
				  Edit Profile
				</Heading>
				<FormControl>
				  <Stack direction={["column", "row"]} spacing={6}>
					<Center>
					  <Avatar
						size="xl"
						src={selectedFile || authUser.profilePicURL}
						border={"2px solid white "}
					  />
					</Center>
					<Center w="full">
					  <Button w="full" onClick={() => fileRef.current.click()}>
						Edit Profile Picture
					  </Button>
					</Center>
					<Input type="file" hidden ref={fileRef} onChange={handleImageChange} />
				  </Stack>
				</FormControl>
  
				<FormControl>
				  <FormLabel fontSize={"sm"}>Full Name</FormLabel>
				  <Input
					placeholder={"Full Name"}
					size={"sm"}
					type={"text"}
					value={inputs.fullName}
					onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
				  />
				</FormControl>
  
				<FormControl>
				  <FormLabel fontSize={"sm"}>Username</FormLabel>
				  <Input
					placeholder={"Username"}
					size={"sm"}
					type={"text"}
					value={inputs.username}
					onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
				  />
				</FormControl>
  
				<FormControl>
				  <FormLabel fontSize={"sm"}>Bio</FormLabel>
				  <Input
					placeholder={"Bio"}
					size={"sm"}
					type={"text"}
					value={inputs.bio}
					onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
				  />
				</FormControl>
  
				<FormControl>
				  <FormLabel fontSize={"sm"}>Age</FormLabel>
				  <Input
					placeholder={"Age"}
					size={"sm"}
					type={"number"}
					value={inputs.age}
					onChange={(e) => setInputs({ ...inputs, age: e.target.value })}
				  />
				</FormControl>
  
				<FormControl>
				  <FormLabel fontSize={"sm"}>Gender</FormLabel>
				  <Select
					placeholder={"Select gender"}
					size={"sm"}
					value={inputs.gender}
					onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
				  >
					<option value="male">Male</option>
					<option value="female">Female</option>
				  </Select>
				</FormControl>
  
				<FormControl>
				  <FormLabel fontSize={"sm"}>Height (in feet and inches)</FormLabel>
				  <Flex gap={2}>
					<Input
					  placeholder={"Feet"}
					  size={"sm"}
					  type={"number"}
					  value={inputs.heightFeet}
					  onChange={(e) => setInputs({ ...inputs, heightFeet: e.target.value })}
					/>
					<Input
					  placeholder={"Inches"}
					  size={"sm"}
					  type={"number"}
					  value={inputs.heightInches}
					  onChange={(e) => setInputs({ ...inputs, heightInches: e.target.value })}
					/>
				  </Flex>
				</FormControl>
  
				<FormControl>
				  <FormLabel fontSize={"sm"}>Caste</FormLabel>
				  <Input
					placeholder={"Caste"}
					size={"sm"}
					type={"text"}
					value={inputs.caste}
					onChange={(e) => setInputs({ ...inputs, caste: e.target.value })}
				  />
				</FormControl>
  
				<FormControl>
				  <FormLabel fontSize={"sm"}>Yearly Package</FormLabel>
				  <Select
					placeholder={"Select package"}
					size={"sm"}
					value={inputs.yearlyPackage}
					onChange={(e) => setInputs({ ...inputs, yearlyPackage: e.target.value })}
				  >
					{packageOptions.map((option) => (
					  <option key={option} value={option}>
						{option}
					  </option>
					))}
				  </Select>
				</FormControl>
  
				<FormControl>
				  <FormLabel fontSize={"sm"}>Expectation</FormLabel>
				  <Input
					placeholder={"Expectation"}
					size={"sm"}
					type={"text"}
					value={inputs.Expectation}
					onChange={(e) => setInputs({ ...inputs, Expectation: e.target.value })}
				  />
				</FormControl>
  
				<Stack spacing={6} direction={["column", "row"]}>
				  <Button
					bg={"red.400"}
					color={"white"}
					w="full"
					size="sm"
					_hover={{ bg: "red.500" }}
					onClick={onClose}
				  >
					Cancel
				  </Button>
				  <Button
					bg={"blue.400"}
					color={"white"}
					size="sm"
					w="full"
					_hover={{ bg: "blue.500" }}
					onClick={handleEditProfile}
					isLoading={isUpdating}
				  >
					Submit
				  </Button>
				</Stack>
			  </Stack>
			</Flex>
		  </ModalBody>
		</ModalContent>
	  </Modal>
	);
  };
  
  export default EditProfile;
  
