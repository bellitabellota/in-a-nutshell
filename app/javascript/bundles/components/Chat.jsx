import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import useChat from "../customHooks/useChat";
import { CableContext } from "./contexts/cable";
import { useContext, useEffect, useRef, useState } from "react";
import Trix from "trix";
import { ReactTrixRTEInput } from "react-trix-rte";
import useChatChannel from "../customHooks/useChatChannel";
import useSendMessage from "../customHooks/useSendMessage";
import * as styles from "./Chat.module.css";
import CurrentUserContext from "./contexts/CurrentUserContext";
import formatDate from "../helpers/formatDate";
import { useMediaQuery } from "react-responsive";
import ContactList from "./ContactList";

function Chat() {
  const params = useParams();
  const [messagesInChat, setMessagesInChat] = useState([]);
  const trixRef = useRef();
  const [newMessage, setNewMessage] = useState();

  const {error, isLoading } = useChat(params.chatId, setMessagesInChat)

  const isDesktop = useMediaQuery({ minWidth: 1024 });

  useChatChannel(params.chatId, setMessagesInChat)
  useSendMessage(params.chatId, newMessage, setNewMessage, trixRef)

  function sendMessageHandler (event) {
    event.preventDefault();
    setNewMessage(trixRef.current.editor.element.innerHTML)
  }

  const currentUser = useContext(CurrentUserContext);

  const messages = messagesInChat.map((message) => {
    const isCurrentUser = message.author == currentUser.id;
    const messageClass = isCurrentUser ? styles.messageCurrentUser : styles.messageContact;

    // ActionText & Sanitization:
    // https://github.com/rails/actiontext/issues/13
    // https://github.com/rails/actiontext/issues/6
    return (<div key={message.id} className={`${styles.message} ${messageClass}`}>
      <div dangerouslySetInnerHTML={{ __html: message.contentBody }} />
      <p className={styles.messageDate}>{ formatDate(message.creationDate) }</p>
    </div>)
  })

  const [listExpanded, setListExpanded] = useState(true);

  useEffect(() => {
    if (isDesktop) {
      const timer = setTimeout(() => setListExpanded(false), 250);
      return () => clearTimeout(timer);
    }
  }, [isDesktop]);

  return (
    <main className={styles.mainChat}>
      <NavBar />

      <div className={styles.desktopScreen}>
        {isDesktop && (
          <div className={`${styles.listContainer} ${listExpanded ? styles.listContainerExpanded : ""}`}>
            <ContactList />
          </div>
        )}
        
        <div className={`${styles.chatContainer} ${(isDesktop && listExpanded) ? styles.chatContainerNone : ""}`}>
          <div className={styles.messageDisplay}>
            { isLoading? "Chat is loading ..." : (error != null ? error.message : messages)}
          </div>
          <div className={styles.messageFormContainer}>
            <form action="" id="message-form">
              <ReactTrixRTEInput isRailsDirectUpload={true} trixInputRef={trixRef}/>
              <input type="submit" value="Send Message" onClick={sendMessageHandler} />
            </form>
          </div>
        </div>
      </div>
    </main>
    
  )
}

export default Chat;

