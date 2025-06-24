
import routes from "../routes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CurrentUserProfileContext from "./CurrentUserProfileContext";

const router = createBrowserRouter(routes);


function App({currentUserProfile}) {
  return (
    <CurrentUserProfileContext.Provider value={currentUserProfile}>
      <RouterProvider router={router} />
    </CurrentUserProfileContext.Provider>
  )
}

export default App;