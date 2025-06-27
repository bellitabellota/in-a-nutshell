
import Chat from "./components/Chat";
import ChatList from "./components/ChatList";
import Contacts from "./components/Contacts";
import Profile from "./components/Profile";

const routes = [{
  path: "/",
  element: <ChatList />
}, {
  path: "/chats/:chatId",
  element: <Chat />
},
{
  path: "/contacts",
  element: <Contacts/>
}, {
  path: "/profile/:profileToken",
  element: <Profile />
}]

export default routes;