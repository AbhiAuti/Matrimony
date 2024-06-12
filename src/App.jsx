import React from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import SuggestedUsersPage from "./components/SuggestedUsers/SuggestedUsersPage";
import PageLayout from "./Layouts/PageLayout/PageLayout";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
import useAddToHomeScreenPrompt from './hooks/useAddToHomeScreenPrompt';
import MobileFooter from '../src/components/Footer/MobileFooter'; 
import MobileHeader from '../src/components/Header/MobileHeader'; 
import { Flex, useMediaQuery } from "@chakra-ui/react"; // Import Flex and useMediaQuery

function App() {
	const [authUser] = useAuthState(auth);
	const promptToInstall = useAddToHomeScreenPrompt();
	const [isMobile] = useMediaQuery("(max-width: 768px)"); // Check if it's a mobile screen
  
	React.useEffect(() => {
	  if (promptToInstall) {
		promptToInstall();
	  }
	}, [promptToInstall]);
  
	return (
	  <Flex direction="column" minHeight="100vh"> {/* Ensure content takes up full height */}
		{authUser && isMobile && <MobileHeader />} {/* Render MobileHeader only on mobile screens and when user is authenticated */}
		<PageLayout>
		  <Routes>
			<Route path='/' element={authUser ? <HomePage /> : <Navigate to='/auth' />} />
			<Route path='/auth' element={!authUser ? <AuthPage /> : <Navigate to='/' />} />
			<Route path='/:username' element={<ProfilePage />} />
			{authUser && <Route path="/suggested-users" element={<SuggestedUsersPage />} />} {/* Render SuggestedUsersPage only when user is authenticated */}
		  </Routes>
		</PageLayout>
		{authUser && isMobile && <MobileFooter />} {/* Render MobileFooter only on mobile screens and when user is authenticated */}
	  </Flex>
	);
  }
  
  export default App;
  