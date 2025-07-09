import { useEffect, useState } from "react";

const useChat = (paramsChatId, setMessagesInChat) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const url = `/api/v1/chats/${paramsChatId}`;

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
  }, [paramsChatId])

  return { error, isLoading }
}

export default useChat;