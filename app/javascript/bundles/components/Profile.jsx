import NavBar from "./NavBar";
import { useContext, useState } from "react";
import CurrentUserContext from "./contexts/CurrentUserContext";
import ProfileCard from "./ProfileCard";

function Profile() {
  const currentUser = useContext(CurrentUserContext);
  console.log(currentUser);
  const [editingMode, setEditingMode] = useState(false);
  
  return(
    <main>
      <NavBar />
      <ProfileCard profile={currentUser.profile} setEditingMode={setEditingMode}/>
    </main>  
  )
}

export default Profile;
