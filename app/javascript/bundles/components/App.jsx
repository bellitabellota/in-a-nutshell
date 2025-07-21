
import routes from "../routes";
import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CurrentUserContext from "./contexts/CurrentUserContext";
import ContactsContext from "./contexts/ContactsContext";
import { CableProvider } from "./contexts/cable";
import horizontalLogo from "../../images/in-a-nutshell-logo-lettering-horizontal-cropped.png";
import logoutIcon from "../../images/logout-svgrepo-com.svg"

const router = createBrowserRouter(routes);


function App(reactProps) {
  const user = {id: reactProps.id, profile:{...reactProps.profile}}
  const [currentUser, setCurrentUser] = useState(user);
  const [contacts, setContacts] = useState(reactProps.contacts);
  return (
    <div className="app-container">
      <div className="pre-main-container">
        <img src={horizontalLogo} className="horizontal-logo"/>
        <button><img src={logoutIcon} className="logout-icon"/></button>
      </div>
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser}}>
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