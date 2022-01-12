import treeType from './tree.type'
import data from '../../../data/data.json'

const treeRequest = () => ({
    type: treeType.TREE_LABELS_VALUE_REQUEST
})
const treeSuccess = (payload) => ({
    type: treeType.TREE_LABELS_VALUE_SUCCESS,
    payload: payload
})
const treeFailure = (error) => ({
    type: treeType.TREE_LABELS_VALUE_FAILURE,
    error: error
})

export const getAnalyticsForm = () => async dispatch => {
    try{
        dispatch(treeRequest())
        const labelTypes = [
            ...new Set(data[0].labels.map((label) => label.type))
        ]
        const result = labelTypes.map((label) => ({
                id: label,
                name: label
        }))
        for(let i=0; i < labelTypes.length; i++){
            const uniqueLabels = data[0].labels.filter((label) => label.type === labelTypes[i])
            const getUniqueWords = [
                ...new Set(
                    uniqueLabels.map((label) => label.value)
                )
            ]
            getUniqueWords.map((word) => {
                const resultValue = uniqueLabels.filter((label) => label.value === word).length
                result.push({
                        name: word, 
                        value: resultValue,
                        parent: labelTypes[i],
                        colorValue: resultValue,
                    })
            })
        }
        dispatch(treeSuccess(result));
    }catch(err){
        dispatch(treeFailure(err))
    }
}

const getTypeRequest = () => ({
    type: treeType.TREE_TYPES_REQUEST
})
const getTypeSuccess = (payload) => ({
type: treeType.TREE_TYPES_SUCCESS,
payload: payload
})
const getTypeFailure = (error) => ({
    type: treeType.TREE_TYPES_FAILURE,
    error: error
})

export const getTypes = () => async dispatch => {
    try{
        dispatch(getTypeRequest())
        
        dispatch(getTypeSuccess(getTypes))  
    }catch(err){
        dispatch(getTypeFailure(err))
    }
}