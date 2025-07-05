import { useEffect} from "react";

const useSendMessage = (paramsChatId, newMessage, setNewMessage, trixRef) => {
  useEffect(()=> {
    if (!newMessage) return
    const url = `/api/v1/chats/${paramsChatId}/messages`
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
    trixRef.current.editor.element.innerHTML = "";

  }, [newMessage])
}

export default useSendMessage;