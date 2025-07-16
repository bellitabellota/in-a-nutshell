import { useState, useContext  } from "react";
import CurrentUserContext from "./contexts/CurrentUserContext";

const ProfileEditForm = ({profile, setEditingMode}) => {
  const {currentUser, setCurrentUser} = useContext(CurrentUserContext);
  const [nameInput, setNameInput] = useState(profile.name);
  const [infoText, setInfoText] = useState(profile.info);
  const [selectedFile, setSelectedFile] = useState(null);

  const updateHandler = () => {
    const url = `/api/v1/profiles/${profile.id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content
    const formData = new FormData();

    formData.append("profile[name]", nameInput);
    formData.append("profile[info]", infoText);

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
          picture: profileData.pictureURL
        }
      };

      setCurrentUser(updatedCurrentUser)
      setEditingMode(false);
    })
    .catch((error) => {
      console.log(error.message);
    });
  };

  return(
    <div>
      <input type="file" onChange={event=>{setSelectedFile(event.target.files[0])}}/>
      <input type="text" value={nameInput} onChange={(event) => {setNameInput(event.target.value)}}/>
      <p>Connect Token: {profile.connectToken} </p>
      <textarea value={infoText ? infoText : ""} placeholder={"Tell something about yourself..."} onChange={(event) => {setInfoText(event.target.value)}}></textarea>
      <button onClick={updateHandler}>Update</button>
    </div>
  )
}

export default ProfileEditForm;