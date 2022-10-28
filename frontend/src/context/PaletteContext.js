import React, { useReducer } from 'react'
import { createContext } from 'react'

export const PaletteContext = createContext()

export const palettesReducer = (state, action) =>{
    switch(action.type){
        case 'SET_PALETTES':
            return {
                palettes: action.payload
            }
        case 'CREATE_PALETTE':
            return {
                palettes: [action.payload, ...state.palettes]
            }
        case 'DELETE_PALETTE':
            return{
                palettes: state.palettes.filter((p) => 
                    p._id !== action.payload._id
                )
            }
        default:
            return state
    }
}

export const PaletteContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(palettesReducer, {
        palettes:null
    })

    return(
        <PaletteContext.Provider value={{...state, dispatch}}>
            {children}
        </PaletteContext.Provider>
    )
}