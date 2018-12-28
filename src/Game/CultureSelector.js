import React from 'react';
import Resources from './Resources';
import {Picker, List} from "antd-mobile";
import CultureContext from './CultureContext'

export default class CultureSelector
    extends React.Component {

    render() {
        const languages = [
            {
                value: 'zh-CN',
                label: '中文',
            },
            {
                value: 'en-US',
                label: 'English',
            }
        ]

        return <CultureContext.Consumer>
            {({culture, changeCulture}) => (
                <Picker data={languages} onChange={(value) => {
                    changeCulture(value)

                    typeof this.props.onChange === 'function' && this.props.onChange(value)
                }} cols={1}
                        value={culture.currentCulture}>
                    <List.Item arrow="horizontal">{Resources.getInstance().chooseLanguage}</List.Item>
                </Picker>
            )}
        </CultureContext.Consumer>
    }

}
