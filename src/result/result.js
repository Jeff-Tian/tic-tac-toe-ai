import {Button, Flex} from "antd-mobile";
import React from "react";

export default class Result extends React.Component {
    comfortPlayer = () => {
    }

    render() {
        return <div>
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
                        <Button onClick={this.comfortPlayer}>输掉了，不开心。</Button>
                    </Flex.Item>
                </Flex>
            }
        </div>
    }
}