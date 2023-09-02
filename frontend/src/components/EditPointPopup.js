import React, { useState } from 'react';

export default function EditPointPopup({ marker, handleUpdate, cancelEdit }) {
  const [editedTitle, setEditedTitle] = useState(marker.title);
  const [editedDescription, setEditedDescription] = useState(marker.description);


  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedMarker = {
      ...marker,
      title: editedTitle,
      description: editedDescription,
      
    };
    
    handleUpdate(updatedMarker);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='editedTitle'>Tytuł:</label>
      <input
        type='text'
        id='editedTitle'
        autoComplete='off'
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
        required
      />

      <label htmlFor='editedDescription'>Opis:</label>
      <textarea
        id='editedDescription'
        autoComplete='off'
        value={editedDescription}
        onChange={(e) => setEditedDescription(e.target.value)}
        required
        rows={6}
        cols={40}
        style={{ resize: 'vertical' }}
      />

      <br />

      <button className="btn btn-outline-success" type='submit'>Zapisz zmiany</button>
      <br />
      
      <button className="btn btn-danger" type='button' onClick={cancelEdit}>Anuluj
      </button>
    </form>
  );
}
