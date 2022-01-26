import { useNote } from './noteContext';
// import { ColorPicker } from "./ColorPicker";
import { NewNote } from './NewNote';
import { Pinned } from './Pinned';
import { Others } from './Others';
import { SearchBar } from './SearchBar';
export const Notes = () => {
  const { notes } = useNote();
  return (
    <div>
      <h1>Google Keep</h1>
      <SearchBar />
      <NewNote />
      <Pinned />
      <Others />
    </div>
  );
};
