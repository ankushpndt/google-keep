import { useNote } from "../Context/noteContext";
import { NoteCard } from "./NoteCard";
import { v4 } from "uuid";
import "../styles.css";

export const Others = () => {
	const { filteredArr } = useNote();

	return (
		<div className="others">
			<h3 style={{ paddingBottom: "1rem" }}>Others</h3>

			<div>
				{" "}
				{filteredArr
					?.filter((noteItem) => !noteItem.isPinned)
					.sort((a, b) => a.createdAt > b.createdAt)
					.map((noteItem) => {
						return (
							<div
								key={v4()}
								style={{
									backgroundColor: noteItem.color,
									display: "flex",
									flexDirection: "column",
									textAlign: "left",
									maxWidth: "650px",
									margin: "auto",
									padding: "1rem",
									borderRadius: "10px",
									marginBottom: "1rem",
								}}
							>
								<NoteCard noteItem={noteItem} />
							</div>
						);
					})}
			</div>
		</div>
	);
};
