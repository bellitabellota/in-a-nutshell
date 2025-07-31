import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import NavBar from "./NavBar";
import ContactList from "./ContactList";

import Trix from "trix";
import { ReactTrixRTEInput } from "react-trix-rte";

import useChatChannel from "../customHooks/useChatChannel";
import useSendMessage from "../customHooks/useSendMessage";
import useTrixSendOnEnter from "../customHooks/useTrixSendOnEnter";
import useChat from "../customHooks/useChat";
import useTriggerScrollOnChatSwitch from "../customHooks/useTriggerScrollOnChatSwitch"
import useScrollOnNewMessage from "../customHooks/useScrollOnNewMessage";
import useAutoCollapseContactList from "../customHooks/useAutoCollapseContactList";

import ContactsContext from "../../contexts/ContactsContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import * as styles from "./Chat.module.css";
import SendIcon from "../../images/send_icon.svg";

import formatDate from "../helpers/formatDate";

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
  const messageDisplayRef= useRef(null);

  const firstLoadForChatRef = useRef(true);
  useTriggerScrollOnChatSwitch(firstLoadForChatRef, params.chatId)
  useScrollOnNewMessage(messagesInChat, lastMessageRef, messageDisplayRef, firstLoadForChatRef)

  useChatChannel(params.chatId, setMessagesInChat, setContacts)
  useSendMessage(params.chatId, newMessage, setNewMessage, trixRef)


  function sendMessageHandler (event) {
    event.preventDefault();
    setNewMessage(trixRef.current.editor.element.innerHTML)
  }

  useTrixSendOnEnter(trixRef, sendMessageHandler);

  const messages = messagesInChat.map((message, index) => {
    const isCurrentUser = message.author === currentUser.id;
    const messageClass = isCurrentUser ? styles.messageCurrentUser : styles.messageContact;

    const isLastMessage = index === messagesInChat.length - 1;

    // ActionText & Sanitization:
    // https://github.com/rails/actiontext/issues/13
    // https://github.com/rails/actiontext/issues/6
    return (<div key={message.id} className={`${styles.message} ${messageClass}`} ref={isLastMessage ? lastMessageRef : null}>
      <p dangerouslySetInnerHTML={{ __html: message.contentBody }} />
      <p className={styles.messageDate}>{ formatDate(message.creationDate) }</p>
    </div>)
  })

  const { listExpanded } = useAutoCollapseContactList(isDesktop);

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
          <div className={`${styles.messageDisplay} pattern-bg`} ref={messageDisplayRef}>
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

