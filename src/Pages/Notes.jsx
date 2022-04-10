import { NewNote } from "./NewNote";
import { Pinned } from "./Pinned";
import { Others } from "./Others";
import "../styles.css";
import { Loader } from "../Components/Loader";
import { useNote } from "../Context/noteContext";
export const Notes = () => {
	const { loader } = useNote();
	return (
		<>
			{!loader ? (
				<div>
					<div className="notes">
						<h1>Notes App</h1>
					</div>
					<NewNote />
					<Pinned />
					<Others />
				</div>
			) : (
				<Loader />
			)}
		</>
	);
};
