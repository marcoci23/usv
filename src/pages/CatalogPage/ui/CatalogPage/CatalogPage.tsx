import { classNames } from "shared/lib/classNames/classNames";
import cls from './CatalogPage.module.scss'
import { memo, useCallback, useEffect } from "react";
import { CarList } from "entities/Car";
import { useSelector, useStore } from "react-redux";
import { ReduxStoreWithManager } from "app/providers/StoreProvider";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Page } from "widgets/Page";
import { catalogPageActions, catalogPageReducer, getCatalog } from "pages/CatalogPage/model/slices/catalogPageSlice";
import { fetchNextPage } from "pages/CatalogPage/model/services/fetchNextPage/fetchNextPage";
import { fetchCarList } from "pages/CatalogPage/model/services/fetchCarList/fetchCarList";
import {
    getCatalogPageError,
    getCatalogPageHasMore,
    getCatalogPageInited,
    getCatalogPageIsLoading,
    getCatalogPageNum,
    getCatalogPageView
} from "pages/CatalogPage/model/selectors/catalogPageSelectors";
import { CatalogPagesFilters } from "../CatalogPageFilters/CatalogPagesFilters";
import { useSearchParams } from "react-router-dom";
import { initCatalogPage } from "pages/CatalogPage/model/services/initCatalogPage/initCatalogPage";

interface CatalogPageProps {
    className?: string;
}
export const CatalogPage = memo(({ className }: CatalogPageProps) => {

    const store = useStore() as ReduxStoreWithManager
    const dispatch = useAppDispatch()
    const carList = useSelector(getCatalog.selectAll)
    const isLoading = useSelector(getCatalogPageIsLoading)
    const error = useSelector(getCatalogPageError)
    const inited = useSelector(getCatalogPageInited)
    const viewMode = useSelector(getCatalogPageView)
    const [searchParams, setSearchParams] = useSearchParams()

    const onLoadNextPage = useCallback(() => {
        dispatch(fetchNextPage())
    }, [])

    useEffect(() => {
        store.reducerManager.add('catalogPage', catalogPageReducer)

        return () => {
            store.reducerManager.remove('catalogPage')
        }

    }, [])

    // useEffect(() => {
    //     if (!inited) {
    //         dispatch(catalogPageActions.initState())
    //         dispatch(fetchCarList({
    //             page: 1,
    //         }))
    //     }

    // }, [])

    useEffect(()=>{
        dispatch(initCatalogPage(searchParams))
    },[])

    if (error) {
        return <div>ERROR</div>
    }

    return (
        <Page onScrollEnd={onLoadNextPage} className={classNames(cls.CatalogPage, {}, [className])}>
            CATALOG PAGE
            <CatalogPagesFilters />
            <CarList
                items={carList}
                isLoading={isLoading}
                view={viewMode}
            />
        </Page>
    )
})