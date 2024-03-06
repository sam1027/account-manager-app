import { createBrowserRouter } from "react-router-dom"
import NotFound from "./pages/errors/NotFound";
import SystemError from "./pages/errors/SystemError";
import Expenditure from "./pages/Expenditure";
import Income from "./pages/Income";
import Main from "./pages/Main";
import Root from "./Root";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "",
                element: <Main />,
                errorElement: <SystemError />
            },
            {
                path: "income",
                element: <Income />,
                errorElement: <SystemError />
            },
            {
                path: "expenditure",
                element: <Expenditure />,
                errorElement: <SystemError />
            },
        ],
        errorElement: <NotFound />
    }

]);

export default router;