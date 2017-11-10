import axios from 'axios'
import io from 'socket.io-client';
const socket = io('http://localhost:3030');

const initialState = {
    menu: [],
    checkByTable: [],
    tableNumber: 0,
    adminOrders: [],
    newOrder: [],
    completeOrder: [],
    adminMessages: [],
    tableMessages: []
}

const GET_MENU_TYPE = 'GET_MENU_TYPE'
const GET_CHECK_BY_TABLE = 'GET_CHECK_BY_TABLE'
const SELECT_TABLE_NUMBER = 'SELECT_TABLE_NUMBER'
const NEW_ORDER = 'NEW_ORDER'
const COMPLETED_ORDER = 'COMPLETED_ORDER'
const GET_ADMIN_ORDERS = 'GET_ADMIN_ORDERS'
const DELETE_ITEM = 'DELETE_ITEM'
const SEND_NEW_MESSAGE = 'SEND_NEW_MESSAGE'
const GET_ADMIN_MESSAGES = 'GET_ADMIN_MESSAGES'
const GET_TABLE_MESSAGES = 'GET_TABLE_MESSAGES'

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
    socket.emit('new customer',table)
    return {
        type: SELECT_TABLE_NUMBER,
        payload: table
    }
}

export function getCheckByTable(table) {
    
   const checkByTable = axios.get(`/checkout/${table}`).then( response => {
            return response.data
    })
    return {
        type: GET_CHECK_BY_TABLE,
        payload: checkByTable
    }
}

export function newOrder(id, tableNumber) {
        socket.emit('new order', tableNumber)
    const newOrder = axios.post(`/api/neworder/`, {id, tableNumber}).then( response => {
        return response.data
     })
     return {
         type: NEW_ORDER,
         payload: newOrder
     }
 }

 export function completedOrder(tableNumber) {
     socket.emit('completed tables order', tableNumber)
    // console.log('completedReducer', {tableNumber} )
    const completedOrder = axios.patch(`/api/completed/`, {tableNumber}).then( response => {
        //console.log('completedOrder response', response.data);
        return response.data
     })
     return {
         type: COMPLETED_ORDER,
         payload: completedOrder
     }
 }
 
 export function getAdminOrders() {
    const adminOrders = axios.get('/allorders').then( response => {
             return response.data
     })
     return {
         type: GET_ADMIN_ORDERS,
         payload: adminOrders
     }
 }

 export function deleteItem(id, table){
     const deleteItem = axios.delete(`/api/delete/${id}/${table}`).then(response => {
         return response.data
     }) 

     return {
         type: DELETE_ITEM,
         payload: deleteItem
     }
 }

 export function sendNewMessage(msg, tableNumber) {
    // socket.emit('new message',tableNumber, msg)
const tableMessages = axios.post(`/api/newMessage/`, {tableNumber, msg}).then( response => {
    socket.emit('new message', response.data)
    return response.data
 })
 return {
     type: SEND_NEW_MESSAGE,
     payload: tableMessages
 }
}

export function getTableMessages(table) {
    const tableMessages = axios.get(`/tablemessages/${table}`).then( response => {
             return response.data
     })
     return {
         type: GET_TABLE_MESSAGES,
         payload: tableMessages
     }
 }

export function getAdminMessages() {
    const adminMessages = axios.get('/adminmessages').then( response => {
             return response.data
     })
     return {
         type: GET_ADMIN_MESSAGES,
         payload: adminMessages
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
        case GET_ADMIN_ORDERS + '_FULFILLED':
            return Object.assign({}, state, {adminOrders: action.payload})
        case NEW_ORDER + '_FULFILLED':
            return Object.assign({}, state, { newOrder: action.payload})
        case COMPLETED_ORDER + '_FULFILLED':
            return Object.assign({}, state, {completedOrder: action.payload})
        case DELETE_ITEM + '_FULFILLED':
            return Object.assign({}, state, {checkByTable: action.payload})
        case SEND_NEW_MESSAGE + '_FULFILLED':
            return Object.assign({}, state, { tableMessages: action.payload})
        case GET_ADMIN_MESSAGES + '_FULFILLED':
            return Object.assign({}, state, {adminMessages: action.payload})
        case GET_TABLE_MESSAGES + '_FULFILLED':
            return Object.assign({}, state, {tableMessages: action.payload})

        default:
            return state;
    }
}