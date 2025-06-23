import {
    QUERY_LLM,
    QUERY_LLM_CLEAR,
    QUERY_LLM_ERROR

} from "../constants/llmConstants"


 export const llmReducer = (state = { chats : []}, action) => {

    switch(action.type){

        case QUERY_LLM:
            return { loading: false, chats: [action.payload.llm_response,...state.chats] }

        case QUERY_LLM_CLEAR:
            return { loading: false, chats: []}

        case QUERY_LLM_ERROR:
            return { loading: false, error: action.payload, chats: state.chats }


        default:
            return state
    }

}

