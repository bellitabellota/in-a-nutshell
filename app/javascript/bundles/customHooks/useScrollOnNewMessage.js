import { useEffect, useRef } from "react";

const useScrollOnNewMessage = (messagesInChat, lastMessageRef, messageDisplayRef, firstLoadForChatRef) => {


  useEffect(() => {
    if (!lastMessageRef.current || !messageDisplayRef.current) return;
  
    const container = messageDisplayRef.current;

    if (firstLoadForChatRef.current) {
      firstLoadForChatRef.current = false;
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
      return;
    }
  
    const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 200;
  
    if (isNearBottom) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messagesInChat]);
}

export default useScrollOnNewMessage;