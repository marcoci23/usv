import { classNames } from "shared/lib/classNames/classNames";
import cls from "./NotFoundPage.module.scss"
import { Page } from "widgets/Page";

interface NotFoundPageProps {
    className?: string;
}
export const NotFoundPage = ({ className }: NotFoundPageProps) => {
    return (
        <Page className={classNames(cls.NotFoundPage, {}, [className])}>
            <h1>404</h1>
        </Page>
    )
}