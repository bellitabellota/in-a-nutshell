import NavBar from "./NavBar";
import { useContext } from "react";
import CurrentUserContext from "../CurrentUserContext";
import { Link } from "react-router-dom";

function ChatList() {
  const currentUser = useContext(CurrentUserContext);

  const contacts = currentUser.contacts.map((contact) => {
    return <Link to={`/chats/${contact.chatId}`} key={contact.id}><div className="contact-container" >{contact.profile.name}</div></Link>
    
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