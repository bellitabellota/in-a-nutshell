import NavBar from "./NavBar";
import { useContext } from "react";
import CurrentUserContext from "../CurrentUserContext";

function ChatList() {
  const currentUser = useContext(CurrentUserContext);

  const contacts = currentUser.contacts.map((contact) => {
    return <div className="contact-container" key={contact.id}>{contact.profile.name}</div>
  })

  return(
  <>
    <h1>Chats component</h1>
    {contacts}
    <NavBar />
  </>
    
  )
}

export default ChatList;