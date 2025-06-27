
import routes from "../routes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CurrentUserContext from "../CurrentUserContext";

const router = createBrowserRouter(routes);


function App(currentUser) {
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <RouterProvider router={router} />
    </CurrentUserContext.Provider>
  )
}

export default App;