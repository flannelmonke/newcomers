import React, { useState } from "react";

export default function TaskForm() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handlePhotoChange = (event) => {
    setSelectedPhoto(event.target.files[0]);
  };

  const handleVideoChange = (event) => {
    setSelectedVideo(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle request
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="file"
        accept="image/*"
        onChange={handlePhotoChange}
        className="file-input"
      />
      {selectedPhoto && (
        <img
          src={URL.createObjectURL(selectedPhoto)}
          alt="Preview"
          className="image-preview"
        />
      )}
      <input
        type="file"
        accept="video/*"
        onChange={handleVideoChange}
        className="file-input"
      />
      {selectedVideo && (
        <video
          src={URL.createObjectURL(selectedVideo)}
          controls
          className="video-preview"
        />
      )}
      <input type="checkbox" className="checkbox-input" />
      <button type="submit" className="submit-button">
        Upload
      </button>
    </form>
  );
}
