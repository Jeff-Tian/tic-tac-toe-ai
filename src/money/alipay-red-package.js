import React from "react";
import {WhiteSpace} from "antd-mobile";

export default class AlipayRedPackage extends React.Component {
    render() {
        return <div>
            <WhiteSpace size="lg"/>
            <img src={require('../Resources/images/alipay-red-package.png')} alt="支付宝红包"
                 style={{maxWidth: '100%'}}/>
        </div>
    }
}
