import { classNames } from "shared/lib/classNames/classNames";
import cls from './ProfilePage.module.scss';
import { fetchProfileData, getProfileError, getProfileForm, getProfileIsLoading, getProfileReadonly, getProfileValidateErrors, profileActions, ProfileCard, profileReducer } from "entities/Profile";
import { useCallback, useEffect } from "react";
import { useSelector, useStore } from "react-redux";
import { ReduxStoreWithManager } from "app/providers/StoreProvider";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { ProfilePageHeader } from "./ProfilePageHeader/ProfilePageHeader";
import { Page } from "widgets/Page";

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = ({ className }: ProfilePageProps) => {

    const store = useStore() as ReduxStoreWithManager
    const dispatch = useAppDispatch()
    const formData = useSelector(getProfileForm)
    const error = useSelector(getProfileError)
    const isLoading = useSelector(getProfileIsLoading)
    const readonly = useSelector(getProfileReadonly)
    const validateErrors = useSelector(getProfileValidateErrors)

    useEffect(() => {
        store.reducerManager.add('profile', profileReducer)
        return () => {
            store.reducerManager.remove('profile')
        }

    }, [])

    useEffect(() => {
        dispatch(fetchProfileData())
    }, [dispatch])

    const onChangeFirstname = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ first: value || '' }))
    }, [])
    const onChangeLastname = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ lastname: value || '' }))
    }, [])
    const onChangeAge = useCallback((value?: number) => {
        dispatch(profileActions.updateProfile({ age: value || 0 }))
    }, [])
    const onChangeCountry = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ country: value || '' }))
    }, [])
    const onChangeAvatar = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ avatar: value || '' }))
    }, [])

    return (

        <Page className={classNames(cls.ProfilePage, {}, [className])}>
            PROFILE PAGE
            <ProfilePageHeader readonly={readonly} />
            {validateErrors?.length && validateErrors.map((el) => <div>{el}</div>)}
            <ProfileCard
                readonly={readonly}
                data={formData}
                isLoading={isLoading}
                error={error}
                onChangeCountry={onChangeCountry}
                onChangeFirstname={onChangeFirstname}
                onChangeLastname={onChangeLastname}
                onChangeAge={onChangeAge}
                onChangeAvatar={onChangeAvatar}
            />
        </Page>

    )
}

export default ProfilePage;