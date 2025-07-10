import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "./contexts/CurrentUserContext";

function NavBar() {
  const currentUser = useContext(CurrentUserContext);
  return(
    <nav>
      <p><Link to="/">Chats</Link></p>
      <p><Link to="/contacts">Contacts</Link></p>
      <p><Link to={`/profile/${currentUser.profile.connectToken}`}>My Profile</Link></p>
    </nav>
  )
}

export default NavBar;