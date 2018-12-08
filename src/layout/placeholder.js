import React from 'react';

export const PlaceHolder = ({className = '', ...restProps}) => (
    <div className={`${className} placeholder`} {...restProps}>Block</div>
);