import { classNames } from "shared/lib/classNames/classNames";
import cls from "./CatalogPagesFilters.module.scss";
import { useSelector } from "react-redux";
import { getCatalogpageOrder, getCatalogPageSearch, getCatalogPageSort, getCatalogPageView, getCatalogPageType } from "pages/CatalogPage/model/selectors/catalogPageSelectors";
import { useCallback, useMemo } from "react";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { catalogPageActions } from "pages/CatalogPage/model/slices/catalogPageSlice";
import { ViewMode, ViewModeSelector } from "entities/Car";
import { Select } from "shared/ui/Select/Select";
import { CarSortField, CarType } from "entities/Car/model/types/car";
import { SortOrder } from "shared/types";
import { fetchCarList } from "pages/CatalogPage/model/services/fetchCarList/fetchCarList";
import { useDebounce } from "shared/lib/hooks/useDebounce/useDebounce";
import { TabItem, Tabs } from "shared/ui/Tabs/Tabs";

interface CatalogPagesFiltersProps {
    className?: string;
}

export const CatalogPagesFilters = ({ className }: CatalogPagesFiltersProps) => {

    const viewMode = useSelector(getCatalogPageView)
    const dispatch = useAppDispatch()
    const sort = useSelector(getCatalogPageSort)
    const order = useSelector(getCatalogpageOrder)
    const search = useSelector(getCatalogPageSearch)
    const type = useSelector(getCatalogPageType)

    const fetchData = useCallback(() => {
        dispatch(fetchCarList({ replace: true }))
    }, [])

    const doboundedFetchData = useDebounce(fetchData, 500)

    const onChangeViewMode = useCallback((view: ViewMode) => {
        dispatch(catalogPageActions.setView(view))
    }, [])

    const onChangeSort = useCallback((newSort: CarSortField) => {
        dispatch(catalogPageActions.setSort(newSort))
        dispatch(catalogPageActions.setPage(1))
        fetchData()
    }, [])

    const onChangeOrder = useCallback((sortOrder: SortOrder) => {
        dispatch(catalogPageActions.setOrder(sortOrder))
        dispatch(catalogPageActions.setPage(1))
        fetchData()
    }, [])

    const onChangeSearch = useCallback((search: string) => {
        dispatch(catalogPageActions.setSearch(search))
        dispatch(catalogPageActions.setPage(1))
        doboundedFetchData()
    }, [])

    const orderOptions = useMemo(() => [
        {
            value: 'asc',
            content: 'ascendent'
        },
        {
            value: 'desc',
            content: 'descendent'
        }
    ], [])

    const sortFieldOptions = useMemo(() => [
        {
            value: CarSortField.CREATED_AT,
            content: 'date'
        },
        {
            value: CarSortField.TITLE,
            content: 'title'
        },
        {
            value: CarSortField.VIEWS,
            content: 'views'
        }
    ], [])

    const changeSortHandler = useCallback((newSort: string) => {
        onChangeSort(newSort as CarSortField)
    }, [])

    const changeOrderHandler = useCallback((newOrder: string) => {
        onChangeOrder(newOrder as SortOrder)
    }, [])

    const onChangeType = useCallback((tab: TabItem) => {
        dispatch(catalogPageActions.setType(tab.value as CarType)) 
        dispatch(catalogPageActions.setPage(1))
        fetchData()
    }, [])

    const typeTabs = useMemo<TabItem[]>(() => [
        {
            value: CarType.ALL,
            content: 'ALL'
        },
        {
            value: CarType.BUSINESS,
            content: 'BUSINESS'
        },
        {
            value: CarType.SPORT,
            content: 'SPORT'
        },
        {
            value: CarType.ECONOM,
            content: 'ECONOM'
        }
    ], [])

    return (
        <div className={classNames(cls.CatalogPagesFilters, {}, [className])}>
            <div className={cls.sortWrapper}>
                <Select options={sortFieldOptions} label="Sort by" value={sort} onChange={changeSortHandler} />
                <Select options={orderOptions} label="order" value={order} onChange={changeOrderHandler} />
                <ViewModeSelector view={viewMode} onViewClick={onChangeViewMode} />
            </div>
            <div className={cls.searchWrapper}>
                <input type="text" placeholder="search" onChange={(e) => onChangeSearch(e.target.value)} value={search} />
            </div>
            <Tabs tabs={typeTabs} value={type } onTabClick={ onChangeType} />
        </div>
    )
}