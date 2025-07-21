import defaultProfilePicture from "../../images/default-profile-picture.jpg";
import * as styles from "./ProfileCard.module.css"
import CurrentUserContext from "./contexts/CurrentUserContext";
import ContactsContext from "./contexts/ContactsContext";
import { useContext } from "react";

function ProfileCard ({profile, renderActions}) {
  const imageSrc = profile.picture || defaultProfilePicture;

  return(
    <div className={styles.profileCard}>
      <div className={styles.profilePictureContainer}>
        <img src={imageSrc} className={styles.profilePicture}/>
      </div>

      <div className={styles.profileCardTextContainer}>
        <div className={styles.profileInfo}>
          <p><span className={styles.label}>Name:</span> {profile.name}</p>
          <p><span className={styles.label}>Connect Token:</span> {profile.connectToken}</p>
          <p className={styles.info}><span className={styles.label}>Info:</span> {profile.info ? profile.info : "--"}</p>
        </div>
        <div className={styles.profileCardActions}>
          {renderActions && renderActions()}
        </div>
      </div>
    </div>
  )
}

export default ProfileCard;