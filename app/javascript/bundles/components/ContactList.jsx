import { Link } from "react-router-dom";
import * as styles from "./ContactList.module.css";
import { useContext } from "react";
import ContactsContext from "./contexts/ContactsContext";
import defaultProfilePicture from "../../images/default-profile-picture.jpg";
import formatContactListDate from "../helpers/formatContactListDate";

function ContactList({currentChatId}) {
  const {contacts} = useContext(ContactsContext);

  const sortedContacts = [...contacts].sort((a, b) => {
    const dateA = new Date(a.lastActivity || a.chatCreationDate);
    const dateB = new Date(b.lastActivity || b.chatCreationDate);
    // https://masteringjs.io/tutorials/fundamentals/sort-by-date
    return dateB - dateA; // sorts in descending order
  });

  return (
    <div className={styles.contactList}>
      {sortedContacts.length === 0 ? 
        <p>You have no contacts yet.</p> 
        :
        sortedContacts.map((contact) => (
          <Link to={`/chats/${contact.chatId}`} key={contact.id}>
            <div className={`${styles.contactContainer} ${currentChatId === contact.chatId ? styles.isOpen : ""}`}>
              <img src={contact.profile.picture || defaultProfilePicture} className={styles.profilePicture} alt="Profile" />
              <p className={styles.contactName}>{contact.profile.name}</p>
              <p className={styles.latestActivity}>{contact.lastActivity? formatContactListDate(contact.lastActivity): ""}</p>
            </div>
          </Link>
        ))
      }
    </div>
  );
}

export default ContactList;