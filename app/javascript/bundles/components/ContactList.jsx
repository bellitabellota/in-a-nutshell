import { Link } from "react-router-dom";
import * as styles from "./ContactList.module.css";
import { useContext } from "react";
import ContactsContext from "./contexts/ContactsContext";
import defaultProfilePicture from "../../images/default-profile-picture.jpg";
import formatContactListDate from "../helpers/formatContactListDate";

function ContactList() {
  const {contacts} = useContext(ContactsContext);
  return (
    <div className={styles.contactList}>
      {contacts.map((contact) => (
        <Link to={`/chats/${contact.chatId}`} key={contact.id}>
          <div className={styles.contactContainer}>
            <img src={defaultProfilePicture} className={styles.profilePicture} alt="Profile" />
            <p className={styles.contactName}>{contact.profile.name}</p>
            <p>{formatContactListDate(contact.lastActivity)}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ContactList;