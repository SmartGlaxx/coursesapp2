import React, { useState, useEffect } from 'react';
import { makeStyles, TextField, Button } from '@material-ui/core';
import {Link} from 'react-router-dom'
import {Capitalize} from '../utils'
import {Grid, Paper} from '@material-ui/core/'
import logo from "../assets/logo.png"
import applogo from "../assets/appstore.png"

const useStyles = makeStyles((theme) => ({
    body:{
      background: 'linear-gradient(145deg, #000080, red)',
      fontWeight : "600",
      padding: '3% 10%',
      paddingBottom : '4rem',
      fontSize: "1.4rem",
      marginTop: "2rem",
      position : "relative",
      width : 'auto',
      height : "auto",
      fontSize : '0.8rem',
      textAlign : "center",
      color : "#88a",
      zIndex : "9",
       },
      inner2:{
        display: "grid"
      },
      inner: {
           display: "flex",
      },
      dv:{
        textAlign: "center",
        padding : "1rem"
      },
      logo:{
        width: "10rem"
      },
      ulList:{
        listStyleType : "none"
      },
      copy:{
        marginTop : "-5rem"
      },
      applogo:{
        width: "100%",
        background: "rgba(230,230, 255, 0.9)"
      }
    }))


const Footer = ()=>{
    const classes = useStyles()

    return <Grid container className={classes.body} >
        <Grid className={classes.dv} xs={12} sm={4} md={3} lg={3} item>
            <div>
                <img src={logo} alt='logo' className={classes.logo}/>
                <p>
                    adipiscing elit. Aliquam sodales urna orci, id pelle
                </p>
            </div>
         </Grid>
        <Grid className={classes.dv} xs={12} sm={4} md={3} lg={3} item>
            <p>
                adipiscing elit. Aliquam sodales urna orci, id pelle,  urna orci, id pelle
            </p>
            <p>
                adipiscing elit. Aliquam sodales urna orci, id pelle,
                adipiscing elit. Aliquam sodales urna orci, id pelle,  
                adipiscing elit. Aliquam sodales urna orci, id pelle,  
            </p>
        </Grid>
        <Grid className={classes.dv} xs={12} sm={4} md={3} lg={3} item>
             <p>
                adipiscing elit. Aliquam sodales urna orci, id pelle,
                adipiscing elit. Aliquam sodales urna orci, id pelle,  
                adipiscing elit. Aliquam sodales urna orci, id pelle,  
            </p>
            <p className={classes.applogo}>
                 <img src={applogo} alt='logo' className={classes.logo}/>
            </p>
        </Grid>
        <Grid className={classes.dv} xs={12} sm={4} md={3} lg={3} item>
            <p>
                adipiscing elit. Aliquam sodales urna orci, id pelle
            </p>
            <p>
                adipiscing elit. Aliquam sodales urna orci, id pelle
                adipiscing elit. Aliquam sodales urna orci, id pelle
            </p>
        </Grid>
       
        <Grid item xs={12} sm={12} md={12} lg={12}>Designed By Smart Codes</Grid>
    </Grid>
}

export default Footer