import { Box, Flex, Spinner, useMediaQuery } from "@chakra-ui/react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import Navbar from "../../components/Navbar/Navbar";

const PageLayout = ({ children }) => {
	const { pathname } = useLocation();
	const [user, loading] = useAuthState(auth);
	const canRenderSidebar = pathname !== "/auth" && user;
	const canRenderNavbar = !user && !loading && pathname !== "/auth";
	const [isMobile] = useMediaQuery("(max-width: 768px)");

	const checkingUserIsAuth = !user && loading;
	if (checkingUserIsAuth) return <PageLayoutSpinner />;

	return (
		<Flex flexDir={canRenderNavbar ? "column" : "row"}>
			{/* Sidebar on the left */}
			{canRenderSidebar && !isMobile ? (
				<Box w={{ base: "70px", md: "240px" }}>
					<Sidebar />
				</Box>
			) : null}
			{/* Navbar */}
			{canRenderNavbar ? <Navbar /> : null}
			{/* Page content on the right */}
			<Box flex={1} w="100%" mx="auto">
				{children}
			</Box>
		</Flex>
	);
};

export default PageLayout;

const PageLayoutSpinner = () => {
	return (
		<Flex flexDir="column" h="100vh" alignItems="center" justifyContent="center">
			<Spinner size="xl" />
		</Flex>
	);
};
