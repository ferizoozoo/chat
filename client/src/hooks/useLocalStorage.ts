import { useEffect, useState } from "react";

function useLocalStorage(
  key: string,
  initialValue: string = ""
): [string | null, (x: string) => void] {
  const [value, setValue] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(key);
    }
    return initialValue;
  });

  const updateLocalStorage = (item: string) => {
    localStorage.setItem(key, item);
    setValue(item);
  };

  return [value, updateLocalStorage];
}

export default useLocalStorage;
