import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserProfileContext from "../CurrentUserProfileContext";

function NavBar() {
  const currentUserProfile = useContext(CurrentUserProfileContext);
  return(
    <div>
      <Link to="/">Chats</Link>
      <Link to="/contacts">Contacts</Link>
      <Link to={`/profile/${currentUserProfile.connectToken}`}>My Profile</Link>
    </div>
  )
}

export default NavBar;