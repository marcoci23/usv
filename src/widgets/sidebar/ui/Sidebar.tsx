import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Sidebar.module.scss"
import { useState } from "react";
import { Button } from "shared/ui/Button/ui/Button";

interface SidebarProps {
    clasName?: string;
}

export const Sidebar = ({ clasName }: SidebarProps) => {

    const [collapsed, setCollapsed] = useState(false)

    const onToggle = () => {
        setCollapsed(prev => !prev)
    }

    return (
        <div className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [clasName])}>
            <Button onClick={onToggle}>toggle</Button>
        </div>
    )
}