import { PaletteContext } from "../context/PaletteContext";
import { useContext } from "react";

export const usePalettesContext = () => {
    const context = useContext(PaletteContext)

    if(!context){
        throw Error('usePaletteContext must be used inside an PaletteContextProvider')
    }
    
    return context
}