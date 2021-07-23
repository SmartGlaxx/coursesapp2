import React, { useState, useEffect } from 'react';
import { makeStyles, TextField, Button } from '@material-ui/core';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import {getShop} from '../graphql/queries'
import {updateShop} from '../graphql/mutations'
// import {Link} from 'react-router-dom'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {Typography, Fab} from '@material-ui/core';
import { useAppContext } from '../context'; 
import {createShop} from '../graphql/mutations'
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    btn6 :{
      background : 'rgba(255, 0, 0, 0.25)',
      fontSize :"0.8rem",
      backdropFilter: "blur( 4px )",
      webkitBackdropFilter: "blur( 4px )",
      borderRadius: "3px",
      border: "1px solid rgba( 255, 255, 255, 0.18 )",
     },
    btn5 :{
        background : 'rgba(0, 245, 212, 0.25)',
        fontSize :"0.8rem",
        backdropFilter: "blur( 4px )",
        webkitBackdropFilter: "blur( 4px )",
        borderRadius: "3px",
        border: "1px solid rgba( 255, 255, 255, 0.18 )",
    },
    btnBox:{
      display : "flex",
      justifyContent : 'space-between'
    },
    editLabel:{
      margin : "0.5rem"
    },
    // updateForm:{
    //   position: "fixed", 
    //   top: "30vh", 
    //   left : "50vw", 
    //   transform :"translateY(-50%)", 
    //   transform :"translateX(-50%)", 
    //   zIndex : "15",
    //   padding : "2rem"
    // },
  outer:{
    width :"100%",
    height:  "auto",
    zIndex : "15",
    position : "relative"
  },
  inner:{
    position: "fixed",
    top: "20%",
    left : "50%",
    zIndex : "15",
    transform : "translate(-50%)",
    background : "#fff",
    width : "17rem"
  },
    checkBtn:{
      position: "absolute",
      right : "2rem",
      bottom: "2rem"
    },
    closeBtn:{
      position: "absolute",
      left : "2rem",
      bottom: "2rem"
    }
  }));

const UpdateShop = ({openUpdate , id})=>{    
  const {setUpdateModal, openUpdateModal, updateId,
   updateName, setUpdateName, setCloseUpdateModal, setOverlay} = useAppContext()
    const [shopName, setShopName] = useState('')
    const classes = useStyles();
    
 


    useEffect(()=>{
      setShopName(updateName)
    },[updateName])
     
     const updateProductName = async()=>{
      const input = {
        id : id,
        name : updateName
      }
      const newUpdate = await API.graphql(graphqlOperation(updateShop, {input}))
      setCloseUpdateModal()

     }
    
      const getShopFunc = async()=>{
        const input = {
          id : id,
          name : shopName
        }
        const shopUpdated =  await API.graphql(graphqlOperation(updateShop, input))
        }
      getShopFunc()
    const checked = openUpdateModal && (updateId === id)

    return(<div >
           
      { checked && <div className={classes.outer}><div className={classes.inner}>

            <form className='addshopform3' noValidate autoComplete="off">
           <TextField id="outlined-basic" label="Product Name" 
            variant="outlined" name='name' className={classes.textInput}
            value={updateName}
            onChange={(e)=>setUpdateName(e.target.value)}
            /> 
            <br />
            
            <div className={classes.btnBox}>
            <span onClick={()=>{setOverlay(false)}}>
            <Fab variant="contained"
            className={classes.closeBtn}
            size="small" color='secondary'
            onClick={setCloseUpdateModal}
            ><CloseIcon /></Fab>
            </span>
            <span onClick={setCloseUpdateModal}>
              <span onClick={()=>{setOverlay(false)}}>
              <Fab variant="contained"
              className={classes.checkBtn}
              size="small" color='primary'
              onClick={updateProductName}
              ><CheckIcon /></Fab>
              </span>
            </span>
            </div>
            </form>
          </div>
        </div>}
        </div>
    )
}


export default UpdateShop