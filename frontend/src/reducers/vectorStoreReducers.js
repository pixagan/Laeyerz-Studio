import {
    SEARCH_VECTOR_STORE,
    SEARCH_VECTOR_STORE_CLEAR,
    SEARCH_VECTOR_STORE_ERROR

} from "../constants/vectorStoreConstants"


 export const vectorStoreSearchReducer = (state = { vectorStoreResults : []}, action) => {

    switch(action.type){

        case SEARCH_VECTOR_STORE:
            return { loading: false, vectorStoreResults: action.payload.response }

        case SEARCH_VECTOR_STORE_CLEAR:
            return { loading: false, vectorStoreResults: []}

        case SEARCH_VECTOR_STORE_ERROR:
            return { loading: false, error: action.payload, vectorStoreResults: state.vectorStoreResults }


        default:
            return state
    }

}

