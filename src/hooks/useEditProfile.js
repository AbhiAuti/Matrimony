import { useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { firestore, storage } from "../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import useUserProfileStore from "../store/userProfileStore";

const useEditProfile = () => {
  const [isUpdating, setIsUpdating] = useState(false);

  const authUser = useAuthStore((state) => state.user);
  const setAuthUser = useAuthStore((state) => state.setUser);
  const setUserProfile = useUserProfileStore((state) => state.setUserProfile);

  const showToast = useShowToast();

  const editProfile = async (inputs, selectedFile) => {
    if (isUpdating || !authUser) return;
    setIsUpdating(true);

    const storageRef = ref(storage, `profilePics/${authUser.uid}`);
    const userDocRef = doc(firestore, "users", authUser.uid);

    let URL = "";
    try {
      if (selectedFile) {
        await uploadString(storageRef, selectedFile, "data_url");
        URL = await getDownloadURL(ref(storage, `profilePics/${authUser.uid}`));
      }

      // Filter out undefined values
      const updatedUser = {
        ...authUser,
        fullName: inputs.fullName ?? authUser.fullName,
        username: inputs.username ?? authUser.username,
        bio: inputs.bio ?? authUser.bio,
        profilePicURL: URL || authUser.profilePicURL,
        age: inputs.age ?? authUser.age,
        gender: inputs.gender ?? authUser.gender,
        height: inputs.height ?? authUser.height,
        caste: inputs.caste ?? authUser.caste,
        yearlyPackage: inputs.yearlyPackage ?? authUser.yearlyPackage,
        Expectation: inputs.Expectation ?? authUser.Expectation,
      };

      // Ensure no undefined values are passed to Firestore
      const validUser = {};
      Object.keys(updatedUser).forEach((key) => {
        if (updatedUser[key] !== undefined) {
          validUser[key] = updatedUser[key];
        }
      });

      await updateDoc(userDocRef, validUser);
      localStorage.setItem("user-info", JSON.stringify(validUser));
      setAuthUser(validUser);
      setUserProfile(validUser);
      showToast("Success", "Profile updated successfully", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsUpdating(false);
    }
  };

  return { editProfile, isUpdating };
};

export default useEditProfile;
