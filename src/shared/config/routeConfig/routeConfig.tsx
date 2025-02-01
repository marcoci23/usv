import { RouteProps } from "react-router-dom";
import { MainPage } from "pages/MainPage";
import { AboutPage } from "pages/AboutPage";
import { NotFoundPage } from "pages/NotFoundPage";
import { ProfilePageAsync } from "pages/ProfilePage";
import { CatalogPage } from "pages/CatalogPage";
import { CarDetailsPage } from "pages/CarDetailsPage";


export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
}

export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    PROFILE = 'profile',
    CARS = 'cars',
    CAR_DETAILS = 'car_details',
    NOT_FOUND = 'not_found'
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.PROFILE]: '/profile',
    [AppRoutes.CARS]: '/cars',
    [AppRoutes.CAR_DETAILS]: '/cars/',
    [AppRoutes.NOT_FOUND]: '*'
}

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />
    },
    [AppRoutes.ABOUT]: {
        path: RoutePath.about,
        element: <AboutPage />,
    },
    [AppRoutes.PROFILE]: {
        path: RoutePath.profile,
        element: <ProfilePageAsync />,
        authOnly: true
    },
    [AppRoutes.CARS]: {
        path: RoutePath.cars,
        element: <CatalogPage/>,
        authOnly: true
    },
    [AppRoutes.CAR_DETAILS]: {
        path: `${RoutePath.car_details}:id`,
        element: <CarDetailsPage/>,
        authOnly: true
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage/>
    }
}
