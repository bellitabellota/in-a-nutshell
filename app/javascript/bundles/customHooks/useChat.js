import {useState, useEffect} from "react";

const useChat = (paramsChatId) => {
  const [messagesInChat, setMessagesInChat] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const url = `/chats/${paramsChatId}`;

    fetch(url)
    .then((response) =>{
      if(!response.ok) {
        throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
      }
      return response.json();
    }).then((data) => {
      setMessagesInChat(data);
    })
    .catch((error) => setError(error))
    .finally(() => {
      setIsLoading(false);
    })
  }, [])

  return { messagesInChat, error, isLoading }
}

export default useChat;