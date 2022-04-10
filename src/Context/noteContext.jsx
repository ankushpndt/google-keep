import { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "./authContext";
const noteContext = createContext();

export const NoteProvider = ({ children }) => {
	const { token } = useAuth();
	const [loader, setLoader] = useState(false);
	useEffect(() => {
		loadInitialData();
	}, [token]);
	const loadInitialData = async () => {
		if (token) {
			try {
				setLoader(true);
				const response = await axios.get(
					"https://googleKeep.ankushpndt.repl.co/notes",

					{ headers: { "auth-token": token } }
				);

				setNotes(response.data.notes);
				setLoader(false);
			} catch (error) {
				toast.error(error.response.data.message, {
					position: toast.POSITION.BOTTOM_CENTER,
				});
			}
		}
	};

	const [notes, setNotes] = useState([]);
	const [color, setColor] = useState("white");
	const [show, setShow] = useState(false);
	const [isPinned, setPinned] = useState(false);
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [tag, setTag] = useState("No Tag");
	const [search, setSearch] = useState("");
	const [filteredArr, setFilteredArr] = useState([]);

	return (
		<noteContext.Provider
			value={{
				notes,
				setNotes,
				setColor,
				color,
				show,
				setShow,
				isPinned,
				setPinned,
				title,
				setTitle,
				content,
				setContent,
				tag,
				setTag,
				search,
				setSearch,
				filteredArr,
				setFilteredArr,
				loader,
			}}
		>
			{children}
		</noteContext.Provider>
	);
};

export const useNote = () => useContext(noteContext);
