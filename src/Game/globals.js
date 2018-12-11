import React from "react";
import {Checkbox, List} from "antd-mobile";

const CheckboxItem = Checkbox.CheckboxItem;


export const spotScoreMap = new Map();

export const GlobalSettings = {
    ...{
        learn: true,
        showAdvancedSettings: false,
        showLearningStatus: false
    },

    ...JSON.parse(localStorage.getItem('settings'))
};

export default class Settings extends React.Component {
    state = {...GlobalSettings}

    onChange = (key) => {
        GlobalSettings[key] = !GlobalSettings[key];
        this.setState({
            [key]: GlobalSettings[key]
        })

        localStorage.setItem('settings', JSON.stringify(GlobalSettings));
    }

    render() {
        return <div style={{textAlign: 'left'}}>
            <List renderHeader={() => '选项'}>
                {
                    Object.keys(GlobalSettings).map(k => {
                        return <CheckboxItem key={k} onChange={() => this.onChange(k)}
                                             checked={this.state[k]}>{k}</CheckboxItem>
                    })
                }
            </List>
        </div>
    }
}