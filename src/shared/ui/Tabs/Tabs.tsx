import { classNames } from "shared/lib/classNames/classNames";
import cls from './Tabs.module.scss';
import { useCallback } from "react";

export interface TabItem {
    value: string;
    content: React.ReactNode;
}

interface TabsProps {
    className?: string;
    tabs: TabItem[];
    value: string;
    onTabClick: (tab: TabItem) => void;
}
export const Tabs = ({ className, tabs, value, onTabClick }: TabsProps) => {

    const clickhandle = useCallback((tab: TabItem) => {
        return ()=>{
            onTabClick(tab)
        }
    },[])

    return (
        <div className={classNames(cls.Tabs, {}, [className])}>
            {tabs.map((tab, index) => (
                <div
                    key={index}
                    className={classNames(cls.Tab, {
                        [cls.active]: tab.value === value
                    })}
                    onClick={clickhandle(tab)}
                >
                    {tab.content}
                </div>
            ))}
        </div>
    )
}