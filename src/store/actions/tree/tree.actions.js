import treeType from './tree.type'

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