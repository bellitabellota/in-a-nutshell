import { createContext } from "react";
import ActionCable from "actioncable";

const CableContext = createContext();

function CableProvider({ children }) {
  const actionCableUrl = 'ws://localhost:3000/cable';

  const CableApp = {
    cable: ActionCable.createConsumer(actionCableUrl)
  };
  

  return <CableContext.Provider value={CableApp}>{children}</CableContext.Provider>;
}

export { CableContext, CableProvider };