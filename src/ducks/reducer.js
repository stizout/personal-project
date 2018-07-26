const initialState = {
    cart: [],
    user: [],
    orderNumber: ''

}

const GET_PRODUCTS = 'GET_PRODUCTS';
const LOGIN = 'LOGIN';
const ORDER_NUMBER = 'ORDER_NUMBER';

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_PRODUCTS:
            return {...state, cart: action.payload}
        case LOGIN:
            return {...state, user: action.payload}
        case ORDER_NUMBER:
            return {...state, orderNumber: action.payload}
        
        default: return state
    }
}

export function getCart(products) {
    return {
        type: GET_PRODUCTS,
        payload: products
    }
}

export function login(user) {
    return {
        type: LOGIN,
        payload: user
    }
}

export function orderNumber(num) {
    return {
        type: ORDER_NUMBER,
        payload: num
    }
}