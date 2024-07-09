import { createBrowserRouter } from "react-router-dom"
import NotFound from "./pages/errors/NotFound";
import SystemError from "./pages/errors/SystemError";
import Expenditure from "./pages/Expenditure";
import Income from "./pages/Income";
import Main from "./pages/Main";
import Account from "./pages/setting/Account";
import Card from "./pages/setting/Card";
import Category from "./pages/setting/Category";
import RegularExpenditure from "./pages/setting/RegularExpenditure";
import RegularIncome from "./pages/setting/RegularIncome";
import Root from "./Root";
import Code from "./pages/setting/Code";

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
            {
                path: "setting/regularincome",
                element: <RegularIncome />,
                errorElement: <SystemError />
            },
            {
                path: "setting/regularexpenditure",
                element: <RegularExpenditure />,
                errorElement: <SystemError />
            },
            {
                path: "setting/card",
                element: <Card />,
                errorElement: <SystemError />
            },
            {
                path: "setting/account",
                element: <Account />,
                errorElement: <SystemError />
            },
            {
                path: "setting/category",
                element: <Category />,
                errorElement: <SystemError />
            },
            {
                path: "setting/code",
                element: <Code />,
                errorElement: <SystemError />
            },
        ],
        errorElement: <NotFound />
    }

]);

export default router;