import React from "react";
import Resources from "./Resources";

export const cultures = {
    zhCN: ['zh-CN'],
    enUS: ['en-US'],
    getDefault: () => {
        let culture = 'en-US';

        let settings = JSON.parse(localStorage.getItem('settings'));
        if (settings.language !== undefined) {
            culture = settings.language[0];
        } else if (navigator && navigator.language && navigator.language === 'zh-CN') {
            culture = 'zh-CN';
        } else {
            culture = 'en-US';
        }

        if (culture === 'zh-CN') {
            Resources.setCulture(cultures.zhCN[0]);
            return cultures.zhCN;
        }

        Resources.setCulture(cultures.enUS[0])
        return cultures.enUS
    }
}

const CultureContext = React.createContext({
    culture: {currentCulture: cultures.getDefault()},
    changeCulture: (value) => {
        console.log('change to = ', value);
    }
});
export default CultureContext;
