import defaultProfilePicture from "../../images/default-profile-picture.jpg";
import * as styles from "./ProfileCard.module.css"
import CurrentUserContext from "./contexts/CurrentUserContext";
import ContactsContext from "./contexts/ContactsContext";
import { useContext } from "react";

function ProfileCard ({profile, setEditingMode}) {
  const {setCurrentUser} = useContext(CurrentUserContext)
  const {setContacts} = useContext(ContactsContext)

  const imageSrc = profile.picture || defaultProfilePicture;

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
    <div className={styles.profileCard}>
      <div className={styles.profilePictureContainer}>
        <img src={imageSrc} className={styles.profilePicture}/>
      </div>

      <div className={styles.profileCardTextContainer}>
        <div className={styles.profileInfo}>
          <p><span className={styles.label}>Name:</span> {profile.name}</p>
          <p><span className={styles.label}>Connect Token:</span> {profile.connectToken}</p>
          <p className={styles.info}><span className={styles.label}>Info:</span> {profile.info || "--"}</p>
        </div>
        <div className={styles.profileCardActions}>
          <button onClick={deleteAccountHandler}>Delete Account</button>
          <button onClick={() => setEditingMode(true)}>Edit</button>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard;