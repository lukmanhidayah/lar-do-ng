const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    important: true,
    purge: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.js",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Roboto", ...defaultTheme.fontFamily.sans],
            },
            fontSize: {
                xxs: ["9pt", ".75rem"],
                xs: "10pt",
                sm: "11pt",
                base: "12pt",
                lg: "14pt",
                xl: "16pt",
                "2xl": "20pt",
                "3xl": "24pt",
                "4xl": "28pt",
            },
            zIndex: {
                0: 0,
                10: 10,
                20: 20,
                25: 25,
                30: 30,
                40: 40,
                50: 50,
                75: 75,
                100: 100,
            },
            colors: {
                primary: {
                    100: "#1d75c6",
                    200: "#1b6cb7",
                    300: "#1863a8",
                    400: "#165a9a",
                    500: "#14528b",
                    600: "#12497C",
                    700: "#10406d",
                    800: "#0e385e",
                    900: "#0c2f50",
                },
                blue: {
                    10: "#f5f9fd",
                },
            },
            minHeight: {
                0: "0",
                "1/4": "25%",
                "1/2": "50%",
                "3/4": "75%",
                full: "100%",
            },
            fontWeight: {
                normal: 400,
                semibold: 500,
                bold: 700,
            },
            animation: {
                "bounce-in": "bounceIn 400ms linear",
            },
            keyframes: {
                bounceIn: {
                    "0%": {
                        opacity: "0",
                        transform: "scale(0)",
                    },

                    "50%": {
                        transform: "scale(1.05)",
                    },

                    "70%": {
                        transform: "scale(0.9)",
                    },

                    "100%": {
                        opacity: "1",
                        transform: "scale(1)",
                    },
                },
            },
        },
    },

    variants: {
        extend: {
            opacity: ["disabled"],
            backgroundColor: ["active"],
            display: ["group-hover"],
        },
    },

    plugins: [
        require("@tailwindcss/forms")({
            strategy: "class",
        }),
    ],
};
