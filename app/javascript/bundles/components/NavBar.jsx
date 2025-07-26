import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function NavBar() {
  const { currentUser } = useContext(CurrentUserContext);
  const location = useLocation();

  const isChats = location.pathname === "/" || location.pathname.startsWith("/chats/");
  const isContacts = location.pathname === "/contacts";
  const isProfile = location.pathname === `/profile/${currentUser.profile.connectToken}`;

  return(
    <nav>
      <p className={isChats ? "active-nav" : ""}><Link to="/">Chats</Link></p>
      <p className={isContacts ? "active-nav" : ""}><Link to="/contacts">Contacts</Link></p>
      <p className={isProfile ? "active-nav" : ""}><Link to={`/profile/${currentUser.profile.connectToken}`}>My Profile</Link></p>
    </nav>
  )
}

export default NavBar;