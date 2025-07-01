import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import useChat from "../customHooks/useChat";
import { CableContext } from "./contexts/cable";
import { useContext, useEffect, useRef, useState } from "react";

function Chat() {
  const params = useParams();
  const [messagesInChat, setMessagesInChat] = useState([]);
  const { error, isLoading } = useChat(params.chatId, setMessagesInChat)

  const inputField = useRef();
  const [newMessage, setNewMessage] = useState();

  const cableContext = useContext(CableContext);

  useEffect(()=> {
    const newChannel = cableContext.consumer.subscriptions.create( {channel: "ChatChannel", chat_id: params.chatId}, {
      connected() {

      },
      disconnected() {

      },
      received(data) {
        //Called when there's incoming data on the websocket for this channel

        setMessagesInChat((prevMessagesInChat) => [...prevMessagesInChat, { id: data.id,
          author: data.author_id,
          creationDate: data.created_at,
          contentBody: data.content.body
        }])
      }
    });

    return () => {
      // https://medium.com/@stacileep2/rails-action-cable-with-react-basic-chatroom-set-up-56f08a8e47aa
      newChannel.unsubscribe();
      console.log("unsubscribed");
    };
    
  }, [])

  useEffect(()=> {
    if (!newMessage) return
    const url = `/api/v1/chats/${params.chatId}/messages`
    const token = document.querySelector('meta[name="csrf-token').content
    const body = {content: newMessage}

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": token
      }, 
      body: JSON.stringify(body)
    })
    setNewMessage(null);
  }, [newMessage])

  function sendMessageHandler (event) {
    event.preventDefault();
    setNewMessage(inputField.current.value)
  }

  const messages = messagesInChat.map((message) => {
    return (<div key={message.id}>
      <p>{ message.contentBody }</p>
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
          <input id="message-input" type="text" ref={inputField}/>
          <input type="submit" value="Send Message" onClick={sendMessageHandler} />
        </form>
      </div>
    </div>
    <NavBar />
    </>
    
  )
}

export default Chat;