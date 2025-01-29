import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ProfilePageHeader.module.scss"
import { Button } from "shared/ui/Button/ui/Button";
import { profileActions, updateProfileData } from "entities/Profile";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useCallback } from "react";

interface ProfilePageHeaderProps {
    className?: string;
    readonly?: boolean;
}
export const ProfilePageHeader = ({ className, readonly }: ProfilePageHeaderProps) => {

    const dispath = useAppDispatch()

    const onEdit = useCallback(() => {
        dispath(profileActions.setReadonly(false))
    }, [dispath])

    const onCancelEdit = useCallback(() => {
        dispath(profileActions.cancelEdit())
    }, [dispath])
    const onSave = useCallback(() => {
        dispath(updateProfileData())
    }, [])

    return (
        <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
            <h3>PROFILE CARD</h3>
            {!readonly ?
                <>
                    <Button onClick={onCancelEdit} className={cls.editBtn}>CANCEL</Button>
                    <Button onClick={onSave} className={cls.saveBtn}>SAVE</Button>
                </> :
                <Button onClick={onEdit} className={cls.editBtn}>EDIT</Button>}

        </div>
    )
}