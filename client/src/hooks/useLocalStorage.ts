import { useState } from "react";

function useLocalStorage(key: string, initialValue: String = '') {
    const [value, setValue] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(key)
        }
        return initialValue
    })
    
    const updateLocalStorage = (item: string) => {
        localStorage.updateLocalStorage(item)
        setValue(item)
    }

    return [value, updateLocalStorage]
}

export default useLocalStorage;