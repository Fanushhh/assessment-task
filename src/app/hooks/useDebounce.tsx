import * as React from "react";

export const useDebounce = (callback: () => void, delay: number, deps: React.DependencyList) => {
    React.useEffect(() => {
        const handler = setTimeout(() => {
            callback();
        }, delay);
        
        return () => clearTimeout(handler);
    }, [delay, ...deps]);
};