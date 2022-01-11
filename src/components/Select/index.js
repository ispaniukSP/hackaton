import React from 'react'
import Select from 'react-select'
import * as Styled from './style'

export default function AppSelect(props) {
    const { config, chooseType } = props
    const options = config?.map((type, index) => ({
        "value": index+1,
        "label": type,
    }))
    return (
        <Styled.AppSelectContainer>
            <Select options={options} onChange={(item) => chooseType(item.label)}/>
        </Styled.AppSelectContainer>
    )
}
