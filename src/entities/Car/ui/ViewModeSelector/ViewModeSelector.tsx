import { classNames } from "shared/lib/classNames/classNames";
import cls from './ViewModeSelector.module.scss'
import { ViewMode } from "entities/Car/model/types/car";
import ListIcon from 'shared/assets/icons/view-agenda.svg'
import TilesIcon from 'shared/assets/icons/view-module.svg'
import { Button } from "shared/ui/Button/ui/Button";
import { memo } from "react";

interface ViewModeSelectorProps {
    className?: string;
    view: ViewMode;
    onViewClick? : (view: ViewMode)=>void
}

const viewTypes = [
    {
        view: ViewMode.LIST,
        icon: ListIcon
    },
    {
        view: ViewMode.TILES,
        icon: TilesIcon
    }
]

export const ViewModeSelector = memo(({ className, view, onViewClick }: ViewModeSelectorProps) => {

    const onClick = (newView: ViewMode) => () => {
        onViewClick?.(newView)
    }

    return (
        <div className={classNames(cls.ViewModeSelector, {}, [className])}>
            {viewTypes.map(viewType => (
                <Button key={viewType.view}  onClick={onClick(viewType.view)}>
                    {viewType.view == ViewMode.LIST ? <ListIcon/> : <TilesIcon/>}
                </Button>
            ))}
        </div>
    )
})