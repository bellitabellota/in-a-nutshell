import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import useChat from "../customHooks/useChat";
import { CableContext } from "./contexts/cable";
import { useContext, useEffect, useRef, useState } from "react";
import Trix from "trix";
import { ReactTrixRTEInput } from "react-trix-rte";
import useChatChannel from "../customHooks/useChatChannel";
import useSendMessage from "../customHooks/useSendMessage";

function Chat() {
  const params = useParams();
  const [messagesInChat, setMessagesInChat] = useState([]);
  const trixRef = useRef();
  const [newMessage, setNewMessage] = useState();

  const { error, isLoading } = useChat(params.chatId, setMessagesInChat)

  useChatChannel(params.chatId, setMessagesInChat)
  useSendMessage(params.chatId, newMessage, setNewMessage, trixRef)

  function sendMessageHandler (event) {
    event.preventDefault();
    setNewMessage(trixRef.current.editor.element.innerHTML)
  }

  const messages = messagesInChat.map((message) => {
    // ActionText & Sanitization:
    // https://github.com/rails/actiontext/issues/13
    // https://github.com/rails/actiontext/issues/6
    return (<div key={message.id}>
      <div dangerouslySetInnerHTML={{ __html: message.contentBody }} />
      <p>{ message.creationDate }</p>
    </div>)
  })

  if(isLoading) return <p>Chat is loading ...</p>
  if(error) return <p>{error.message}</p>;

  return (
    <>
    <h1>Chat component with id {params.chatId}</h1>
    <div>
      <div id="message-display">
        {messages}
      </div>

      <div id="message-form">
        <form action="" id="message-form">
          <ReactTrixRTEInput isRailsDirectUpload={true} trixInputRef={trixRef}/>
          <input type="submit" value="Send Message" onClick={sendMessageHandler} />
        </form>
      </div>

      
    </div>
    <NavBar />
    </>
    
  )
}

export default Chat;