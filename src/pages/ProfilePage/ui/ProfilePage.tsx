import { classNames } from "shared/lib/classNames/classNames";
import cls from './ProfilePage.module.scss';
import { fetchProfileData, ProfileCard, profileReducer } from "entities/Profile";
import { useEffect } from "react";
import { useSelector, useStore } from "react-redux";
import { ReduxStoreWithManager } from "app/providers/StoreProvider";
import { getProfileData } from "entities/Profile/model/selectors/getProfileData/getProfileData";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = ({ className }: ProfilePageProps) => {
    
    const store = useStore() as ReduxStoreWithManager
    const dispath = useAppDispatch()
    const data = useSelector(getProfileData)
    console.log(data)

    useEffect(() => {
            store.reducerManager.add('profile', profileReducer)
    
            return () => {
                store.reducerManager.remove('profile')
            }
    
        }, [])

    useEffect(() => {
       dispath(fetchProfileData())
    }, [dispath])

    return (
       
            <div className={classNames(cls.ProfilePage, {}, [className])}>
                PROFILE PAGE
                 <ProfileCard/>
            </div>
        
    )
}

export default ProfilePage;