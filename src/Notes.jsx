import { NewNote } from './NewNote';
import { Pinned } from './Pinned';
import { Others } from './Others';
import './styles.css';
export const Notes = () => {
  return (
    <div>
      <div className='notes'>
        <h1>Notes App</h1>
      </div>
      <NewNote />
      <Pinned />
      <Others />
    </div>
  );
};
