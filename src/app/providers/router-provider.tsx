import { createBrowserRouter, RouterProvider } from "react-router";
import { MainPage } from "@/pages/main-page";
import { EventsPage } from "@/pages/events-page";
import { RegisterPage } from "@/pages/register-page/ui/RegisterPage.tsx";
import {LoginPage} from "@/pages/login-page/ui/LoginPage.tsx";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <MainPage />
        },
        {
            path: "/register",
            element: <RegisterPage />
        },

        {
            path: "/login",
            element: <LoginPage />
        },
        /*
        {
            path: "/movie/:id",
            element:
        },
        {
            path: "/booking/:id",
            element:
        },
*/
        {
            path: "/events",
            element: <EventsPage />
        }

    ]
)
export function AppRouterProvider() {
    return (
        <RouterProvider router={router} />
    )
}
