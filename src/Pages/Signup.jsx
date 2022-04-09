import { useAuth } from "../Context/authContext";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles.css";
import { Loader } from "../Components/Loader";
export const Signup = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const { signUpWithCredentials, error, loader } = useAuth();

	const submitHandler = async (e) => {
		e.preventDefault();

		signUpWithCredentials(name, email, password);
	};

	return (
		<div className="signup">
			{!loader ? (
				<div style={{ maxWidth: "400px", width: "100%" }}>
					<h2 style={{ textAlign: "center", marginBottom: "4px" }}>Sign Up</h2>
					<form
						onSubmit={submitHandler}
						style={{
							margin: "2rem auto",
							padding: "2rem",
							border: "2px solid #f0f0f0",
						}}
					>
						<div className="name">
							<label
								style={{
									display: "block",
									marginLeft: "3.8rem",
									paddingBottom: "0.5rem",
									textAlign: "left",
								}}
							>
								Name
							</label>
							<input
								type="text"
								name="fullName"
								placeholder="Enter your name here"
								onChange={(e) => setName(e.target.value)}
								required
								style={{ padding: "6px", width: "210px" }}
							/>
						</div>
						<div className="email">
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
						</div>
						<div className="password">
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
						</div>
						<input
							type="submit"
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
							value="Sign Up"
						/>
						<p>
							<NavLink
								style={{
									textDecoration: "none",
									color: "#3B82F6",
								}}
								to="/"
							>
								Login instead
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
