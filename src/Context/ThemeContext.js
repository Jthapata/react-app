import { createContext, useState } from "react";

export const LightTheme = createContext(true);

export default function ThemeProvider({children}) {
    const [lightTheme, setLightTheme] = useState(true)

    return (
        <ThemeContext.Provider value={{ lightTheme, setLightTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}