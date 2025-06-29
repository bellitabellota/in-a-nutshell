
import routes from "../routes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CurrentUserContext from "../CurrentUserContext";
import { CableProvider } from "./contexts/cable";

const router = createBrowserRouter(routes);


function App(currentUser) {
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CableProvider>
        <RouterProvider router={router} />
      </CableProvider>
    </CurrentUserContext.Provider>
  )
}

export default App;