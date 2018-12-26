import React from "react";
import {GlobalSettings} from "./Settings";
import {Flex} from "antd-mobile";

export default class LearningStatus extends React.Component {
    render() {
        return GlobalSettings.showLearningStatus ? <Flex wrap="wrap">
            <div>{this.props.state.OWeights.map(w => w.toFixed(2)).join(', ')}</div>
            <div style={{wordBreak: 'break-word'}}>{JSON.stringify(this.props.state.strategy)}</div>
        </Flex> : null
    }
}
