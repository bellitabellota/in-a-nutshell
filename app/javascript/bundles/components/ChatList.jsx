import NavBar from "./NavBar";
import { useContext } from "react";
import CurrentUserContext from "./contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import * as styles from "./ChatList.module.css";
import defaultProfilePicture from "../../images/default-profile-picture.jpg"

function ChatList() {
  const currentUser = useContext(CurrentUserContext);

  const contacts = currentUser.contacts.map((contact) => {
    return <Link to={`/chats/${contact.chatId}`} key={contact.id}>
        <div className={styles.contactContainer}>
          <img src={defaultProfilePicture} className={styles.profilePicture}/>
          <p className={styles.contactName}>{contact.profile.name}</p>
          <p>19. May, 16:05</p>
        </div>
      </Link> 
  })

  return(
  <main>
    <NavBar />
    <div className={styles.contactList}>
    {contacts}
    </div>
    
  </main>
    
  )
}

export default ChatList;