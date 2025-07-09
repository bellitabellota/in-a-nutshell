import { Link } from "react-router-dom";
import * as styles from "./ContactList.module.css";
import { useContext } from "react";
import CurrentUserContext from "./contexts/CurrentUserContext";
import defaultProfilePicture from "../../images/default-profile-picture.jpg";

function ContactList() {
  const currentUser = useContext(CurrentUserContext);
  console.log(currentUser.contacts[0].chatId);
  return (
    <div className={styles.contactList}>
      {currentUser.contacts.map((contact) => (
        <Link to={`/chats/${contact.chatId}`} key={contact.id}>
          <div className={styles.contactContainer}>
            <img src={defaultProfilePicture} className={styles.profilePicture} alt="Profile" />
            <p className={styles.contactName}>{contact.profile.name}</p>
            <p>19. May, 16:05</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ContactList;