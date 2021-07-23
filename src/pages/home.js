import React, { useState, useEffect } from 'react';
import { makeStyles, TextField, Button } from '@material-ui/core';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import {listShops} from '../graphql/queries'
import {onCreateShop, onUpdateShop, onDeleteShop} from '../graphql/subscriptions'
import {Redirect} from 'react-router-dom'
import CreateShop from '../components/create-shop'
import {UpdateShop, DeleteShop, SearchForm} from '../components'
import {Link} from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {Typography, Fab} from '@material-ui/core';
import { useAppContext } from '../context'; 
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import EditIcon from '@material-ui/icons/Edit';
import ViewListIcon from '@material-ui/icons/ViewList';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {Capitalize} from '../utils'
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import {Grid, Paper} from '@material-ui/core/'
import CheckIcon from '@material-ui/icons/Check';
import {createShop, deleteShop} from '../graphql/mutations'
import { Router } from 'react-router-dom';
import Multiselect from 'multiselect-react-dropdown';

const useStyles = makeStyles((theme) => ({
    body:{
          textAlign: "center",
          padding: '2rem 10%',
          fontSize: "1.4rem",
          minHeight : "70vh",
          marginTop: "2rem",
          [theme.breakpoints.down('xs')]: {
            marginTop: "5rem",
          }
      },
      outer:{
        width :"100%",
        height:  "auto",
        zIndex : "15",
        position : "relative"
      },
      link : {
        color: "#334"
      },
      inner:{
          position: "fixed",
          top: "30%",
          left : "50%",
          zIndex : "15",
          transform : "translate(-50%)",
          background : "#fff",
      },
      select:{
          width: "100%",
          margin : "1rem auto",
          outline : "none",
          zIndex : '15'
      },
      tags:{
        background: "white",
        position: "absolute",
        left: "0rem",
        right : "0rem",
        paddingLeft :"0.3rem",
        bottom: "2rem",
        fontSize: '0.8rem',
        color:  "navy",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
      tag:{
        marginLeft: "0.3rem"
      },
      bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },

        btn4:{
            background : 'rgba(115, 137, 174, 0.25)',
            fontSize :"0.8rem",
            margin: "10rem 0.2rem",
            backdropFilter: "blur( 4px )",
            webkitBackdropFilter: "blur( 4px )",
            borderRadius: "3px",
            border: "1px solid rgba( 255, 255, 255, 0.18 )",
        },
        btn3:{
            background : 'rgba(252, 158, 79, 0.25)',
            fontSize :"0.8rem",
            margin: "10rem 0.2rem",
            backdropFilter: "blur( 4px )",
            webkitBackdropFilter: "blur( 4px )",
            borderRadius: "3px",
            border: "1px solid rgba( 255, 255, 255, 0.18 )",
        },
        btn2:{
            zIndex :"0",
            
        },
        btn1:{
            marginLeft : "auto",
            margin :"2rem",
            [theme.breakpoints.down('xs')]: {
                position : "fixed",
                right: "0.5rem",
                margin : "0",
                bottom : "0.5rem",
                zIndex: "12"
            },
        },
        btnDone:{
            position : "fixed",
            right: "2rem",
            bottom : "2rem",
            
        },
        closeBtn:{
            position : "fixed",
            left: "2rem",
            bottom : "2rem",
            
        },
        btnCont:{
            display: "grid",
            placeItems : "right"
        },
        btn0:{
            // background : '#91A8A4',
            color : "#333",
          //  background : 'rgba(145, 168, 164,0.25)',
            fontSize :"0.8rem",
            boxShadow: "0 2px 5px 0 rgba( 31, 38, 135, 0.37 )",
            // backdropFilter: "blur( 4px )",
            //webkitBackdropFilter: "blur( 4px )",
            borderRadius: "3px",
            border: "1px solid rgba( 255, 255, 255, 0.18 )",
        },
        homeBtns:{
            position: 'absolute',
            right: "0rem",
            bottom: "0rem",
            height : "2rem",
            zIndex : "8",
            display: 'flex',
            alignItems : 'center'
        },
        editBtn:{
            fontSize : "0.9rem",
            cursor : "pointer",
        },
        deleteBtn:{
            fontSize : "0.9rem",
            cursor : "pointer"            
        },
        DateAndTime:{
            position: "absolute",
            right: "0.3rem",
            top : "0rem",
            fontSize : "0.8rem",
            height: "2rem", 
            display : "flex",
            alignItems : "bottom"
        },
        createdDate:{
            margin : "1rem 0.5rem",
            // color:  "#d52211",
        },
        createdTime:{
            margin : "1rem 0.5rem",
            color:  "#d52211",
        },
        insert:{
            margin : "1rem 0rem",
            fontWeight :"600"
        },
        paper:{
            padding : "0.5rem",
            height: "auto"
            // position : "relative"
        },
        name:{
            fontSize: "1rem",
            margin  :"0",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
        },
        cr:{
            fontSize : "0.8rem"
        }

    }))


const Home = ()=>{
    const {setUpdateModal, openUpdateModal, setUserInfo, user, searchResult
    ,setModal, openModal, setOverlay} = useAppContext()
    const classes = useStyles()
    let [shops, setShops] = useState([])
    // const [showShop,setShowShop] = useState(false)
    const [openUpdate, setOpenUpdate] = useState(false);

    // const classes = useStyles();    
    const [shopName, setShopName] = useState('')
    const [shopOwner, setShopOwner] = useState('') 
    const [tags, setTags] = useState([])
    const [selectedTags, setSelectedTags] = useState([])
    const [options, setOptions] = useState([
      {name: 'Technology', id: 1},
      {name: 'Arts', id: 2},
      {name: 'Medicine', id: 2},
      {name: 'Agriculture', id: 2},
      {name: 'Commerce', id: 2},
    ])
    const [selectedValue, setSelectedValue] = useState([])
    const color= "#1155dd"
    const override = 'css'
    const tr = true

     useEffect(()=>{
        window.scrollTo(0, 0)
    },[])

    useEffect(()=>{
        const fetchShops = async()=>{
            const allShops =  await API.graphql(graphqlOperation(listShops))
            setShops(allShops.data.listShops.items)
        }
        fetchShops()

        return ()=>{
            fetchShops()
        }
    },[])
    const setShowShopValue = ()=>{

       const modalValue = openModal == false ? true : false
       setModal(modalValue)
    }

    const onSelect=(selectedList, selectedItem)=>{
        setSelectedTags(selectedList)
      }
  
      const onRemove = (selectedList, removedItem) =>{
        setSelectedTags(selectedList)
      }
      
  
      useEffect(()=>{
        const fetchUserInfo = async()=>{
          const shopOwnerInfo = await Auth.currentUserInfo()
          shopOwnerInfo ? setShopOwner(shopOwnerInfo.username) : setShopOwner('')
          setUserInfo(shopOwnerInfo)
            }
        fetchUserInfo()
      },[])
   
  
// console.log('user',user)
      const createShopName =async(e)=>{
          
          e.preventDefault()
          const input = {
              name : shopName,
              tags : JSON.stringify(selectedTags),
              owner : shopOwner
          }
         const shopCreated = await API.graphql(graphqlOperation(createShop, {input}))
          setShopName('')
          
          return shopCreated && <Redirect to='/'/>;
      }
  
        const itemsToMap = searchResult.length > 0 ?
            searchResult : shops


      //start here



      const setDeleteModal = async(id)=>{
          const input = {
              id : id
          }
        const deletedShop = await API.graphql(graphqlOperation(deleteShop, {input}))

      }

      const parseISOString=(s)=> {
          var b = s.split(/\D+/);
          return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
        }

      useEffect(()=>{

            const onShopFunc = async()=>{ 
        const createdShopListener = await API.graphql(graphqlOperation(onCreateShop))
               .subscribe({
                 next : createdShopData =>{
                   const newShop = createdShopData.value.data.onCreateShop
                   const otherShops = shops.filter(shop => shop.id !== newShop.id)
                   const allShops = [newShop, ...otherShops]
                   setShops([...allShops])
                   setModal(false)
                 }
               })

        const onUpdateShopListner = await API.graphql(graphqlOperation(onUpdateShop))
                .subscribe({
                    next : updateShopData=>{
                        const updatedData = updateShopData.value.data.onUpdateShop
                        const nonUpdatedValue = shops.filter(shop => shop.id !== updatedData.id)
                        const indexofUpdate = shops.findIndex(shop => shop.id === updatedData.id)
                        const newUpdatedShops = [...shops.slice(0,indexofUpdate), updatedData, ...shops.slice(indexofUpdate + 1)]
                        setShops(newUpdatedShops)
                    }
                })


        const onDeleteShopListener = await API.graphql(graphqlOperation(onDeleteShop))
                .subscribe({
                    next : deletedShopData =>{
                        const deletedShop = deletedShopData.value.data.onDeleteShop
                        const remainingShops = shops.filter(shop => shop.id !== deletedShop.id)
                        setShops([...remainingShops])
                    }
                })


            return ()=>{
                createdShopListener.unsubscribe()
                onUpdateShopListner.unsubscribe()
                }
           }
           onShopFunc()


      },[shops])

    
    return <div className={classes.body}>
       {openModal && <div className={classes.outer}>
           
        <div className={classes.inner}>
    <form className='addshopform' noValidate autoComplete="off">
      <TextField id="outlined-basic" label="Shop Name" variant="outlined" name='name' className={classes.textInput}
      value={shopName}
      onChange={(e)=>setShopName(e.target.value)}
      />
   <div     className={classes.select}>
    <Multiselect
    options={options} // Options to display in the dropdown
    selectedValues={selectedValue} // Preselected value to persist in dropdown
    onSelect={onSelect} // Function will trigger on select event
    onRemove={onRemove} // Function will trigger on remove event
    displayValue="name" // Property name to display in the dropdown options
    />
    </div>
    <span onClick={()=>setOverlay(false)}>
      <Fab disabled={!shopName} variant="contained"  className={classes.btnDone} size='small'
       onClick={createShopName} color='green'
      ><CheckIcon /></Fab>
      </span>
      <span onClick={()=>setOverlay(false)}>
      <Fab className ={classes.closeBtn} color="secondary" onClick={setShowShopValue}
      aria-label="add" size='small' variant="contained">
          <CloseIcon />
     </Fab>
     </span>
    </form>
    </div>           
    {/* {openModal &&  <div onClick={setShowShopValue} className={classes.btnCont2}>
        <Fab color="secondary" aria-label="add" size='small'><CloseIcon /></Fab>
    </div>} */}
           </div>}
        <span onClick={()=>setOverlay(true)}>
        <div className={classes.btnCont}>
           <div onClick={setShowShopValue}
           className={classes.btn1}
           >{!openModal && <Fab color="primary" aria-label="add" size='small'><AddIcon /></Fab>}
           </div>
       </div>
       </span>
        <Grid container> 
        {shops.length > 0 ?  itemsToMap.map(shop =>{
            const {id, createdAt, name, owner, tags} = shop
    
            const tagStr = JSON.parse(tags)
            const id1 = 'Created by Me'
            const id2  = "Created by " + Capitalize(owner)
            return(<><Grid className='product' key={id} item xs={12} sm={6} md={4} lg={3}>
                    <Paper className={classes.paper}>
                    <Link to= {`/shopdetails/${id}`} className={classes.link}>
                    <h5 className={classes.name}>{Capitalize(name)}</h5>
                    <div className={classes.cr}>
                    {owner && user.username === owner ? id1 : id2 }
                    </div>
                    {tagStr.length > 0 && <Typography className={classes.tags}>
                        <span style={{color: 'black'}}>Tags:</span>
                        {tagStr && tagStr.map(tag =>{
                            return <span className={classes.tag} key={tag.name}>{tag.name}</span>
                        })} 
                     </Typography>}
                    <div className={classes.DateAndTime}>
                   <span className={classes.insert}>Created on </span>
                   <span className={classes.createdDate}>
                   {createdAt.slice(0,10)}
                    </span>
                    </div>
                    </Link>
                    </Paper>
                    <CardActions>
                        { owner && user.username === owner && <div className={classes.homeBtns}>
                        <span onClick={()=>setOverlay(true)}>
                        <Button className={classes.editBtn} aria-label="edit" onClick={()=>{setUpdateModal(true, id, name)}}
                         size='small' color='primary'>
                            <EditIcon />
                        </Button>
                        </span>
                        <Button className={classes.deleteBtn} aria-label="edit" color='secondary'
                        onClick={()=>setDeleteModal(id)} size='small'>
                            <DeleteForeverIcon />
                        </Button>
                         </div>}
                    </CardActions>
                </Grid>
           {openUpdateModal && <UpdateShop openUpdate={openUpdate} id={id} /> }
            </>
            )
        }) : 
        <Grid item xs={12} sm={12} md={12} lg={12}>
         <ClipLoader color={color} loading={tr} css={override} size={50} />
         </Grid>
    }
    </Grid>
    </div>
    
}

export default Home