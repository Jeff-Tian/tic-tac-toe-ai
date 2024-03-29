import {Button, Flex, Modal} from "antd-mobile";
import React from "react";
import './result.css';

export default class Result extends React.Component {
    state = {showRedPackageModal: false}
    comfortPlayer = () => {
        this.setState({
            showRedPackageModal: true
        })
    }

    onClose = () => {
        this.setState({
            showRedPackageModal: false
        })
    }

    render() {
        return <div>

            <Modal
                visible={this.state.showRedPackageModal}
                transparent
                maskClosable={false}
                title="拿红包来拯救你"
                footer={[{
                    text: '领过了，开心多啦！', onPress: () => {
                        this.onClose();
                    }
                }]}
            >
                <img src={require('../Resources/images/alipay-red-package.png')} alt="支付宝红包"
                     style={{maxWidth: '100%'}}/>
            </Modal>

            {
                this.props.winnerInfo.who === 'X' &&
                <Flex>
                    <Flex.Item>
                        <Button>竟然赢了，不可思议！</Button>
                    </Flex.Item>
                </Flex>
            }
            {
                this.props.winnerInfo.who === 'O' &&
                <Flex>
                    <Flex.Item>
                        <Button icon={<img src={require('../icons/crying.svg')} alt=""/>}
                                onClick={this.comfortPlayer}>输掉了，不开心。</Button>
                    </Flex.Item>
                </Flex>
            }
        </div>
    }
}
