import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Root from "./pages/Root";
import Courses from "./pages/Courses";
import Rounds from "./pages/Rounds";
import {SelectRound } from "./pages/SelectRound"
import ScoreInput from "./components/ScoreInput";
import Round from "./pages/Round";
import Welcome from "./pages/Welcome";
import Course from "./pages/Course";
import HoleCardHorizontal from "./components/HoleCardHorizontal";
import Profile from "./pages/Profile";
import Hole from "./pages/Hole";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [{
        path: "/",
        element: <Welcome />
      }, {
        path:"profile",
        element: <Profile />
      }, {
        path: "courses",
        element: <Courses onClickAction="Navigate" setCourse={() => {}}/>
      }, {
        path: "courses/:id",
        element: <Course />
      },
      {
        path: "rounds",
        element: <Rounds />
      }, {
        path: "rounds/new",
        element: <SelectRound />
      },
      {
        path: "rounds/:id",
        element: <Round />,
        children: [
          {
            path: "scoreinput",
            element: <ScoreInput />,
            children: [{
              path: ":nthHole",
              element: <HoleCardHorizontal />
            }]
          }
        ]
      },
      {
        path: "holes/:id",
        element: <Hole />
      }
      
    ]}
  ])
  return (
    <RouterProvider router={router} />
  )
}

export default App
