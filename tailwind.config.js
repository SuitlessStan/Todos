import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.tsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                mediumaquamarine: "#60c0bf",
                darkseagreen: "#7fbc95",
                blacklike: "#1a1c1e",
                sandybrown: "#f7cb66",
                mediumpurple: "#b380da",
                salmon: "#ed7461",
                indianred: "#e06b6b",
            },
        },
    },

    plugins: [forms],
};
