import { createBrowserRouter, RouterProvider } from "react-router";
import { MainPage } from "@/pages/main-page";
import {EventsPage} from "@/pages/events-page";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <MainPage />
        },
        /*{
            path: "/register",
            element:
        },
        {
            path: "/login",
            element:
        },
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
