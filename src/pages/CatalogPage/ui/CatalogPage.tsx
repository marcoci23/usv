import { classNames } from "shared/lib/classNames/classNames";
import cls from './CatalogPage.module.scss'
import { memo } from "react";

interface CatalogPageProps {
    className?: string;
}
export const CatalogPage = memo(({ className }: CatalogPageProps) => {
    return (
        <div className={classNames(cls.CatalogPage, {}, [className])}>
            CATALOG PAGE
        </div>
    )
})