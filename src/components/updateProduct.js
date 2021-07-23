import React, { useState, useEffect } from 'react';
import { makeStyles, TextField, Button } from '@material-ui/core';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import {getShop} from '../graphql/queries'
import {updateProduct} from '../graphql/mutations'
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import {Typography, Fab} from '@material-ui/core';
import Fade from '@material-ui/core/Fade';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { useAppContext } from '../context'; 
import {createShop} from '../graphql/mutations'


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
    btn16 :{
      // background : 'rgba(0, 245, 212, 0.25)',
      // fontSize :"0.8rem",
      // backdropFilter: "blur( 4px )",
      // webkitBackdropFilter: "blur( 4px )",
      // borderRadius: "3px",
      // border: "1px solid rgba( 255, 255, 255, 0.18 )",
     },
    btn15 :{
        // background : 'rgba(255, 0, 0, 0.25)',
        // fontSize :"0.8rem",
        // backdropFilter: "blur( 4px )",
        // webkitBackdropFilter: "blur( 4px )",
        // borderRadius: "3px",
        // border: "1px solid rgba( 255, 255, 255, 0.18 )",
        // position: "absolute",
        // right : "0"
    },
    btnBox:{
      display : "flex",
      justifyContent : 'space-between',
      position: "relative",
      // left : "0"
      width: "100%",
      
    },
    // textInput:{
    //   width : "15rem",
    //   position: "relative"
    // },
    // TextField:{
    //   width : "15rem",
    //   position: "relative"
    // },
    numberInput:{
      width : "100%",
      marginBottom : '1rem',
      padding : "0.3rem 0",
      outline : "navy",
      border : "1px solid lightgray"
    },
    outer:{
      width :"100%",
      height:  "auto",
      zIndex : "15",
      position : "absolute",
    },
    inner:{
      position: "fixed",
      top: "20%",
      left : "50%",
      zIndex : "15",
      transform : "translate(-50%)",
      background : "#fff",
      width : "17rem",
    },
  }));

const UpdateProduct = ({openUpdate , id})=>{    
  const {updateProductValues, setCloseProductUpdateModal, setOverlay} = useAppContext()
  const {id : updateId, bool, name, description, price} = updateProductValues
  const [updateName, setUpdateName] = useState('')
  const [updateDesc, setUpdateDesc] = useState('')
  const [updatePrice, setUpdatePrice] = useState('')
  // const [updateBool, setUpdateBool] = useState('')
    const classes = useStyles();
    
 
 // console.log('updateBool in file page',updateBool)


    useEffect(()=>{
      setUpdateName(name)
      setUpdateDesc(description)
      setUpdatePrice(price)
      // setUpdateBool(bool)
    },[name, description, price])
     
     const updateProductName = async()=>{
      const input = {
        id : id,
        name : updateName,
        description : updateDesc,
        price : updatePrice
      }
      const newUpdate = await API.graphql(graphqlOperation(updateProduct, {input}))
      setCloseProductUpdateModal()

     }
    
    const checked = bool && (updateId === id)
    return(<div>
      { checked && <div className={classes.outer}><div className={classes.inner}>
            <form  className='addshopform2'  noValidate autoComplete="off">
            <TextField id="outlined-basic" label="Course Title" 
            variant="outlined" name='name' className={classes.textInput}
            value={updateName}
            onChange={(e)=>setUpdateName(e.target.value)}
            /> 
            <br />
            <br />
            <TextField
            id="outlined-textarea"
            label="Course Description"
            placeholder="Placeholder"
            className={classes.TextField}
            multiline
            rows={4}
            variant="outlined"
            value={updateDesc}
            onChange={(e)=>setUpdateDesc(e.target.value)}
            />
            <br />
            <br />
            <input type='number'  name='productPrice'
            className={classes.numberInput}
            value={updatePrice} 
            onChange={(e)=>setUpdatePrice(e.target.value)}
            />
            <br />
            <br />
            <div className={classes.btnBox}>
            <span onClick={()=>setOverlay(false)}>
            <Fab variant="contained"
            size="small" color='secondary'
            className={classes.btn15}
            onClick={setCloseProductUpdateModal}
            ><CloseIcon /></Fab>
            </span>
            <span onClick={()=>setOverlay(false)}>
            <Fab variant="contained"
            className={classes.btn16}
            size="small" color ='primary'
            onClick={updateProductName}
            ><CheckIcon /></Fab>
            </span>
            </div>
            </form>

          </div>
        </div>}
        </div>
    )
}


export default UpdateProduct