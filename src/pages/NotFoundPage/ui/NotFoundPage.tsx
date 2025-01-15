import { classNames } from "shared/lib/classNames/classNames";
import cls from "./NotFoundPage.module.scss"

interface NotFoundPageProps {
    clasName?: string;
}
export const NotFoundPage = ({ clasName }: NotFoundPageProps) => {
    return (
        <div className={classNames(cls.NotFoundPage, {}, [clasName])}>
            <h1>404</h1>
        </div>
    )
}