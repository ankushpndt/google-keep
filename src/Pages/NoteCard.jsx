import axios from "axios";
import { useState } from "react";
import { useNote } from "../Context/noteContext";
import { useAuth } from "../Context/authContext";
import { ColorPicker } from "../Components/ColorPicker";
import "../styles.css";
import bookmark from "../assets/bookmark.svg";
import border from "../assets/border.svg";
import { toast } from "react-toastify";
export const NoteCard = ({ noteItem }) => {
	const { setNotes } = useNote();

	const [noteTitle, setNoteTitle] = useState(noteItem.title);
	const [noteContent, setNoteContent] = useState(noteItem.content);
	const [noteTag, setNoteTag] = useState(noteItem.tag);
	const [noteColor, setNoteColor] = useState(noteItem.color);
	const [pin, setPin] = useState(noteItem.isPinned);
	const { token } = useAuth();

	const updateNote = async (noteItem) => {
		try {
			const response = await axios.put(
				`https://googleKeep.ankushpndt.repl.co/notes`,
				{
					_id: noteItem._id,
					title: noteTitle,
					content: noteContent,
					tag: noteTag,
					color: noteColor,
					isPinned: pin,
				},
				{ headers: { "auth-token": token } }
			);
			setNotes(response.data.savedNote.notes);
			toast.success(response.data.message, {
				position: toast.POSITION.BOTTOM_CENTER,
			});
		} catch (error) {
			toast.error(error.response.data.message, {
				position: toast.POSITION.BOTTOM_CENTER,
			});
		}
	};

	const deleteNote = async (noteItem) => {
		try {
			const response = await axios.delete(
				`https://googleKeep.ankushpndt.repl.co/notes/${noteItem._id}`,
				{ headers: { "auth-token": token } }
			);

			setNotes(response.data.savedNote?.notes);
			toast.success(response.data.message, {
				position: toast.POSITION.BOTTOM_CENTER,
			});
		} catch (error) {
			toast.error(error.response.message, {
				position: toast.POSITION.BOTTOM_CENTER,
			});
		}
	};

	const pinChangeHandler = () => {
		setPin((pin) => !pin);
	};

	return (
		<div className="note__card">
			{
				<>
					<div className="note__card__body">
						<div
							className="edit__title"
							contentEditable="true"
							role="textbox"
							onInput={(e) =>
								setNoteTitle(e.target.innerText.replace(/\n/g, ""))
							}
							suppressContentEditableWarning={true}
							data-text="Enter title here"
						>
							{noteItem?.title}
						</div>
						<div className="note__pin">
							<button
								style={{
									border: "none",
									backgroundColor: "transparent",
									marginRight: "1rem",
									cursor: "pointer",
								}}
								onClick={pinChangeHandler}
							>
								{pin ? (
									<img src={bookmark} alt="bookmark" width="20" height="20" />
								) : (
									<img src={border} alt="border" width="20" height="20" />
								)}
							</button>
						</div>
					</div>
					<div
						className="edit__content"
						contentEditable="true"
						role="textbox"
						onInput={(e) =>
							setNoteContent(e.target.innerText.replace(/\n/g, ""))
						}
						suppressContentEditableWarning={true}
						data-text="Enter content here"
					>
						{noteItem?.content}
					</div>

					<select
						onChange={(e) => setNoteTag(e.target.value)}
						style={{
							border: "none",
							width: "6.8rem",
							padding: "0.5rem",
							marginRight: "1rem",
						}}
						value={noteTag}
					>
						<option value="No Tag">No Tag</option>
						<option value="Reminder">Reminder</option>
						<option value="ToDo">ToDo</option>
					</select>

					<button className="change__btn" onClick={() => updateNote(noteItem)}>
						Save
					</button>
					<button className="change__btn" onClick={() => deleteNote(noteItem)}>
						Delete
					</button>
				</>
			}
			<ColorPicker id={noteItem._id} />
		</div>
	);
};
