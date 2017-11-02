import axios from 'axios'

const initialState = {
    menu: [],
    checkByTable: [],
    tableNumber: 0
}

const GET_MENU_TYPE = 'GET_MENU_TYPE'
const GET_CHECK_BY_TABLE = 'GET_CHECK_BY_TABLE'
const SELECT_TABLE_NUMBER = 'SELECT_TABLE_NUMBER'
const NEW_ORDER = 'NEW_ORDER'


export function getMenuType(type) {
   const menu = axios.get(`/api/${type}`).then( response => {
            return response.data
    })
    return {
        type: GET_MENU_TYPE,
        payload: menu
    }
}

export function selectTableNumber(table) {
    return {
        type: SELECT_TABLE_NUMBER,
        payload: table
    }
}

export function getCheckByTable(table) {
   const checkByTable = axios.get(`/api/checkout/${table}`).then( response => {
            return response.data
    })
    return {
        type: GET_CHECK_BY_TABLE,
        payload: checkByTable
    }
}

export function newOrder(id, tableNumber) {
    const newOrder = axios.post(`/api/neworder/`, id, tableNumber).then( response => {
     })
     return {
         type: NEW_ORDER,
         payload: newOrder
     }
 }


export default function reducer(state=initialState, action) {
    switch (action.type) {
        case GET_MENU_TYPE + '_FULFILLED':
            return Object.assign({}, state, {menu: action.payload})
        case GET_CHECK_BY_TABLE + '_FULFILLED':
            return Object.assign({}, state, {checkByTable: action.payload})
        case SELECT_TABLE_NUMBER:
            return Object.assign({}, state, { tableNumber: action.payload})
        default:
            return state;
    }
}