export default class DeviceHelper {
    static isWechatBrowser() {
        return /MicroMessenger/i.test(navigator.userAgent)
    }
}
