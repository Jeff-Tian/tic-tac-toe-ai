import React from "react";
import {Checkbox, List} from "antd-mobile";

const CheckboxItem = Checkbox.CheckboxItem;


export const spotScoreMap = new Map();

export const GlobalSettings = {
    ...{
        learn: true,
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
            <div>
                <div>Icons made by <a href="https://www.freepik.com/" title="Freepik"
                                      rel="noopener noreferrer">Freepik</a> from <a
                    href="https://www.flaticon.com/" title="Flaticon" rel="noopener noreferrer"
                    target="_blank">www.flaticon.com</a> is licensed by <a
                    href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank"
                    rel="noopener noreferrer">CC
                    3.0 BY</a></div>
            </div>
        </div>
    }
}