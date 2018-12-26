import React from "react";

export const cultures = {
    zhCN: ['zh-CN'],
    enUS: ['en-US']
}

const CultureContext = React.createContext({
    culture: {currentCulture: cultures.enUS},
    changeCulture: (value) => {
        console.log('change to = ', value);
    }
});
export default CultureContext;
