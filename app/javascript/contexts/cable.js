import { createContext } from "react";
import ActionCable from "actioncable";

const CableContext = createContext();

function CableProvider({ children }) {
  const actionCableUrl = process.env.NODE_ENV === 'production' ? 'wss://back-turtle-in-a-nutshell-4f2b4783.koyeb.app/cable' : 'ws://localhost:3000/cable'

  const CableApp = {
    consumer: ActionCable.createConsumer(actionCableUrl)
  };
  

  return <CableContext.Provider value={CableApp}>{children}</CableContext.Provider>;
}

export { CableContext, CableProvider };