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
  
    let timeoutId;
    if (isNearBottom) {
      timeoutId = setTimeout(()=> {
        lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
      }, 50)
    }

    return () => clearTimeout(timeoutId);
  }, [messagesInChat]);
}

export default useScrollOnNewMessage;