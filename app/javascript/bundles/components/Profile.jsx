import NavBar from "./NavBar";
import { useContext, useState } from "react";
import CurrentUserContext from "./contexts/CurrentUserContext";
import ProfileCard from "./ProfileCard";
import ProfileEditForm from "./ProfileEditForm";
import * as styles from "./Profile.module.css"
import ContactsContext from "./contexts/ContactsContext";

function Profile() {
  const {currentUser, setCurrentUser} = useContext(CurrentUserContext);
  const {setContacts} = useContext(ContactsContext)
  const [editingMode, setEditingMode] = useState(false);

  const deleteAccountHandler = () => {
    if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      return;
    }

    const url = "/api/v1/users/destroy"
    const token = document.querySelector('meta[name="csrf-token"]').content

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token
      }
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete account.");
      }
      return response.json();
    })
    .then((data) => {
      alert(data.message);
      setCurrentUser({id: undefined, profile:{connectToken: ""}});
      setContacts([]);
      window.location.href = "/users/sign_in";
    })
    .catch((error) => {
      alert(error.message);
    });
  }
  
  return(
    <main className={styles.mainProfile}>
      <NavBar />
      <div className={styles.contentProfile}>
        { editingMode ? <ProfileEditForm profile={currentUser.profile} setEditingMode={setEditingMode} /> 
                      : <ProfileCard profile={currentUser.profile} renderActions={() => (
                          <>
                            <button onClick={deleteAccountHandler}>Delete Account</button>
                            <button onClick={() => setEditingMode(true)}>Edit</button>
                          </>)}
                        /> }
      </div>
    </main>  
  )
}

export default Profile;
