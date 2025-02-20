import { classNames } from "shared/lib/classNames/classNames";
import cls from './CatalogPage.module.scss'
import { memo, useCallback, useEffect } from "react";
import { CarList, ViewMode, ViewModeSelector } from "entities/Car";
import { useSelector, useStore } from "react-redux";
import { ReduxStoreWithManager } from "app/providers/StoreProvider";
import { catalogPageActions, catalogPageReducer, getCatalog } from "../model/slices/catalogPageSlice";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { fetchCarList } from "../model/services/fetchCarList/fetchCarList";
import { getCatalogPageError, getCatalogPageHasMore, getCatalogPageIsLoading, getCatalogPageNum, getCatalogPageView, getCatalogPageInited } from "../model/selectors/catalogPageSelectors";
import { Page } from "widgets/Page";
import { fetchNextPage } from "../model/services/fetchNextPage/fetchNextPage";

interface CatalogPageProps {
    className?: string;
}
export const CatalogPage = memo(({ className }: CatalogPageProps) => {

    const store = useStore() as ReduxStoreWithManager
    const dispatch = useAppDispatch()
    const carList = useSelector(getCatalog.selectAll)
    const isLoading = useSelector(getCatalogPageIsLoading)
    const error = useSelector(getCatalogPageError)
    const viewMode = useSelector(getCatalogPageView)
    const page = useSelector(getCatalogPageNum)
    const hasMore = useSelector(getCatalogPageHasMore)
    const inited = useSelector(getCatalogPageInited)

    const onChangeViewMode = useCallback((view: ViewMode) => {
        dispatch(catalogPageActions.setView(view))
    }, [])

    const onLoadNextPage = useCallback(() => {
        dispatch(fetchNextPage())
    }, [])

    useEffect(() => {
        store.reducerManager.add('catalogPage', catalogPageReducer)

        return () => {
            store.reducerManager.remove('catalogPage')
        }

    }, [])

    useEffect(() => {
        if (!inited) {
            dispatch(catalogPageActions.initState())
            dispatch(fetchCarList({
                page: 1,
            }))
        }

    }, [])

    if (error) {
        return <div>ERROR</div>
    }

    return (
        <Page onScrollEnd={onLoadNextPage} className={classNames(cls.CatalogPage, {}, [className])}>
            CATALOG PAGE
            <ViewModeSelector view={viewMode} onViewClick={onChangeViewMode} />
            <CarList
                items={carList}
                isLoading={isLoading}
                view={viewMode}
            />
        </Page>
    )
})