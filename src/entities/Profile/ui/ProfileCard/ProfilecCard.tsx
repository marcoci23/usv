import { classNames } from "shared/lib/classNames/classNames";
import cls from './ProfileCard.module.scss';
import { Profile } from "entities/Profile/model/types/profile";

interface ProfileCardProps {
    className?: string;
    data?: Profile
    isLoading?: boolean;
    error?: string;
    readonly?: boolean;
    onChangeCountry: (value?: string) => void;
    onChangeFirstname: (value?: string) => void;
    onChangeLastname: (value?: string) => void;
    onChangeAge:(value?: number) => void;
    onChangeAvatar:(value?: string) => void;
}
export const ProfileCard = ({ 
    className, 
    data, 
    isLoading, 
    error,
     readonly, 
     onChangeCountry, 
     onChangeFirstname, 
     onChangeLastname,
     onChangeAge,
     onChangeAvatar,
}: ProfileCardProps) => {

    if(isLoading) { 
        return <div>Loading...</div>
    }

    if(error) {
        return <div>{error}</div>
    }

    return (
        <div className={classNames(cls.ProfileCard, {}, [className])}>
           <div className={cls.body}> 
           <input onChange={(e)=>onChangeFirstname(e.target.value)} readOnly={readonly} type="text" placeholder="firstname" value={data?.first} className={cls.input}/>
            <input onChange={(e)=>onChangeLastname(e.target.value)} readOnly={readonly} type="text" placeholder="lastname" value={data?.lastname} className={cls.input}/>
            <input onChange={(e)=>onChangeAge(Number(e.target.value))} readOnly={readonly} type="text" placeholder="age" value={data?.age} className={cls.input}/>
            <input onChange={(e)=>onChangeCountry(e.target.value)}readOnly={readonly} type="text" placeholder="country" value={data?.country} className={cls.input}/>
            <input onChange={(e)=>onChangeAvatar(e.target.value)} readOnly={readonly} type="text" placeholder="avatar" value={data?.avatar} className={cls.input}/>
           </div>
        </div>
    )
}