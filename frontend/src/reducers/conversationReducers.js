import {
    LOAD_CONVERSATION_LIST,
    CONVERSATION_LIST_FAIL,

    LOAD_CONVERSATION_DETAIL,
    CONVERSATION_DETAIL_FAIL,

    LOAD_CONVERSATION_CHATS,
    CREATE_CONVERSATION,
    CONVERSATION_CHATS_FAIL,
    CREATE_CHAT

} from "../constants/conversationConstants"


export const chatsReducer = (state = { chats: []}, action) => {

    switch(action.type){

        case LOAD_CONVERSATION_CHATS:
            return { loading: false, chats: action.payload }

        case CONVERSATION_CHATS_FAIL:
            return { loading: false, error: action.payload, chats: state.chats }

        case CREATE_CHAT:
            return { loading: false, chats: [...state.chats, action.payload] }

        default:
            return state
    }

}
