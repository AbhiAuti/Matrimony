import { Container, Flex, VStack, Box, Image, useBreakpointValue } from "@chakra-ui/react";
import AuthForm from "../../components/AuthForm/AuthForm";

const AuthPage = () => {
	const isMobile = useBreakpointValue({ base: true, md: false });

	return (
		<Flex
			minH={"100vh"}
			justifyContent={"center"}
			alignItems={"center"}
			px={4}
			bgImage="url('/auth1 - Copy.jpg')"
			bgSize="cover"
			bgPosition="center"
		>
			<Container maxW={"container.md"} padding={0}>
				<Flex justifyContent={"center"} alignItems={"center"} gap={10}>
					{/* Left hand-side background image */}
					<Box
						display={{ base: "none", md: "block" }}
						w={{ base: "0", md: "50%" }}
						h={650}
					/>

					{/* Right hand-side content */}
					<VStack spacing={4} align={"stretch"} w={"100%"}>
						<AuthForm />
						<Box textAlign={"center"} fontWeight="bold" fontSize="xl" color={"black"} >Soon On</Box>
						<Flex gap={5} justifyContent={"center"}>
		
								<>
									<Image src='/playstore.png' h={"10"} alt='Playstore logo' />
									<Image src='/microsoft.png' h={"10"} alt='Microsoft logo' />
								</>
							
						</Flex>
					</VStack>
				</Flex>
			</Container>
		</Flex>
	);
};

export default AuthPage;
