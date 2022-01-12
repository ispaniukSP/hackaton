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

export const getTypesValues = (getType) => async dispatch => {
    try{
        dispatch(treeRequest())
        const keywordsArr = data[0].labels.filter((label) => label.type === getType)
            const wordsArr = keywordsArr.map((label) => label.value);
            const getUniqueWords = new Set([...wordsArr])   
            const result = Array.from(getUniqueWords).map((word) => {
                    const resultValue = keywordsArr.filter((label) => label.value === word).length
                    return{
                        name: word, 
                        value: resultValue,
                    }
                })
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
        const getTypes = [...new Set(data[0].labels.map((label) => label.type))]  
        dispatch(getTypeSuccess(getTypes))  
    }catch(err){
        dispatch(getTypeFailure(err))
    }
}