let resources;

export default class Resources {
    static setCulture(culture) {
        try {
            resources = require(`../Resources/${culture}`);
        } catch (ex) {
            resources = require(`../Resources/zh-CN`);
        }
    }

    static getInstance() {
        if (!resources) {
            Resources.setCulture('zh-CN');
        }

        return resources;
    }
}