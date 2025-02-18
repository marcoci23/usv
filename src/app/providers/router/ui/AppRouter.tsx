import { memo, Suspense, useCallback, useMemo } from "react"
import { Route, Routes } from "react-router-dom"
import { AppRoutesProps, routeConfig } from "shared/config/routeConfig/routeConfig"
import { RequireAuth } from "./RequireAuth"

const AppRouter = () => {

  // const isAuth = useSelector(getUserData)

  // const routes = useMemo(() => {
  //  return Object.values(routeConfig).filter((route)=>{
  //     if(route.authOnly && !isAuth){
  //       return false
  //     }
  //     return true
  //   })
  // }, [isAuth])

  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    const element = (
      <Suspense fallback={<div>Loading...</div>}>
          {route.element}
      </Suspense>
    );
    return (
      <Route
        key={route.path}
        path={route.path}
        element={route.authOnly ? <RequireAuth>{element}</RequireAuth> : element}
      />
    );
  }, []);

  return (
    <Routes>
      {Object.values(routeConfig).map(renderWithWrapper)}
    </Routes>
  );
};

export default memo(AppRouter);
