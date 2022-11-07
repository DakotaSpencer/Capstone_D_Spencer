import { useAuthContext } from "./useAuthContext"
import { usePalettesContext } from "./usePalettesContext"


export const useLogout = () => {
    const {dispatch} = useAuthContext()
    const {dispatch: paletteDispatch} = usePalettesContext()

    const logout = () => {
        //remove user from localStorage
        localStorage.removeItem('user')

        //dispatch logout action
        dispatch({type: 'LOGOUT'})
        paletteDispatch({type: 'SET_PALETTES', payload: null})
    }

    return {logout}
}