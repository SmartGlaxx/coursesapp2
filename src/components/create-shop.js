import React, { useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom'
import { makeStyles, TextField, Button } from '@material-ui/core';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import {createShop} from '../graphql/mutations'
import { Router } from 'react-router-dom';
import Multiselect from 'multiselect-react-dropdown';
import { useAppContext } from '../context'; 
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles((theme) => ({
  body:{
        margin: "0rem 1rem",
        textAlign: 'center',
        height: '10rem',
        position : "absolute",
        top : "10rem",
        background : "red"
    },
     select:{
        width: "50%",
        margin : "2rem auto",
        outline : "none",
        background : "green",
    },
root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  // textInput:{
  //     minWidth: '100%',
  //     width: "50%",
  //     margin: "0 auto",
      
  // },
  btn:{
      float :"right",
      width: "auto",
      background: "#8a8a8a"
      
  }
}));




const CreateShop =()=> {
    const {setModal} = useAppContext()
    const classes = useStyles();    
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
    
    const onSelect=(selectedList, selectedItem)=>{
      setSelectedTags(selectedList)
    }

    const onRemove = (selectedList, removedItem) =>{
      setSelectedTags(selectedList)
    }
    

    useEffect(async()=>{
        const shopOwnerInfo = await Auth.currentUserInfo()
        shopOwnerInfo ? setShopOwner(shopOwnerInfo.username) : setShopOwner('')
    
    },[])
 

    const createShopName =async(e)=>{
        
        e.preventDefault()
        const input = {
            name : shopName,
            tags : JSON.stringify(selectedTags),
            owner : shopOwner
        }
       const shopCreated = await API.graphql(graphqlOperation(createShop, {input}))
        setShopName('some value')
        setModal(false)
        return shopCreated && <Redirect to='/'/>;
    }

    
  return (
      <div className={classes.body}>
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="outlined-basic" label="Shop Name" variant="outlined" name='name' className={classes.textInput}
      value={shopName}
      onChange={(e)=>setShopName(e.target.value)}
      />
   
    <Multiselect
    
    options={options} // Options to display in the dropdown
    selectedValues={selectedValue} // Preselected value to persist in dropdown
    onSelect={onSelect} // Function will trigger on select event
    onRemove={onRemove} // Function will trigger on remove event
    displayValue="name" // Property name to display in the dropdown options
    />

      <Button variant="contained"
      className={classes.btn}
      onClick={createShopName}
      ><DoneIcon /></Button>
    </form>
    </div>
  );
}

export default CreateShop