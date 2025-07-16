import NavBar from "./NavBar";
import { useContext, useState } from "react";
import CurrentUserContext from "./contexts/CurrentUserContext";
import ProfileCard from "./ProfileCard";
import ProfileEditForm from "./ProfileEditForm";

function Profile() {
  const {currentUser} = useContext(CurrentUserContext);
  console.log(currentUser);
  const [editingMode, setEditingMode] = useState(false);
  
  return(
    <main>
      <NavBar />
      { editingMode ? <ProfileEditForm profile={currentUser.profile} /> : <ProfileCard profile={currentUser.profile} setEditingMode={setEditingMode}/> }
    </main>  
  )
}

export default Profile;
