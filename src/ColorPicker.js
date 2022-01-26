import React, { useState } from 'react';
import { v4 } from 'uuid';
import { useNote } from './noteContext';
import './styles.css';
export const ColorPicker = ({ id }) => {
  // console.log(id);

  const colors = [
    {
      id: 1,
      color: '#ef4444',
    },
    {
      id: 2,
      color: '#fde68a',
    },
    {
      id: 3,
      color: '#3b82f6',
    },
    {
      id: 4,
      color: '#10b981',
    },
    {
      id: 5,
      color: 'white',
    },
  ];
  const { setColor } = useNote();
  const { notes, setNotes } = useNote();

  const updateColor = (color) => {
    if (id) {
      let updatedNotes = notes.map((note, i) => {
        if (note._id === id) {
          return { ...note, color: color };
        } else return note;
      });
      setNotes(updatedNotes);
    } else {
      setColor(color);
    }
  };

  return (
    <div style={{ padding: '1rem 0' }}>
      {colors.map(({ id, color }) => (
        <button
          key={v4()}
          style={{
            borderRadius: '50%',
            height: '25px',
            width: '25px',
            backgroundColor: color,
            marginRight: '0.5rem',
            cursor: 'pointer',
          }}
          onClick={() => updateColor(color)}
          id='color__btn'
        ></button>
      ))}
    </div>
  );
};
