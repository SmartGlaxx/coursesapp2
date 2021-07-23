import React from 'react'
import { makeStyles, TextField, Button } from '@material-ui/core';
import { useAppContext } from '../context'
import CloseIcon from '@material-ui/icons/Close';
import {Link} from 'react-router-dom'
import {Typography, Fab} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  body:{
        marginTop: "0",
        width: "100%",
        minHeight  : "100vh",
        textAlign: 'center',
        background: "none",
        display : "flex",
        justifyContent : "center",
        fontSize : "1rem",
        fontWeight : "600",
        zIndex : "15"
    },
    warningBox:{
        position: "fixed",
        display : "grid",
        placeItems : "center",
        marginTop:"5rem",
        width: "50%",
        height : "50%",
        zIndex : "16",
        background: "",
        [theme.breakpoints.down('xs')]:{
          width: "90%",
        }
    },
    btn12:{
      // background : 'rgba(255, 0, 0, 0.25)',
      // fontSize :"0.8rem",
      // backdropFilter: "blur( 4px )",
      // webkitBackdropFilter: "blur( 4px )",
      // borderRadius: "3px",
      // border: "1px solid rgba( 255, 255, 255, 0.18 )",
      position : "absolute",
      right: "3rem",
      bottom: "0",
      cursor : "pointer",
      zIndex : "16",
  },
  continue:{
    zIndex: "16"
  },
  link:{

  }
 })
)

const WarningModal = ()=>{
    const {setWarningModal} = useAppContext()
    const classes = useStyles()

    return <div className={classes.body}>
    <Typography className ={classes.warningBox}>
      <div>
        <div>Item already added to cart </div>
        <Button color = 'primary' variant='text' className={classes.continue} onClick={()=>setWarningModal(false)} >
            <Link to='/' className={classes.link}>Continue shopping</Link>
        </Button>
       <Fab size='small' color = 'secondary' variant='text' onClick={()=>setWarningModal(false)} 
       className={classes.btn12}>
       <CloseIcon /></Fab>
       </div>
    </Typography>
    </div>
}

export default WarningModal