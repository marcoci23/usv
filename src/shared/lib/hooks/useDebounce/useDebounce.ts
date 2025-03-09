import { MutableRefObject, useRef, useCallback } from "react"

export function useDebounce(callBack: (...args: any[]) => void, delay: number) {
    const timer = useRef() as MutableRefObject<any>

    return useCallback((...args: any[]) => {
        if (timer.current) {
            clearTimeout(timer.current)
        }

        timer.current = window.setTimeout(() => {
            callBack(...args)
        }, delay)
    }, [callBack, delay])

}