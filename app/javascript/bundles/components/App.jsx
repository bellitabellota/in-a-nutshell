
import routes from "../routes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CurrentUserContext from "./contexts/CurrentUserContext";
import { CableProvider } from "./contexts/cable";
import horizontalLogo from "../../images/in-a-nutshell-logo-lettering-horizontal-cropped.png";

const router = createBrowserRouter(routes);


function App(currentUser) {
  return (
    <div className="app-container">
      <img src={horizontalLogo} className="horizontal-logo"/>
      <CurrentUserContext.Provider value={currentUser}>
        <CableProvider>
          <RouterProvider router={router} />
        </CableProvider>
      </CurrentUserContext.Provider>
    </div>
  )
}

export default App;