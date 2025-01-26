import { classNames } from "shared/lib/classNames/classNames";
import cls from './ProfileCard.module.scss';
import { useSelector } from "react-redux";
import { getProfileData } from "entities/Profile/model/selectors/getProfileData/getProfileData";
import { getProfileError } from "entities/Profile/model/selectors/getProfileError/getProfileError";
import { getProfileIsLoading } from "entities/Profile/model/selectors/getProfileIsLoading/getProfileIsLoading";
import { Button } from "shared/ui/Button/ui/Button";

interface ProfileCardProps {
    className?: string;
}
export const ProfileCard = ({ className }: ProfileCardProps) => {

    const data  = useSelector(getProfileData)
    const error  = useSelector(getProfileError)
    const isLoading  = useSelector(getProfileIsLoading)

    return (
        <div className={classNames(cls.ProfileCard, {}, [className])}>
           <div className={cls.header}>
           <h3>PROFILE CARD</h3>
            <Button className={cls.editBtn}>EDIT</Button>
            {/* <Button>SAVE</Button> */}
           </div>
           <div className={cls.body}> 
            <input type="text" placeholder="city" value={data?.city} className={cls.input}/>
            <input type="text" placeholder="avatar" value={data?.avatar} className={cls.input}/>
           </div>
        </div>
    )
}