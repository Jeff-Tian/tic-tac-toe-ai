import React from "react";
import {WhiteSpace} from "antd-mobile";

export default class SupportAuthor extends React.Component {
    render() {
        return <div onClick={SupportAuthor.tryToLoadAlipay}>
            <WhiteSpace size="lg"/>
            <img src={require('../Resources/images/alipay-receive-money.jpg')} alt="支付宝付款"
                 style={{maxWidth: '100%'}}/>
        </div>
    }

    static tryToLoadAlipay() {
        window.location.replace('alipayqr://platformapi/startapp?saId=10000007&qrcode=https%3A%2F%2Fraw.githubusercontent.com%2FJeff-Tian%2Ftic-tac-toe-ai%2Fmaster%2Fpublic%2Fimages%2Falipay-receive-money.jpg')
    }
}
