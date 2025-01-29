import { getUserData } from "entities/User"
import { memo, Suspense, useMemo } from "react"
import { useSelector } from "react-redux"
import { Route, Routes } from "react-router-dom"
import { routeConfig } from "shared/config/routeConfig/routeConfig"

const AppRouter = () => {

  const isAuth = useSelector(getUserData)

  const routes = useMemo(() => {
   return Object.values(routeConfig).filter((route)=>{
      if(route.authOnly && !isAuth){
        return false
      }
      return true
    })
  }, [isAuth])

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {routes.map(({ element, path }) => (
          <Route key={path} path={path} element={<div className="page-wrapper">{element}</div>} />
        ))}
      </Routes>
    </Suspense >

  )
}

export default memo(AppRouter)

