import React, { useState, useRef } from 'react';
import { v4 } from 'uuid';
import { useNote } from './noteContext';
import { ColorPicker } from './ColorPicker';
import axios from 'axios';
import { useAuth } from './authContext';
import './styles.css';
import bookmark from './assets/bookmark.svg';
import border from './assets/border.svg';
export function NewNote() {
  const { isPinned, setPinned } = useNote();
  const { title, setTitle } = useNote();
  const { content, setContent } = useNote();
  const [isActive, setIsActive] = useState(false);
  const { color, setColor } = useNote();
  const { notes, setNotes } = useNote();
  const { tag, setTag } = useNote();
  const { setShow } = useNote();
  const { token } = useAuth();

  const clear = () => {
    setPinned(false);
    setIsActive(false);
    setContent('');
    setTitle('');
    setColor('white');
  };

  const addNote = async () => {
    if (title || content) {
      try {
        const response = await axios.post(
          'https://googleKeep.ankushpndt.repl.co/notes',
          {
            _id: v4(),
            isPinned: isPinned,
            color: color,
            tag: tag,
            title: title,
            content: content,
          },
          { headers: { 'auth-token': token } }
        );

        setNotes(response.data.saveNote.notes);
        clear();
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('You cannot add empty note');
    }
  };

  return (
    <div>
      <div
        onFocus={() => setIsActive(true)}
        style={{
          border: '2px solid #f0f0f0',
          borderRadius: '8px',
          width: '650px',
          margin: 'auto',
          padding: '1rem',
          backgroundColor: color,
        }}
      >
        <div style={{ backgroundColor: color }}>
          <input
            type='text'
            placeholder='Enter title here'
            value={title}
            style={{
              border: 'none',
              padding: '0.5rem',
              marginBottom: '1rem',
              marginRight: '2.3rem',
            }}
            id='outline'
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            style={{
              border: 'none',
              backgroundColor: 'transparent',
              marginRight: '1rem',
              cursor: 'pointer',
            }}
            onClick={() => setPinned((isPinned) => !isPinned)}
          >
            {isPinned ? (
              <img src={bookmark} alt='bookmark' width='20' height='20' />
            ) : (
              <img src={border} alt='border' width='20' height='20' />
            )}
          </button>
          <br />
          <input
            type='text'
            placeholder='Enter content here'
            value={content}
            style={{
              border: 'none',
              padding: '0.5rem',
              marginBottom: '1rem',
              marginRight: '4.5rem',
            }}
            onChange={(e) => setContent(e.target.value)}
            id='outline'
          />

          <br />
          <ColorPicker />
          <select
            onChange={(e) => setTag(e.target.value)}
            style={{
              border: 'none',
              width: '6.8rem',
              padding: '0.5rem',
              margin: '1rem',
            }}
          >
            <option value='No Tag'>No Tag</option>
            <option value='Reminder'>Reminder</option>
            <option value='ToDo'>ToDo</option>
          </select>
          <button
            style={{
              border: 'none',
              backgroundColor: '#111827',
              marginRight: '1rem',
              cursor: 'pointer',
              color: 'white',
              padding: '0.5rem',
              // borderRadius: '5px',
              fontSize: '1rem',
            }}
            onClick={addNote}
          >
            Add
          </button>
          <button className='change__btn' onClick={clear}>
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
