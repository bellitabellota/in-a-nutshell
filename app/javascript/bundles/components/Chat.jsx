import { useParams } from "react-router-dom";
import NavBar from "./NavBar";

function Chat() {
  const params = useParams();
  return (
    <>
    <h1>Chat component with id {params.chatId}</h1>
    <NavBar />
    </>
    
  )
}

export default Chat;