const reducer = (state, action)=>{
    switch(action.type){
        case "SET_MODAL":
            return {...state, openModal : action.payload}
        case "SET_OVERLAY":
            return {...state, overlayOpen : action.payload}
        case "SET_UPDATE_MODAL":
            return {...state, openUpdateModal : action.payload.value, updateId :  action.payload.id, updateName : action.payload.name}         
        case "SET_UPDATE_NAME":
            return {...state, updateName : action.payload}         
        case "CLOSE_UPDATE_MODAL":
            return {...state, openUpdateModal : action.payload}         
        case "SET_CART_ITEM":
             let cartList = [...state.cart]
             cartList.push(action.payload)            
             return {...state, cart : cartList}      
        case "ITEM_ALREADY_EXISTS":
            return {...state, itemExists: true}
        case "REMOVE_CART_ITEM":
            const id = action.payload
            const removedItemId = id
            const otherItems = state.cart.filter(item => item.id !== id)
            return {...state, cart : otherItems}   
        case 'SET_SHOP_OWNER':
            return  {...state, user: action.payload }
        case 'SET_CART_EMPTY':
            const emptyCart = []
            return  {...state, cart: emptyCart }
        case 'SET_SEARCH_RESULT':
            return {...state, searchResult : action.payload}
        case "SET_WARNING_MODAL":
            return {...state, itemExists : action.payload}
        case "SET_WARNING_MODAL2":
            return {...state, itemExists : action.payload}
        case "SET_UPDATE_PRODUCT_VALUES":
            return {...state, 
                updateProductValues : {bool : action.payload.val, id : action.payload.id, 
                    name : action.payload.name, description :action.payload.description, 
                    price: action.payload.price}}
        case "CLOSE_PRODUCTUPDATE_MODAL":
            return {...state, ...state.updateProductValues, updateProductValues : {bool : false}}
        case "SET_SIDEBAR_OPEN" : 
            return {...state, sidebarOpen : action.payload}
        case "SET_CLOSE" : 
            return {...state, modalOpen : action.payload}
        case "SET_OPEN" : 
            return {...state, modalOpen : action.payload}

        default :
            return
    }
}

export default reducer
