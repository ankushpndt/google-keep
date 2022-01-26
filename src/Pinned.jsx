import { useNote } from './noteContext';
import { ColorPicker } from './ColorPicker';
import { v4 } from 'uuid';
import { NoteCard } from './NoteCard';
export const Pinned = () => {
  const { filteredArr } = useNote();
  console.log(filteredArr);
  return (
    <div className='pinned'>
      <h3 style={{ paddingBottom: '1rem' }}>Pinned</h3>
      {filteredArr
        ?.filter((noteItem) => noteItem.isPinned)
        .sort((a, b) => a.createdAt > b.createdAt)
        .map((noteItem) => {
          return (
            <div
              key={v4()}
              style={{
                backgroundColor: noteItem.color,
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'left',
                maxWidth: '650px',
                margin: 'auto',
                padding: '1rem',
                borderRadius: '10px',
                marginBottom: '1rem',
              }}
            >
              <NoteCard noteItem={noteItem} />
            </div>
          );
        })}
    </div>
  );
};
