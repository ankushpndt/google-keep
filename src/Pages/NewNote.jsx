import React from "react";
import { v4 } from "uuid";
import { useNote } from "../Context/noteContext";
import { ColorPicker } from "../Components/ColorPicker";
import axios from "axios";
import { useAuth } from "../Context/authContext";
import "../styles.css";
import bookmark from "../assets/bookmark.svg";
import border from "../assets/border.svg";
import { toast } from "react-toastify";
export const NewNote = () => {
	const {
		isPinned,
		setPinned,
		title,
		setTitle,
		content,
		setContent,
		color,
		setColor,
		tag,
		setTag,
		setNotes,
	} = useNote();

	const { token } = useAuth();

	const clear = () => {
		setPinned(false);
		setContent("");
		setTitle("");
		setColor("white");
	};

	const addNote = async () => {
		if (title || content) {
			try {
				toast.loading("Please wait");
				const response = await axios.post(
					"https://googleKeep.ankushpndt.repl.co/notes",
					{
						_id: v4(),
						isPinned: isPinned,
						color: color,
						tag: tag,
						title: title,
						content: content,
					},
					{ headers: { "auth-token": token } }
				);
				if (response.data.success === true) {
					toast.dismiss();
					setNotes(response.data.saveNote.notes);
					toast.success("Note created successfully", {
						position: toast.POSITION.BOTTOM_CENTER,
					});
				}
				clear();
			} catch (error) {
				toast.error(error.response.data.message, {
					position: toast.POSITION.BOTTOM_CENTER,
				});
			}
		} else {
			toast.dismiss();
			toast.error("You cannot add an empty note", {
				position: toast.POSITION.BOTTOM_CENTER,
			});
		}
	};

	return (
		<div className="new__note">
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					textAlign: "left",
					maxWidth: "650px",
					margin: "auto",
					padding: "1rem",
					borderRadius: "10px",
					marginBottom: "1rem",
					backgroundColor: color,
					border: "2px solid",
				}}
			>
				<div style={{ backgroundColor: color }}>
					<div className="new__note__body">
						<input
							type="text"
							placeholder="Enter title here"
							value={title}
							style={{
								border: "none",
								padding: "0.5rem",
							}}
							id="outline"
							onChange={(e) => setTitle(e.target.value)}
						/>
						<button
							style={{
								border: "none",
								backgroundColor: "transparent",
								marginRight: "1rem",
								cursor: "pointer",
							}}
							onClick={() => setPinned((isPinned) => !isPinned)}
						>
							{isPinned ? (
								<img src={bookmark} alt="bookmark" width="20" height="20" />
							) : (
								<img src={border} alt="border" width="20" height="20" />
							)}
						</button>
					</div>
					<br />
					<input
						type="text"
						placeholder="Enter content here"
						value={content}
						style={{
							border: "none",
							padding: "0.5rem",
							width: "100%",
						}}
						onChange={(e) => setContent(e.target.value)}
						id="outline"
					/>
					<br />
					<br />
					<select
						onChange={(e) => setTag(e.target.value)}
						style={{
							width: "6.8rem",
							padding: "0.5rem",
							marginRight: "1rem",
							marginLeft: "0.5rem",
						}}
					>
						<option value="No Tag">No Tag</option>
						<option value="Reminder">Reminder</option>
						<option value="ToDo">ToDo</option>
					</select>
					<button
						style={{
							border: "none",
							backgroundColor: "#111827",
							marginRight: "1rem",
							cursor: "pointer",
							color: "white",
							padding: "0.5rem",
							fontSize: "1rem",
						}}
						onClick={addNote}
					>
						Add
					</button>
					<button className="change__btn" onClick={clear}>
						Clear
					</button>
					<br />
					<div style={{ marginLeft: "0.5rem" }}>
						<ColorPicker />
					</div>
				</div>
			</div>
		</div>
	);
};
