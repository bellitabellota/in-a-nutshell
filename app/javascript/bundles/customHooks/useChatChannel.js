import { useEffect, useContext } from "react";
import { CableContext } from "../components/contexts/cable";

const useChatChannel = (paramsChatId, setMessagesInChat) => {

  const cableContext = useContext(CableContext);

  useEffect(()=> {
    const newChannel = cableContext.consumer.subscriptions.create( {channel: "ChatChannel", chat_id: paramsChatId}, {
      connected() {
        console.log("connected")
      },
      disconnected() {
        console.log("disconnected")
      },
      received(data) {
        //Called when there's incoming data on the websocket for this channel

        setMessagesInChat((prevMessagesInChat) => [...prevMessagesInChat, data])
      }
    });

    return () => {
      // https://medium.com/@stacileep2/rails-action-cable-with-react-basic-chatroom-set-up-56f08a8e47aa
      newChannel.unsubscribe();
      console.log("unsubscribed");
    };
  }, [paramsChatId])
}

export default useChatChannel;