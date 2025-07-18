import NavBar from "./NavBar";
import { useContext, useState } from "react";
import CurrentUserContext from "./contexts/CurrentUserContext";
import ProfileCard from "./ProfileCard";
import ProfileEditForm from "./ProfileEditForm";
import * as styles from "./Profile.module.css"

function Profile() {
  const {currentUser} = useContext(CurrentUserContext);
  const [editingMode, setEditingMode] = useState(false);
  
  return(
    <main className={styles.mainProfile}>
      <NavBar />
      <div className={styles.contentProfile}>
        { editingMode ? <ProfileEditForm profile={currentUser.profile} setEditingMode={setEditingMode} /> : <ProfileCard profile={currentUser.profile} setEditingMode={setEditingMode}/> }
      </div>
    </main>  
  )
}

export default Profile;
