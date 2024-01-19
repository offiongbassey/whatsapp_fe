import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { getLoggedInStatus, logout, setLogin } from "../features/userSlice";
import { destroyActiveConversation } from "../features/chatSlice";

const RedirectLoggedOutUser = async (path) => {
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const redirectUser = async () => {
            const is_logged_in = await dispatch(getLoggedInStatus(user.token));
            dispatch(setLogin(is_logged_in.payload));
            if(!is_logged_in.payload){
                dispatch(logout());
                dispatch(destroyActiveConversation());
                navigate(path);
            }
        }
        redirectUser();
    }, [path, navigate, dispatch]);
}

export default RedirectLoggedOutUser;