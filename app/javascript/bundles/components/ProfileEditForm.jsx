import { useState,  } from "react";

const ProfileEditForm = ({profile}) => {
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