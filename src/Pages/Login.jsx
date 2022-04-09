import { useAuth } from "../Context/authContext";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles.css";
import { Loader } from "../Components/Loader";
export const Login = () => {
	const { loginWithCredentials, error, loader } = useAuth();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const submitHandler = (e) => {
		e.preventDefault();
		loginWithCredentials(email, password);
	};

	return (
		<div className="login">
			{!loader ? (
				<div style={{ maxWidth: "400px", width: "100%" }}>
					<h2 style={{ textAlign: "center", marginBottom: "4px" }}>Login</h2>
					<form
						onSubmit={submitHandler}
						style={{
							margin: "2rem auto",
							padding: "2rem",
							border: "2px solid #f0f0f0",
						}}
					>
						<label
							style={{
								display: "block",
								marginLeft: "3.8rem",
								paddingBottom: "0.5rem",
								textAlign: "left",
							}}
						>
							Email
						</label>
						<input
							type="text"
							name="email"
							placeholder="Enter your email here"
							onChange={(e) => setEmail(e.target.value)}
							required
							style={{ padding: "6px", width: "210px" }}
						/>

						<div className="email__error">{error && error.email}</div>
						<br />

						<label
							style={{
								display: "block",
								marginLeft: "3.8rem",
								paddingBottom: "0.5rem",
								textAlign: "left",
							}}
						>
							Password
						</label>

						<input
							type="password"
							name="password"
							placeholder="Enter your password here"
							onChange={(e) => setPassword(e.target.value)}
							required
							style={{
								padding: "6px",
								width: "210px",
							}}
						/>

						<div className="password__error">{error && error.password}</div>
						<br />
						<br />
						<input
							style={{
								width: "63%",
								textAlign: "center",
								marginTop: "2px",
								backgroundColor: "#3B82F6",
								border: "none",
								color: "white",
								padding: "6px",
								borderRadius: "5px",
								marginBottom: "1rem",
								cursor: "pointer",
							}}
							type="submit"
							value="Login"
						/>
						<button
							onClick={() =>
								loginWithCredentials({
									email: "a@gmail.com",
									password: "12345678",
								})
							}
							style={{
								width: "63%",
								textAlign: "center",
								marginTop: "2px",
								backgroundColor: "#3B82F6",
								border: "none",
								color: "white",
								padding: "6px",
								borderRadius: "5px",
								marginBottom: "1rem",
								cursor: "pointer",
							}}
						>
							Guest Login
						</button>
						<p>
							<NavLink
								style={{
									textDecoration: "none",
									color: "#3B82F6",
									width: "100%",
									textAlign: "center",
								}}
								to="/signup"
							>
								Create an account
							</NavLink>
						</p>
					</form>
				</div>
			) : (
				<Loader />
			)}
		</div>
	);
};
