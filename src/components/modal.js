import React, {useState} from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { makeStyles, TextField, Button } from '@material-ui/core';
import {createProduct} from '../graphql/mutations'
import {PhotoPicker} from 'aws-amplify-react'
import {Storage} from 'aws-amplify'
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import {Typography, Fab} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import {useAppContext} from '../context'
import aws_exports from '../aws-exports'
import {Progress} from 'element-react'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput:{
    width : "100%",
    marginBottom : '1rem',
    padding : "0rem"
  },
   TextField:{
    width : "100%",
    marginBottom : '1rem',
    padding : "0rem"
  },
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
  addBtn:{
    marginLeft : "auto",
    [theme.breakpoints.down('xs')]: {
        position : "fixed",
        right: "0.5rem",
        bottom : "0.5rem",
        zIndex: "12"
    },
},
 btn9 :{
    // backdropFilter: "blur( 4px )",
    // webkitBackdropFilter: "blur( 4px )",
    // borderRadius: "3px",
    // border: "1px solid rgba( 255, 255, 255, 0.18 )",
    float: "right"
},
 btnCont:{
    display: "grid",
    placeItems : "right",
},
btn1:{
    marginLeft : "auto",
    margin : "2rem",
    [theme.breakpoints.down('xs')]: {
        position : "fixed",
         margin : "0",
        right: "0.5rem",
        bottom : "0.5rem",
        zIndex: "12"
    },
},
}));

export default function TransitionsModal({userInfo, owner, shopid}) {
  const classes = useStyles();
  const [productName, setProductName] = useState('')
  const [producDesc, setProducDesc] = useState('')
  const [productPrice, setProductPrice] = useState(0)
  // const [imgUrl, setImgUrl] = useState('')
  // const [picture, setPicture] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const {setOverlay, handleOpen, handleClose, modalOpen} = useAppContext()
  const [preview, setPreView] = useState('')
  const [image, setImage] = useState('')
  const [percentUploaded, setPercentUploaded] = useState(0)
  // const [open, setOpen] = React.useState(false);

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const createProductName = async()=>{
    setIsUploading(true)
    const visiblility = 'public'
    const userIdentity = userInfo.id

    const fileName =`/${visiblility}/${userIdentity}/${Date.now()}-${image.name}`
    const uploadedFile = await Storage.put(fileName, image.file,{
      contentType : image.type,
      progressCallback : progress =>{
        console.log()
        const percentUpload = Math.round(progress.loaded / progress.total) * 100
        setPercentUploaded(percentUpload)
      }
    })

    const file = {
      key : uploadedFile.key,
      bucket : aws_exports.aws_user_files_s3_bucket,
      region : aws_exports.aws_project_region
    }

    if(file.key.length > 0){
      setIsUploading(false)
    }

    const input = { 
      name: productName,
      description: producDesc,
      price: productPrice,
      productShopId: shopid,
      owner : owner,
      file : file
    }

    if(userInfo.username == owner){
    const createProductresult = await API.graphql(graphqlOperation(createProduct, {input}))
    
    setProductName('')
    setProducDesc('')
    setProductPrice(0)
    
    }else{
      return
    }
      
  }
  return (<>
    <div>
       <div className={classes.btnCont}>
        <div  onClick={handleOpen} className={classes.btn1}>
          <span onClick={()=>setOverlay(true)}>
           <Fab color="primary" aria-label="add" size='small'><AddIcon /></Fab>
          </span>
         </div>
      </div>
          {modalOpen && <div className={classes.outer}><div className={classes.inner}>
                <form className='addshopform2' noValidate autoComplete="off">
                <TextField id="outlined-basic" label="Product Name" 
                variant="outlined" name='name' className={classes.textInput}
                value={productName}
                onChange={(e)=>setProductName(e.target.value)}
                />
                <br />
                <TextField
                id="outlined-textarea"
                label="Product Description"
                placeholder="Placeholder"
                className={classes.TextField}
                multiline
                rows={4}
                variant="outlined"
                value={producDesc}
                onChange={(e)=>setProducDesc(e.target.value)}
                />
                <br />
                <input type='number'  name='productPrice'
                className={classes.numberInput}
                value={productPrice} onChange={(e)=>setProductPrice(e.target.value)}
                />
                
                {percentUploaded > 0 && (<Progress 
                  type='line'
                  className ='progress'
                  percentage = {percentUploaded}
                  />)}
                <PhotoPicker 
                title='product Image'
                preview ='hidden'
                onPick ={file => setImage(file)}
                  theme={{
                    formContainer :{
                      margin: '0',
                      padding : "0.8rem",
                      alignItems: "center",
                      display: "block",
                    },
                    formSection : {
                      display: "block",
                      alignItems: "center",
                      justifyContent : "center",
                      
                    },
                    sectionBody:{
                      margin: "0",
                      width :"100%",
                      
                    },
                    sectionHeader:{
                      padding : "0.2rem",
                      color: "#88a",
                    }
                  }}
                />
                <span onClick={handleClose}>
                <Fab className ={classes.closeBtn} color="secondary" onClick={()=>setOverlay(false)}
                aria-label="add" size='small' variant="contained">
                    <CloseIcon />
               </Fab>
               </span>
                <span onClick={handleClose}>
                <span onClick={()=>setOverlay(false)}>
                <Fab variant="contained" size ='small'
                disabled={!productName || !producDesc || isUploading}
                className={classes.btn9}
                onClick={createProductName}
                ><CheckIcon /></Fab>
                </span>
                </span>
                </form>
            </div>
          </div>}
    </div>
    </>
  );
}



