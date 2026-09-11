import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./pages/About.jsx";
import Chatbot from "./pages/Chatbot.jsx";
import { Provider } from "react-redux";
import store from "./store/store.jsx";
import Location from "./pages/Location.jsx";
import Home from "./pages/Home.jsx";
import Forecast from "./pages/Forecast.jsx";


const approuter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true, //index route represents the case where there is no additional path after the parent
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "weathergpt",
        element: <Chatbot />,
      },
      {
        path: "location",
        element: <Location />,
      },
      {
        path: "forecast",
        element: <Forecast />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={approuter} />
    </Provider>
  </StrictMode>,
);
