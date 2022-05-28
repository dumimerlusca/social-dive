import { useEffect } from 'react'
import { useAppDispatch } from 'store/store'
import { setWindowWidth } from 'store/ui/uiSlice'

const useWindowWidth = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        const onResize = () => {
            const width = window.innerWidth
            dispatch(setWindowWidth(width))
        }
        window.addEventListener('resize', onResize)

        return () => {
            window.removeEventListener('resize', onResize)
        }
    })

  return null
}

export default useWindowWidth