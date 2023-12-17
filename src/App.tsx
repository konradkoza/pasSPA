import { Clients } from "./components/pages/Clients"
import { Movies } from "./components/pages/Movies"
import { Rents } from "./components/pages/Rents"
import { AppLayout } from "./layouts/AppLayout"
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from "react-router-dom"


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route path="clients" element={<Clients />} />
      <Route path="movies" element={<Movies />} />
      <Route path="rents" element={<Rents />} />
    </Route>
  )
)

{/* <Route path="/" element={<AppLayout />}>
      <Route path="clients" element={<Clients />} />
      <Route path="movies" element={<Movies />} />
      <Route path="rents" element={<Rents />} />
    </Route> */}
function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
