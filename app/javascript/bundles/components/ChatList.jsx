import NavBar from "./NavBar";
import ContactList from "./ContactList";
import * as styles from "./ChatList.module.css"

function ChatList() {
  return(
  <main className={styles.contactListContent}>
    <NavBar />
    <ContactList />    
  </main>
  )
}

export default ChatList;