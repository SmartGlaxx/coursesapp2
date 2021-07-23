import React from 'react'
import { useAppContext } from '../context'
import { makeStyles, TextField, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  body:{
    padding : "0rem 5%",
    width: "100%",
    height : "auto",
    width :"100vw",
    position: "fixed",
    top : "0",
    right : "0",
    bottom : "0",
    left : "0",
    background: "rgba( 0, 15, 69, 0.25 )",
    boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
    backdropFilter:" blur( 4px )",
    webkitBackdropFilter: "blur( 4px )",
    borderRadius: "10px",
    border: "1px solid rgba( 255, 255, 255, 0.18 )",
    zIndex: 13,
    [theme.breakpoints.down('xs')]:{
      padding : "0rem 1%",
    }

  },
}))

const Overlay = ()=>{
  const classes = useStyles()
  const {setWarningModal2, setOverlay,setSidebarOpen, 
    setCloseUpdateModal, setShowShopValue, setModal, handleClose,
  setUpdateProductModal} = useAppContext()

    return <>
   <div onClick={()=>{setUpdateProductModal(false, null, null, null, null)}}>
    <div onClick={()=>setModal(false)} >
    <div onClick={handleClose}>
    <div onClick={setCloseUpdateModal}>
    <div onClick={()=>setWarningModal2(false)}>
      <div onClick={()=>setSidebarOpen(false)}>
        <div onClick={()=>setOverlay(false)} className={classes.body} >
        </div>
      </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </>
}


export default Overlay