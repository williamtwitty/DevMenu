import axios from 'axios'

const initialState = {
    menu: []
}

const GET_MENU_TYPE = 'GET_MENU_TYPE'

export function getMenuType(type) {
    
   const menu = axios.get(`/api/${type}`).then( response => {
            return response.data
    })
    return {
        type: GET_MENU_TYPE,
        payload: menu
    }
}

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case GET_MENU_TYPE + '_FULFILLED':
            return Object.assign({}, state, {menu: action.payload})

        default:
            return state;
    }
}