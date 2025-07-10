import { useEffect } from "react";

function useTrixSendOnEnter(trixRef, sendMessageHandler) {
  useEffect(() => {
    if (!trixRef.current) return;
    const trixEditorElement = trixRef.current.editor.element;

    const handleKeyDown = (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendMessageHandler(event);
      }
    };

    trixEditorElement.addEventListener("keydown", handleKeyDown);

    return () => {
      trixEditorElement.removeEventListener("keydown", handleKeyDown);
    };
  }, [trixRef, sendMessageHandler]);
}

export default useTrixSendOnEnter;