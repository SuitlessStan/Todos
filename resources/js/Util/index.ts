import { Todo } from "@/types";

export const stringifyAndStore = (key: string, data: Todo[]) => {
    if (localStorage.getItem(key)) {
        const jsonData = JSON.stringify(data);
        localStorage.setItem(key, jsonData);
    }
};

export const fetchDataFromLocalStorage = (key: string) => {
    const jsonData = localStorage.getItem(key);

    if (jsonData) {
        const data = JSON.parse(jsonData);
        return data;
    } else {
        console.log(`No data found for key: ${key}`);
        return null;
    }
};
