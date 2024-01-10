import AllocationList from "./components/pages/client/AllocationList"
import { Users } from "./components/pages/client/Users"
import { Movies } from "./components/pages/movie/Movies"
import { Rents } from "./components/pages/rent/Rents"
import { AppLayout } from "./layouts/AppLayout"
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from "react-router-dom"


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route path="clients" >
        <Route index element={<Users />} />
        <Route path=":id" element={<AllocationList />} />
      </Route>
      <Route path="movies" element={<Movies />} />
      <Route path="rents" element={<Rents />} />
    </Route>
  )
)
function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
