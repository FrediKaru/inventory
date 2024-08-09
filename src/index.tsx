import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./index.css";

import Errorpage from "./error-page.tsx";
import App from "./App.tsx";
import Inventory from "./routes/Inventory.tsx";
import Edit from "./routes/Edit.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Errorpage />,
    children: [
      {
        path: "/",
        element: <Inventory />,
      },
      {
        path: "/edit/:id",
        element: <Edit />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
