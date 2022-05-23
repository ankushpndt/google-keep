import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const navigate = useNavigate();

	const {
		isUserLoggedIn,
		token: savedToken,
		user: userName,
	} = JSON.parse(localStorage?.getItem("login")) || {
		isUserLoggedIn: false,
		token: null,
		user: "",
	};

	const [login, setLogin] = useState(isUserLoggedIn);
	const [token, setToken] = useState(savedToken);
	const [error, setError] = useState("");
	const [user, setUser] = useState(userName);
	const [loader, setLoader] = useState(false);
	// const navigate = useNavigate();

	//signup

	const signUpWithCredentials = async (name, email, password) => {
		try {
			setLoader(true);
			const response = await axios.post(
				"https://googleKeep.ankushpndt.repl.co/user/signup",
				{ name: name, email: email, password: password }
			);

			signUpUser(response.data);
			setLoader(false);
		} catch (error) {
			toast.error(error.response.data.message, {
				position: toast.POSITION.BOTTOM_CENTER,
			});
			setLoader(false);
		}
	};
	const signUpUser = ({ token, userName }) => {
		setToken(token);
		setLogin(true);
		setUser(userName);
		localStorage.setItem(
			"login",
			JSON.stringify({ isUserLoggedIn: true, token, user: userName })
		);
		toast.success("Account created successfully!", {
			position: toast.POSITION.BOTTOM_CENTER,
		});
		navigate("/home");
	};
	// login;
	const loginWithCredentials = async ({ email, password }) => {
		try {
			setLoader(true);
			const response = await axios.post(
				"https://googleKeep.ankushpndt.repl.co/user/login",
				{
					email: email,
					password: password,
				}
			);

			loginUser(response.data);
			setLoader(false);
			if (response.status === 200) navigate("/home");
		} catch (error) {
			toast.error(error.response.data.message, {
				position: toast.POSITION.BOTTOM_CENTER,
			});
			setLoader(false);
		}
	};
	const loginUser = ({ token, userName }) => {
		setToken(token);
		setLogin(true);
		setUser(userName);
		localStorage.setItem(
			"login",
			JSON.stringify({ isUserLoggedIn: true, token, user: userName })
		);
		toast.success("Logged In Successfully!", {
			position: toast.POSITION.BOTTOM_CENTER,
		});
		navigate("/home");
	};
	const userLogout = async () => {
		localStorage.removeItem("login");
		setLogin(false);
		setToken("");
		setUser("");
		navigate("/");
		toast.success("Logged out successfully");
	};

	return (
		<AuthContext.Provider
			value={{
				login,
				loginWithCredentials,
				signUpWithCredentials,
				error,
				token,
				userLogout,
				user,
				loader,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
export const useAuth = () => useContext(AuthContext);
