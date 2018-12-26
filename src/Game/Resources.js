let resources;

export default class Resources {
    static setCulture(culture) {
        try {
            resources = require(`../Resources/${culture}`);
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
}
