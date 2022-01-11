import treeType from "../../actions/tree/tree.type"

const initialState = {
    treeLabels: null,
    treeTypes: null,
    loader: null,
    error: null
}

export default (state=initialState, {type, payload, ...action}) => {
    switch(type){
        case treeType.TREE_LABELS_VALUE_REQUEST:
            return {...state, loader: true, treeLabels: null}
        case treeType.TREE_LABELS_VALUE_SUCCESS:
            return {...state, loader: false, treeLabels: payload}
        case treeType.TREE_LABELS_VALUE_FAILURE:
            return {...state, loader: true, error: payload}
        case treeType.TREE_TYPES_REQUEST:
            return {...state, loader: true, treeTypes: null}
        case treeType.TREE_TYPES_SUCCESS:
            return {...state, loader: false, treeTypes: payload}
        case treeType.TREE_TYPES_FAILURE:
            return {...state, loader: false, error: payload}
        default:
            return state
    }
}