import { classNames } from "shared/lib/classNames/classNames";
import cls from './Page.module.scss'
import { memo, MutableRefObject, ReactNode, useRef } from "react";
import { useInfiniteScroll } from "shared/lib/hooks/useInfiniteScroll/useInfiniteScroll";

interface PageProps {
    className?: string;
    children: ReactNode;
    onScrollEnd?: () => void;
}
export const Page = memo(({ className, children, onScrollEnd }: PageProps) => {

    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>

    useInfiniteScroll({
        callback: onScrollEnd,
        triggerRef,
        wrapperRef
    })

    return (
        <section ref={wrapperRef} className={classNames(cls.Page, {}, [className])}>
            {children}
            {onScrollEnd ? <div ref={triggerRef}></div> : null}
        </section>
    )
})