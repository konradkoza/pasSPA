import LoginPage from "./components/auth/pages/login/LoginPage"
import RegisterPage from "./components/auth/pages/register/RegisterPage"
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from "react-router-dom"
import NotFound from "./components/pages/notFound/NotFound"
import RouteGuard from "./components/auth/pages/RouteGuard/RouteGuard"
import { AppLayout } from "./layouts/AppLayout"
import AuthenticatedClient from "./components/pages/client/AuthenticatedClient"
import AuthenticatedAdmin from "./components/pages/client/AuthenticatedAdmin"
import AuthenticatedModerator from "./components/pages/client/AuthenticatedModerator"
import Unauthorized from "./components/pages/unauthorized/Unauthorized"
import { Users } from "./components/pages/client/Users"
import { Movies } from "./components/pages/movie/Movies"
import { Rents } from "./components/pages/rent/Rents"


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route >
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<AppLayout />}>
        <Route element={<RouteGuard clientType="CLIENT" />}>
          <Route path="/client" >
            <Route index element={<AuthenticatedClient />} />
          </Route>
        </Route>
        <Route element={<RouteGuard clientType="ADMINISTRATOR" />}>
          <Route path="/administrator" >
            <Route index element={<AuthenticatedAdmin />} />
            <Route path="/administrator/users" element={<Users />} />
          </Route>
        </Route>
        <Route element={<RouteGuard clientType="MODERATOR" />}>
          <Route path="/moderator" >
            <Route index element={<AuthenticatedModerator />} />
            <Route path="/moderator/movies" element={<Movies />} />
            <Route path="/moderator/rents" element={<Rents />} />
          </Route>
        </Route>

      </Route>
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Route>

  )
)
function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
