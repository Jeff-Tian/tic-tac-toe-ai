import React from "react";
import {Checkbox, List} from "antd-mobile";
import CultureSelector from "./CultureSelector";
import Resources from "./Resources";

export const spotScoreMap = new Map();
const CheckboxItem = Checkbox.CheckboxItem;
let defaultSettings = {
    // learn: true,
    // showLearningStatus: false,
    language: ['en-US']
};
export const GlobalSettings = {
    ...defaultSettings,
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
            <List renderHeader={() => Resources.getCurrentCulture().settings}>
                {
                    Object.keys(GlobalSettings).map(k => {
                        if (typeof defaultSettings[k] === "boolean") {
                            return <CheckboxItem key={k} onChange={() => this.onChange(k)}
                                                 checked={this.state[k]}>{k}</CheckboxItem>
                        } else if (k === 'language') {
                            return <CultureSelector key={k} onChange={(value) => {
                                GlobalSettings.language = value;
                                this.setState({
                                    language: value
                                })
                                localStorage.setItem('settings', JSON.stringify(GlobalSettings))
                            }}/>
                        } else {
                            return null;
                        }
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
