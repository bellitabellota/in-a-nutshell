import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import useChat from "../customHooks/useChat";
import { CableContext } from "./contexts/cable";
import { useContext, useEffect } from "react";

function Chat() {
  const params = useParams();
  const { messagesInChat, error, isLoading } = useChat(params.chatId)


  const cableContext = useContext(CableContext);

  useEffect(()=> {
    

    const newChannel = cableContext.consumer.subscriptions.create( {channel: "ChatChannel", chat_id: params.chatId}, {
      connected() {

      },
      disconnected() {

      },
      received(data) {
        //Called when there's incoming data on the websocket for this channel
        //A typical use for this callback would be to update state in some fashion to render real-time information in the browser.
        console.log("Data received in the received callback of the frontend subscription")
        console.log(data)
      }
    });
  }, [])
  

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
          <input id="message-input" type="text" />
          <input type="submit" value="Send Message" />
        </form>
      </div>
    </div>
    <NavBar />
    </>
    
  )
}

export default Chat;