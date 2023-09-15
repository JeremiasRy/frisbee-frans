import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Root from "./pages/Root";
import LatestRounds from "./pages/LatestRounds";
import Courses from "./pages/Courses";
import Rounds from "./pages/Rounds";
import { CreateRound } from "./pages/CreateRound";
import Round from "./pages/Round";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [{
        path: "/",
        element: <LatestRounds />,
      }, {
        path: "courses",
        element: <Courses onClickAction="Navigate" setCourse={null}/>
      }, {
        path: "courses/:id",
        element: <></>
      },
      {
        path: "rounds",
        element: <Rounds />
      }, {
        path: "rounds/new",
        element: <CreateRound />
      },{
        path: "rounds/:id",
        element: <Round />
      }]
    }
  ])
  return (
    <RouterProvider router={router} />
  )
}

export default App
