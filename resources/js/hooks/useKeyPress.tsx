import { useEffect } from "react";

export default function useKeyPress(targetKey: string, callback: () => void) {
    useEffect(() => {
        function handleKeyPress(event: KeyboardEvent) {
            if (event.key === targetKey) {
                callback();
            }
        }

        document.addEventListener("keydown", handleKeyPress);

        return () => document.removeEventListener("keydown", handleKeyPress);
    }, [targetKey, callback]);
}
