import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import useChat from "../customHooks/useChat";

function Chat() {
  const params = useParams();
  const { messagesInChat, error, isLoading } = useChat(params.chatId)
  

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