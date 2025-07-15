import { useState } from "react";

const ProfileEditForm = ({profile}) => {
  const [nameInput, setNameInput] = useState(profile.name);
  const [infoText, setInfoText] = useState(profile.info);
  const [selectedFile, setSelectedFile] = useState(null);

  return(
    <div>
      <input type="file" onChange={event=>{setSelectedFile(event.target.files[0])}}/>
      <input type="text" value={nameInput} onChange={(event) => {setNameInput(event.target.value)}}/>
      <p>Connect Token: {profile.connectToken} </p>
      <textarea value={infoText ? infoText : ""} placeholder={"Tell something about yourself..."} onChange={(event) => {setInfoText(event.target.value)}}></textarea>
      <button>Update</button>
    </div>
  )
}

export default ProfileEditForm;