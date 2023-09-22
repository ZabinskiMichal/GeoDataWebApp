import React, { useState } from 'react';

export default function EditPointPopup({ marker, handleUpdate, cancelEdit }) {
  const [editedTitle, setEditedTitle] = useState(marker.title);
  const [editedDescription, setEditedDescription] = useState(marker.description);
  const [selectedImages, setSelectedImages] = useState([]); 


  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedMarker = {
      ...marker,
      title: editedTitle,
      description: editedDescription,
      
    };
    
    handleUpdate(updatedMarker, selectedImages);
    
  };

   const handleFileInputChange = (e) => {
    const files = e.target.files;
    setSelectedImages([...selectedImages, ...files]);
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

        onChange={(e) => {
          if (e.target.value.length <= 255) {
            setEditedDescription(e.target.value);
          }
        }}
        required
        rows={6}
        cols={40}
        style={{ resize: 'vertical' }}
      />

    <label htmlFor='fileInput'>Wybierz zdjęcia:</label>
      <input
        type='file'
        id='fileInput'
        accept='image/*'
        multiple 
        onChange={handleFileInputChange} 
      />

      <br />

      <button className="btn btn-outline-success" type='submit'>Zapisz zmiany</button>
      <br />
      
      <button className="btn btn-danger" type='button' onClick={cancelEdit}>Anuluj
      </button>
    </form>
  );
}
