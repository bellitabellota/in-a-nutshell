import { useEffect } from "react";

const useTriggerScrollOnChatSwitch = (firstLoadForChatRef, chatId) => {
  useEffect(() => {
    firstLoadForChatRef.current = true;
  }, [chatId]);
}

export default useTriggerScrollOnChatSwitch;