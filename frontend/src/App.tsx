import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Root from "./pages/Root";
import LatestRounds from "./pages/LatestRounds";
import Courses from "./pages/Courses";
import Rounds from "./pages/Rounds";
import {SelectRound } from "./pages/SelectRound"
import ScoreInput from "./components/ScoreInput";
import HoleCard from "./components/HoleCard";
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
        element: <Courses onClickAction="Navigate" setCourse={() => {}}/>
      }, {
        path: "courses/:id",
        element: <></>
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
              element: <HoleCard />
            }]
          }
        ]
      },
      
    ]}
  ])
  return (
    <RouterProvider router={router} />
  )
}

export default App
