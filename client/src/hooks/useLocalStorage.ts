import { useEffect, useState } from "react";

const useLocalStorage = (
  key: string,
  initialValue: string = ""
): [string | null, (x: string) => void] => {
  const [value, setValue] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(key) || initialValue;
    }
    return initialValue;
  });

  const updateLocalStorage = (item: string) => {
    if (!item) {
      localStorage.removeItem(key);
      setValue(null);
    } else {
      localStorage.setItem(key, item);
      setValue(item);
    }

    window.dispatchEvent(
      new CustomEvent(`localStorageUpdate:${key}`, { detail: item })
    );
  };

  useEffect(() => {
    const handleStorageChange = (e: CustomEvent) => {
      setValue(e.detail);
    };

    window.addEventListener(
      `localStorageUpdate:${key}`,
      handleStorageChange as EventListener
    );

    return () => {
      window.removeEventListener(
        `localStorageUpdate:${key}`,
        handleStorageChange as EventListener
      );
    };
  }, [key]);

  return [value, updateLocalStorage];
};

export default useLocalStorage;
