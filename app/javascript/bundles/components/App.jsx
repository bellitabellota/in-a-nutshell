
import routes from "../routes";
import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CurrentUserContext from "./contexts/CurrentUserContext";
import ContactsContext from "./contexts/ContactsContext";
import { CableProvider } from "./contexts/cable";
import horizontalLogo from "../../images/in-a-nutshell-logo-lettering-horizontal-cropped.png";

const router = createBrowserRouter(routes);


function App(currentUser) {
  const [contacts, setContacts] = useState(currentUser.contacts);
  return (
    <div className="app-container">
      <img src={horizontalLogo} className="horizontal-logo"/>
      <CurrentUserContext.Provider value={{ id: currentUser.id, profile: currentUser.profile }}>
        <ContactsContext.Provider value={{ contacts, setContacts }}>
          <CableProvider>
            <RouterProvider router={router} />
          </CableProvider>
        </ContactsContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  )
}

export default App;