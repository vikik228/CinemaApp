import { createBrowserRouter, RouterProvider } from "react-router";
import { MainPage } from "@/pages/main-page";
import { EventsPage } from "@/pages/events-page";
import { RegisterPage } from "@/pages/register-page";
import { LoginPage } from "@/pages/login-page";
import { CatalogPage } from "@/pages/catalog-page";
import { MoviePage } from "@/pages/movie-page";
import { BookingPage } from "@/pages/booking-page";

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

        {
            path: "/movie/:id",
            element: <MoviePage />
        },
        {
            path: "/booking/:id",
            element: <BookingPage />
        },
        {
            path: "/events",
            element: <EventsPage />
        },
        {
          path: "/catalog",
          element: <CatalogPage />
        }

    ]
)
export function AppRouterProvider() {
    return (
        <RouterProvider router={router} />
    )
}
