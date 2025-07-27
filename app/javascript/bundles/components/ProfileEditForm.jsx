import { useState, useContext  } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import * as styles from "./ProfileEditForm.module.css"
import defaultProfilePicture from "../../images/default-profile-picture.jpg";

const ProfileEditForm = ({profile, setEditingMode}) => {
  const {currentUser, setCurrentUser} = useContext(CurrentUserContext);
  const [nameInput, setNameInput] = useState(profile.name);
  const [infoText, setInfoText] = useState(profile.info);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

  const updateHandler = () => {
    if (!nameInput.trim()) {
      alert("A name must be entered.");
      return;
    }

    const url = `/api/v1/profiles/${profile.id}`;
    const token = document.querySelector('meta[name="csrf-token"]')?.content || "test-csrf-token";
    const formData = new FormData();

    formData.append("profile[name]", nameInput);
    formData.append("profile[info]", (!infoText || infoText.trim() === "") ? "" : infoText);

    if(selectedFile) {
      formData.append("profile[picture]", selectedFile, selectedFile.name);
    }

    fetch(url, {
      method: 'PATCH',
      headers: {
        "X-CSRF-Token": token
      }, 
      body: formData
    })
    .then((response) =>{
      if (!response.ok) {
        return response.json().then((errorData) => {
          throw new Error(`${errorData.error} (HTTP status: ${response.status})` || `HTTP Error ${response.status}: ${response.statusText}`);
        });
      }
      return response.json();
    })
    .then(profileData => {
      const updatedCurrentUser = {
        id: currentUser.id,
        profile: {
          id: profileData.id,
          name: profileData.name,
          info: profileData.info,
          connectToken: profileData.connectToken,
          picture: profileData.picture
        }
      };

      setCurrentUser(updatedCurrentUser)
      setEditingMode(false);
    })
    .catch((error) => {
      alert(error)
    });
  };

  const choosingImageHandler = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  }

  return(
    <div className={styles.profileEditFormCard}>
      <div className={styles.profilePictureContainer}>
        <img src={previewURL || profile.picture || defaultProfilePicture} className={styles.profilePicture}/>
        <label htmlFor="image_uploads">Choose Image</label>
        <input type="file" onChange={choosingImageHandler} id="image_uploads" />
      </div>

      <div className={styles.profileCardTextInfoContainer}>
        <div className={styles.profileCardTextFieldsContainer}>
          <div className={styles.fieldGroup}>
            <label htmlFor="name" className={styles.label} >Name:</label>
            <input type="text" id="name" value={nameInput} onChange={(event) => {setNameInput(event.target.value)}}/>
          </div>
          <div className={styles.fieldGroup}>
            <span className={styles.label}>Connect Token:</span>
            <p> {profile.connectToken}</p>
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="info" className={styles.label}>Info:</label>
            <textarea value={infoText ? infoText : ""} id= "info" placeholder={"Tell something about yourself..."} onChange={(event) => {setInfoText(event.target.value)}}></textarea>
          </div>
          
        </div>
        <div className={styles.profileCardActions}>
          <button onClick={() => setEditingMode(false)} className="btn">Back</button>
          <button onClick={updateHandler} className="btn">Update</button>
        </div>
      </div>
    </div>
  )
}

export default ProfileEditForm;