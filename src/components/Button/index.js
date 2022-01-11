import React from 'react'
import * as Styled from './style'

export default function AppButton(props) {
    const { children, ...dataProps } = props;

    return (
        <Styled.AppButtonConatiner {...dataProps}>
            {children}
        </Styled.AppButtonConatiner>
    )
}
