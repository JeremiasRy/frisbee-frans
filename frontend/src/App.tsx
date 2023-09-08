import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Root from "./pages/Root";
import LatestRounds from "./components/LatestRounds";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [{
        path: "/",
        element: <LatestRounds />,
    }]
    }
  ])
  return (
    <RouterProvider router={router} />
  )
}

export default App
