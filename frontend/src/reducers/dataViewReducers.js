import {
    LOAD_DATAPAD,
    CLEAN_DATAPAD,
    SPLIT_DATAPAD,
    DATAPAD_ERROR

} from "../constants/dataviewConstants"


 export const datapadReducer = (state = { datapadPages : [], datapadChunks : []}, action) => {

    switch(action.type){

        case LOAD_DATAPAD:
            return { loading: false, datapadPages: action.payload.pages, datapadChunks: action.payload.chunks }

        case CLEAN_DATAPAD:
            return { loading: false, datapadPages: action.payload.pages, datapadChunks: action.payload.chunks }

        case SPLIT_DATAPAD:
            return { loading: false, datapadPages: action.payload.pages, datapadChunks: action.payload.chunks }

        case DATAPAD_ERROR:
            return { loading: false, error: action.payload, datapadPages: state.pages, datapadChunks: state.chunks }

        default:
            return state
    }

}

