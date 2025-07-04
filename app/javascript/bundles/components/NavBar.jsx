import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "./contexts/CurrentUserContext";

function NavBar() {
  const currentUser = useContext(CurrentUserContext);
  return(
    <div>
      <Link to="/">Chats</Link>
      <Link to="/contacts">Contacts</Link>
      <Link to={`/profile/${currentUser.profile.connectToken}`}>My Profile</Link>
    </div>
  )
}

export default NavBar;