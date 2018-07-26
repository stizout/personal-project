const initialState = {
    cart: [],
    user: [],

}

const GET_PRODUCTS = 'GET_PRODUCTS'
const LOGIN = 'LOGIN'

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_PRODUCTS:
            return {...state, cart: action.payload}
        case LOGIN:
            return {...state, user: action.payload}
        
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