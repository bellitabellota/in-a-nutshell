import defaultProfilePicture from "../../images/default-profile-picture.jpg";

function ProfileCard ({profile, setEditingMode}) {
  const imageSrc = profile.picture || defaultProfilePicture;

  return(
    <div>
    <img src={imageSrc} />
    <p>Name: {profile.name}</p>
    <p>Connect Token: {profile.connectToken}</p>
    <p>Info: {profile.info}</p>
    <button onClick={() => setEditingMode(true)}>Edit</button>
  </div>
  )
}

export default ProfileCard;