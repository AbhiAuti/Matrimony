import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { collection, getDocs, query ,orderBy} from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetSuggestedUsers = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const authUser = useAuthStore((state) => state.user);
    const showToast = useShowToast();

    useEffect(() => {
        const getSuggestedUsers = async () => {
            setIsLoading(true);
            try {
                if (authUser) {
                    const usersRef = collection(firestore, "users");
                 const q = query(usersRef,orderBy('createdAt', 'desc'));
                    const querySnapshot = await getDocs(q);
                    const users = [];
                    querySnapshot.forEach((doc) => {
                        const user = doc.data();
                        // Filter users by gender
                        if (user.gender !== authUser.gender) {
                            users.push({ ...user, id: doc.id });
                        }
                    });
                    setSuggestedUsers(users);
                }
            } catch (error) {
                showToast("Error", error.message, "error");
            } finally {
                setIsLoading(false);
            }
        };

        getSuggestedUsers();
    }, [authUser, showToast]);

    return { isLoading, suggestedUsers };
};

export default useGetSuggestedUsers;
