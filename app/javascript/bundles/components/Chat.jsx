import { useParams } from "react-router-dom";

function Chat() {
  const params = useParams();
  return (
    <>
    <h1>Chat component with id {params.chatId}</h1>
    
    </>
    
  )
}

export default Chat;