import {
  BrowserRouter as Router,
  Routes,
  Route,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import Root from "./routes/Root/Root";
import Notes, { loader as NotesLoader } from "./routes/Notes/Notes";
import NewNote from './routes/NewNote/NewNote';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/notes", element: <Notes />, loader: NotesLoader },
      { path: "/new", element: <NewNote />},
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
