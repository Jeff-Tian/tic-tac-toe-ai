import React from "react";
import {WhiteSpace} from "antd-mobile";

export default class AlipayRedPackage extends React.Component {
    render() {
        return <div onClick={AlipayRedPackage.tryToLoadAlipay}>
            <WhiteSpace size="lg"/>
            <img src={require('../Resources/images/alipay-red-package.png')} alt="支付宝红包"
                 style={{maxWidth: '100%'}}/>
        </div>
    }

    static tryToLoadAlipay() {
        window.location.replace('alipayqr://platformapi/startapp?saId=10000007&qrcode=https%3A%2F%2Fjeff-tian.github.io%2Ftic-tac-toe-ai%2Fstatic%2Fmedia%2Falipay-red-package.5cd76bdb.png')
    }
}
