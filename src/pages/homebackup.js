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
import Typography from '@material-ui/core/Typography';
import { useAppContext } from '../context'; 
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {Capitalize} from '../utils'
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';


import {createShop, deleteShop} from '../graphql/mutations'
import { Router } from 'react-router-dom';
import Multiselect from 'multiselect-react-dropdown';

const useStyles = makeStyles((theme) => ({
    body:{
          textAlign: "center",
          padding: '3% 10%',
          fontSize: "1.4rem",
          marginTop: "2rem"
      },
      inner:{
          margin: "2rem",

      },
      select:{
          width: "50%",
          margin : "2rem auto",
          outline : "none",
          zIndex : '10'
      },
      tags:{
        position: "absolute",
        right: "2rem",
        // transfrom : "translate(-50%)",
        bottom: "0",
        fontSize: '0.8rem',
        margin:  "0rem 0.2rem",
        color:  "#d52211",
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
            background: "rgba(218, 37, 59, 0.25)",
            boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
            backdropFilter: "blur( 4px )",
            webkitBackdropFilter: "blur( 4px )",
            borderRadius: "3px",
            border: "1px solid rgba( 255, 255, 255, 0.18 )",
            zIndex :"0"
        },
        btn1:{
            background: "rgba( 255, 255, 255, 0.25 )",
            boxShadow: "0 4px 12px 0 rgba( 31, 38, 135, 0.37 )",
            backdropFilter: "blur( 4px )",
            webkitBackdropFilter: "blur( 4px )",
            borderRadius: "3px",
            border: "1px solid rgba( 255, 255, 255, 0.18 )",
            position : "absolute",
            right: "3rem",
            top : "5rem"
        },
        btn0:{
            background : '#91A8A4',
            background : 'rgba(145, 168, 164,0.25)',
            fontSize :"0.8rem",
            boxShadow: "0 2px 5px 0 rgba( 31, 38, 135, 0.37 )",
            backdropFilter: "blur( 4px )",
            webkitBackdropFilter: "blur( 4px )",
            borderRadius: "3px",
            border: "1px solid rgba( 255, 255, 255, 0.18 )",
        },
        homeBtns:{
            position: 'absolute',
            right: "1rem",
            marginBottom: "3rem",
            height : "10rem",
            zIndex : "10",
            display: 'flex',
            alignItems : 'center'
        },
        DateAndTime:{
            position: "absolute",
            left : "1rem",
            bottom : "0.3rem",
            fontSize : "0.8rem",
            height: "2rem", 
            display : "flex",
            alignItems : "bottom"
        },
        createdDate:{
            margin : "1rem 0.5rem",
            color:  "#d52211",
        },
        createdTime:{
            margin : "1rem 0.5rem",
            color:  "#d52211",
        },
        insert:{
            margin : "1rem 0rem",
        }

    }))


const Home = ()=>{
    const {setUpdateModal, openUpdateModal, setUserInfo, user, searchResult} = useAppContext()
    const {setModal, openModal} = useAppContext()
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
       {openModal && <div>
           
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
      <Button disabled={!shopName} variant="contained"
      className={classes.btn1}
      onClick={createShopName}
      >Create Shop</Button>
    </form>
    </div>           
           
           </div>}
       <Button onClick={setShowShopValue}
       className={openModal ? classes.btn2 : classes.btn1}
       >{openModal ? <CloseIcon />: <AddIcon />}</Button>

        <div> 
        {shops.length > 0 ?  itemsToMap.map(shop =>{
            const {id, createdAt, name, owner, tags} = shop
    
            const tagStr = JSON.parse(tags)
            const id1 = 'Created by Me'
            const id2  = "Created by " + Capitalize(owner)
            return(<CardContent className='product' key={id}>
                    <span>{Capitalize(name)}</span>
                    <Typography >
                    {owner && user.username === owner ? id1 : id2 }
                    </Typography>
                    {tagStr.length > 0 && <Typography className={classes.tags}>
                        <span style={{color: 'black'}}>Tags:</span>
                        {tagStr && tagStr.map(tag =>{
                            return <span className={classes.tag}>{tag.name}</span>
                        })} 
                     </Typography>}
                    <div className={classes.DateAndTime}>
                   <span className={classes.insert}>Created on </span>
                   <span className={classes.createdDate}>
                   {createdAt.slice(0,10)}
                    </span>
                    <span className={classes.insert}>at</span>
                    <span className={classes.createdTime}>
                    {createdAt.slice(11,19)}
                    </span>
                    </div>
                    <a key={id} href={`/shopdetails/${id}`}>
                    <Button variant="contained" className={classes.btn0}>
                        View Courses
                    </Button>
                    </a>
                    <CardActions>
                        { owner && user.username === owner && <div className={classes.homeBtns}>
                        <Button className={classes.btn3} onClick={()=>{setUpdateModal(true, id, name)}} size='small'>
                        <EditIcon />
                        </Button>
                        <Button className={classes.btn4} onClick={()=>setDeleteModal(id)} size='small'>
                        <DeleteForeverIcon />
                        </Button>
                         </div>}
                          <UpdateShop openUpdate={openUpdate} id={id} /> 
                    </CardActions>
                </CardContent>
            )
        }) : 
         <ClipLoader color={color} loading={tr} css={override} size={150} />
    }
    </div>
    </div>
    
}

export default Home