import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit';

import { chatsReducer } from './reducers/conversationReducers'

import { datapadReducer } from './reducers/dataViewReducers'
import { vectorStoreSearchReducer } from './reducers/vectorStoreReducers'
import { llmReducer } from './reducers/llmReducers'

const reducer = combineReducers({

    chatsR: chatsReducer,
    datapadR: datapadReducer,
    vectorStoreSearchR: vectorStoreSearchReducer,
    llmR: llmReducer

})


const store = configureStore({reducer:reducer}); //, devTools);


export default store