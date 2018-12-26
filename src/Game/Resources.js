import EnUS from "../Resources/en-US";
import ZhCN from "../Resources/zh-CN";

let resources;
let currentCulture;

export default class Resources {
    static setCulture(culture) {
        try {
            resources = require(`../Resources/${culture}`);

            if (culture === 'zh-CN') {
                currentCulture = ZhCN;
            } else {
                currentCulture = EnUS;
            }

            return [culture];
        } catch (ex) {
            resources = require(`../Resources/zh-CN`);
            return ['en-US']
        }
    }

    static getInstance() {
        if (!resources) {
            Resources.setCulture('en-US');
        }

        return resources;
    }

    static getCurrentCulture() {
        return currentCulture || EnUS
    }
}
