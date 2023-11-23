module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "jest": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "prettier"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "react",
        "react-hooks",
        "prettier",
    ],
    "rules": {
        "react/react-in-jsx-scope": "off",
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": "off",
        "react-hooks/rules-of-hooks": "error", // For checking rules of hooks
        "react-hooks/exhaustive-deps": "error", // For checking hook dependencies 
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/no-unused-vars": "off"
    },
};
