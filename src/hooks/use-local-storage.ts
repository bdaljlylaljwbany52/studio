'use client';

import { useState, useEffect, useCallback } from 'react';

// Helper function to safely parse JSON
function safeJsonParse<T>(jsonString: string | null): T | null {
  if (jsonString === null) {
    return null;
  }
  try {
    return JSON.parse(jsonString) as T;
  } catch (e) {
    console.error('Error parsing JSON from localStorage', e);
    return null;
  }
}

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      const parsedItem = safeJsonParse<T>(item);
      return parsedItem !== null ? parsedItem : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.error(`Error reading localStorage key “${key}”:`, error);
      return initialValue;
    }
  });

  // useEffect to update local storage when the state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
        try {
            // Allow value to be a function so we have the same API as useState
            const valueToStore = storedValue;
            // Save state
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            // A more advanced implementation would handle the error case
            console.error(`Error setting localStorage key “${key}”:`, error);
        }
    }
  }, [key, storedValue]);


  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = useCallback((value: T | ((val: T) => T)) => {
     try {
        // Allow value to be a function so we have the same API as useState
        const valueToStore =
        value instanceof Function ? value(storedValue) : value;
        // Save state
        setStoredValue(valueToStore);
     } catch(error){
         console.error(`Error setting value for localStorage key “${key}”:`, error);
     }
  }, [key, storedValue]); // Include storedValue dependency


  return [storedValue, setValue];
}
