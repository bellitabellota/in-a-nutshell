import defaultProfilePicture from "../../images/default-profile-picture.jpg";
import * as styles from "./ProfileCard.module.css"

function ProfileCard ({profile, setEditingMode}) {
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
          <p className={styles.info}><span className={styles.label}>Info:</span> {profile.info || "--"}</p>
        </div>
        <div className={styles.profileCardActions}>
          <button onClick={() => setEditingMode(true)}>Edit</button>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard;