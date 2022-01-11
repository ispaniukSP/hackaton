import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppTree from '../../components/AppTree'
import AppButton from '../../components/Button'
import AppSelect from '../../components/Select'
import { getTypes, getTypesValues } from '../../store/actions/tree/tree.actions'
import * as Styled from './style'

export default function Home() {
    const [currentType, setCurrentType] = useState('')
    const dispatch = useDispatch()
    const tree = useSelector(state => state.tree)
    useEffect(() => {
        if(!tree.treeTypes){
            dispatch(getTypes())
            setCurrentType()
        }
    }, [tree.treeTypes])

    useEffect(() => {
        if(!tree.treeLabels && tree.treeTypes){
            dispatch(getTypesValues(tree?.treeTypes[0]))
        }
    }, [tree.treeLabels, tree.treeTypes])

    const findCount = () => {
        dispatch(getTypesValues(currentType))
    }
 
    return (     
            tree.loader ? null : (
            <Styled.HomeContainer>
                <div>
                    <AppTree options={tree.treeLabels} />
                </div>
                <AppSelect config={tree.treeTypes} chooseType={setCurrentType}/>
                <AppButton onClick={() => findCount()}>
                    Run
                </AppButton>
            </Styled.HomeContainer>)
    )
}
