import { Todo } from "@/types";

export const stringifyAndStore = (key: string, data: Todo[]) => {
    if (localStorage.getItem(key) || data.length > 0) {
        localStorage.setItem(key, JSON.stringify(data));
    }
};

export const fetchDataFromLocalStorage = (key: string) => {
    const jsonData = localStorage.getItem(key);

    if (jsonData) {
        return JSON.parse(jsonData);
    } else {
        console.log(`No data found for key: ${key}`);
        return null;
    }
};

export const formatString =  (input: string) =>{
      let trimmedString = input.trim();
    
      let formattedString = trimmedString.charAt(0).toUpperCase() + trimmedString.slice(1);
      
      return formattedString;
}
