import React, { useEffect, useReducer } from 'react'
import reducer from './reducer'


const getStoredItems = ()=>{
    if(localStorage.getItem('storedCartItems')){
        const cartItemsStored = localStorage.getItem('storedCartItems')
        
        return JSON.parse(cartItemsStored)
    }else{
        return []
    }
} 

const cartStorage = getStoredItems()
const AppContext = React.createContext()
const initialState = {
    openModal : false,
    overlayOpen : false,
    openUpdateModal : false,
    sidebarOpen : false,
    modalOpen : false,
    updateId : '',
    updateName : "",
    cartItemId : '',
    cart : cartStorage,
    itemExists : false,
    user : {},
    searchResult : [],
    updateProductValues : {
        bool : false,
        id :"",
        name : "", 
        description : "",
        price : 0
    }

}
export const AppProvider=({children})=>{
    const [state, dispatch] = useReducer(reducer, initialState)


    const setModal=(value)=>{
        dispatch({type : "SET_MODAL", payload : value})
    }

    const setUpdateModal =(value, id, name)=>{
        dispatch({type : "SET_UPDATE_MODAL", payload : {value, id, name}})
    }

    const setUpdateName =(name)=>{
        dispatch({type : "SET_UPDATE_NAME", payload : name})

    }

    const setCloseUpdateModal = ()=>{
        dispatch({type : 'CLOSE_UPDATE_MODAL', payload : false})
    }

    const addToCart = (product)=>{ 

        if(state.cart.length == 0){
                dispatch({type : "SET_CART_ITEM", payload : product})
        }else{
             const nfound = state.cart.find(item => item.id  == product.id)
             if(nfound){
                 dispatch({type : "ITEM_ALREADY_EXISTS"})
             }else{
                 dispatch({type : "SET_CART_ITEM", payload : product})
             }
        }        
    }
    
    const removeCartItem = (id)=>{
        dispatch({type : "REMOVE_CART_ITEM", payload : id})
    }

    const setUserInfo = (username)=>{
        dispatch({type : "SET_SHOP_OWNER", payload : username})
    }

    const setCartEmpty = ()=>{
        dispatch({type : "SET_CART_EMPTY"})
    }

    const setSearchResultValue =(searchResult)=>{
        dispatch({type:"SET_SEARCH_RESULT", payload: searchResult})
        
    }

    const setWarningModal =(val)=>{
        dispatch({type: "SET_WARNING_MODAL", payload:val })
    }
    const setWarningModal2 =(val)=>{
        dispatch({type: "SET_WARNING_MODAL2", payload:val })
    }

    const setUpdateProductModal =(val, id, name, description, price)=>{
        dispatch({type : "SET_UPDATE_PRODUCT_VALUES", payload : {val, id, name, description, price}})
    }                                                   

    const setCloseProductUpdateModal =()=>{
       dispatch({type:"CLOSE_PRODUCTUPDATE_MODAL"})
    }
    const setSidebarOpen = (value)=>{
       dispatch({type : "SET_SIDEBAR_OPEN", payload : value})
    }
    const setOverlay =(valu)=>{
       dispatch({type :"SET_OVERLAY", payload: valu})
    }
    const handleOpen = () => {
        dispatch({type :"SET_OPEN", payload: true})
    };

    const handleClose = () => {
        dispatch({type :"SET_CLOSE", payload: false})
    };

    useEffect(()=>{
        const storedCartItems = state.cart
        localStorage.setItem('storedCartItems', JSON.stringify(storedCartItems))
    },[state.cart])

    return <AppContext.Provider value={{
        ...state, setModal, setUpdateModal, setUpdateName, setCloseUpdateModal,
        addToCart, removeCartItem, setUserInfo, setCartEmpty, setSearchResultValue,
        setWarningModal, setWarningModal2, setUpdateProductModal, setCloseProductUpdateModal,
        setSidebarOpen, setOverlay, handleOpen, handleClose
            }}>
        {children}
    </AppContext.Provider>
}


export const useAppContext=()=>{
    return  React.useContext(AppContext)
}