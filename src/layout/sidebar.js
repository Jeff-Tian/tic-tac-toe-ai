import {List} from "antd-mobile";
import React from 'react';

export const sidebar = (<List>
    {[0, 1].map((i, index) => {
        if (index === 0) {
            return (<List.Item key={index}
                               thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
                               multipleLine
            >Category</List.Item>);
        }
        return (<List.Item key={index}
                           thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
        >Category{index}</List.Item>);
    })}
</List>);
