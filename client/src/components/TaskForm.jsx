import React, { useState } from "react";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

export default function TaskForm({ taskId, userId }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // useEffect(() => {

  // })

  // console.log(selectedVideo);
  // console.log(selectedPhoto);

  const handlePhotoChange = (event) => {
    console.log("triggered", event.target.files[0]);
    setSelectedPhoto(event.target.files[0]);
  };

  const handleVideoChange = (event) => {
    setSelectedVideo(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const storage = getStorage();
    // console.log("video:", selectedVideo);
    const storageRef = ref(storage, `videos/${selectedVideo.name}`);

    const metadata = {
      contentType: "video/*",
    };

    const uploadImgTask = uploadBytesResumable(
      storageRef,
      selectedVideo,
      metadata
    );

    uploadImgTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(progress);
      },
      (err) => {},
      () => {
        getDownloadURL(uploadImgTask.snapshot.ref).then(async (downloadUrl) => {
          console.log("download url of saved img: ", downloadUrl);
          try {
            const response = await axios.patch(
              "http://localhost:8000/api/users/update-completed-tasks",
              {}
            );
          } catch (error) {
            console.log(error);
          }
        });
      }
    );
    setSelectedVideo(null);
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
