import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import useChat from "../customHooks/useChat";
import { CableContext } from "./contexts/cable";
import { useContext, useEffect, useRef, useState, useLayoutEffect } from "react";
import Trix from "trix";
import { ReactTrixRTEInput } from "react-trix-rte";
import useChatChannel from "../customHooks/useChatChannel";
import useSendMessage from "../customHooks/useSendMessage";
import * as styles from "./Chat.module.css";
import CurrentUserContext from "./contexts/CurrentUserContext";
import formatDate from "../helpers/formatDate";
import { useMediaQuery } from "react-responsive";
import ContactList from "./ContactList";
import SendIcon from "../../images/send_icon.svg"
import ContactsContext from "./contexts/ContactsContext";
import useTrixSendOnEnter from "../customHooks/useTrixSendOnEnter";

function Chat() {
  const params = useParams();
  const [messagesInChat, setMessagesInChat] = useState([]);
  const trixRef = useRef();
  const [newMessage, setNewMessage] = useState();

  const {currentUser} = useContext(CurrentUserContext);
  const { contacts, setContacts } = useContext(ContactsContext);

  const {error, isLoading } = useChat(params.chatId, setMessagesInChat)

  const isDesktop = useMediaQuery({ minWidth: 1024 });

  const lastMessageRef = useRef(null);
  const messageDisplay= useRef(null);
  const firstLoadForChat = useRef(true);

  useEffect(() => {
    if (!lastMessageRef.current || !messageDisplay.current) return;
  
    const container = messageDisplay.current;

    if (firstLoadForChat.current) {
      firstLoadForChat.current = false;
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
      return;
    }
  
    const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 200;
  
    if (isNearBottom) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messagesInChat]);

  useEffect(() => {
    firstLoadForChat.current = true;
  }, [params.chatId]);

  useChatChannel(params.chatId, setMessagesInChat, setContacts)
  useSendMessage(params.chatId, newMessage, setNewMessage, trixRef)

  function sendMessageHandler (event) {
    event.preventDefault();
    setNewMessage(trixRef.current.editor.element.innerHTML)
  }

  useTrixSendOnEnter(trixRef, sendMessageHandler);

  function stripHtmlComments(htmlString) {
    return htmlString.replace(/<!--[\s\S]*?-->/g, '');
  }

  const messages = messagesInChat.map((message, index) => {
    const isCurrentUser = message.author === currentUser.id;
    const messageClass = isCurrentUser ? styles.messageCurrentUser : styles.messageContact;

    const cleanedContent = stripHtmlComments(message.contentBody);

    const isLastMessage = index === messagesInChat.length - 1;

    // ActionText & Sanitization:
    // https://github.com/rails/actiontext/issues/13
    // https://github.com/rails/actiontext/issues/6
    return (<div key={message.id} className={`${styles.message} ${messageClass}`} ref={isLastMessage ? lastMessageRef : null}>
      <p dangerouslySetInnerHTML={{ __html: cleanedContent }} />
      <p className={styles.messageDate}>{ formatDate(message.creationDate) }</p>
    </div>)
  })

  const [listExpanded, setListExpanded] = useState(true);
  const isFirstLoadRef = useRef(true);
  useEffect(() => {
    if(!isDesktop) return;
    if(!isFirstLoadRef.current) return;

    isFirstLoadRef.current = false;
    const timer = setTimeout(() => setListExpanded(false), 250);
    return () => clearTimeout(timer);
  }, [isDesktop]);

  return (
    <main className={styles.mainChat}>
      <NavBar />

      <div className={styles.desktopScreen}>
        {isDesktop && (
          <div className={`${styles.listContainer} ${listExpanded ? styles.listContainerExpanded : ""}`}>
            <ContactList currentChatId={Number(params.chatId)}/>
          </div>
        )}
        
        <div className={`${styles.chatContainer} ${(isDesktop && listExpanded) ? styles.chatContainerNone : ""}`}>
          <div className={`${styles.messageDisplay} pattern-bg`} ref={messageDisplay}>
            { isLoading? "Chat is loading ..." : (error != null ? error.message : messages)}
          </div>
          <div className={styles.messageFormContainer}>
            <form action="" className={styles.messageForm}>
              <div className={styles.trixContainer}>
                <ReactTrixRTEInput isRailsDirectUpload={true} trixInputRef={trixRef}/>
              </div>
              <button type="submit" className={`${styles.sendButton} btn`} onClick={sendMessageHandler}>
                <img src={SendIcon} alt="Send" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
    
  )
}

export default Chat;

