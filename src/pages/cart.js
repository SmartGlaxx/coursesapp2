import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import CardContent from '@material-ui/core/CardContent';
import { makeStyles, TextField, Button } from '@material-ui/core';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import {listProducts} from '../graphql/queries'
import {useAppContext} from '../context'
import { usePaystackPayment, PaystackButton, PaystackConsumer } from 'react-paystack';
import {NumberFormat, Capitalize} from '../utils'
import {Overlay, WarningModal} from '../components'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {Typography, Fab} from '@material-ui/core';
import {Grid, Paper} from '@material-ui/core/'

const useStyles = makeStyles((theme) => ({
 
  body:{
      minHeight : "50vh",
      padding: '2rem 10%',
      fontSize: "1.4rem",
      marginTop: "2rem",
      [theme.breakpoints.down('xs')]: {
        marginTop: "3rem",
        padding: '1rem 2%',
        fontSize: "1.1rem",
      }
  },
  btn11:{
      // background : 'rgba(255, 0, 0, 0.25)',
      // fontSize :"0.8rem",
      // backdropFilter: "blur( 4px )",
      // webkitBackdropFilter: "blur( 4px )",
      // borderRadius: "3px",
      // border: "1px solid rgba( 255, 255, 255, 0.18 )",
      position : "absolute",
      right: "1rem",
      bottom: "1rem"
  },
  link:{
    color: "#334477",
    marginTop : "2rem",
    fontWeight: "500",
    display : 'block',
    fontSize : "1.1rem",
     [theme.breakpoints.down('xs')]: {
        fontSize: "0.9rem",
      }
    },
    empty:{
        background: "rgba( 0, 15, 69, 0.25 )",
        boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
        backdropFilter:" blur( 4px )",
        webkitBackdropFilter: "blur( 4px )",
        position: "fixed",
        paddingTop : "30vh",
        top: "0vh",
        left: "0vw",
        bottom: "0",
        right: "0",
        textAlign: "center",
        // transform : 'translate(-50%)',
        fontSize : "1.2rem",
        fontWeight : "600",
    [theme.breakpoints.down('xs')]: {
        fontSize: "1rem",
      }
    },
    payBtnContainer:{
        float: "right",
        marginTop : "auto",
        [theme.breakpoints.down('sm')]: {
        position : "fixed",
        margin : "0",
        right: "0.5rem",
        bottom : "0.5rem",
        zIndex: "12",
        cursor : "pointer",
        },
    },
    paystackBtn:{
        float: "right",
        color: "#fff",
        background: 'transparent',
        borderRadius : "5px",
        border: "none",
        // padding: "0.7rem 1.7rem",        
        "&:hover":{
            background: "transparent",
            color: "#fff"
        }
    },  
    cartContainer:{
        margin :"1rem 0",
    },
    cartItem:{
        padding: "0.5rem",
        position: "relative",
        background: "#fff",
        margin: "0.1rem 1rem",
        fontSize :"0.9rem",
        borderRadius: "5px"
    },
    name:{
        color: "#333",
        margin: "0"
    },
    desc:{
        color: "#333",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        margin: "0"
    },
    price:{
        margin: "0",
        width: "",
        fontStyle : "italic",
        color: "#333",
        fontWeight: "600",
        fontSize : "0.8rem"
    },
    total:{
        margin: "0",
        width: "100%"
    },
    priceBox:{
        padding: "1rem" 
    },
    cart:{
      boxShadow: "0 3px 12px 0 rgba( 31, 38, 135, 0.37 )",
      backdropFilter: "blur( 2.5px )",
      webkitBackdropFilter: "blur( 2.5px )",
      borderRadius: "10px",
      border: "1px solid rgba( 255, 255, 255, 0.18 )",
      zIndex: '0',
      [theme.breakpoints.down('sm')]:{
        paddingBottom :"4rem"
      }
    }
 }))

const Cart = ()=>{
    const {cart, removeCartItem, itemExists, setCartEmpty} = useAppContext()
    const [user, setUser] = useState({})
    const [productsList, setProductsList] = useState([])
    const [total, setTotal] = useState(0)
    const classes = useStyles()

    useEffect(()=>{
        const getUser = async()=>{
        const userInfo = await Auth.currentUserInfo()
        setUser(userInfo)
        // userInfo.attributes.sub
    }
    getUser()
    },[])
    
    useEffect(()=>{
    
        const totalCost = cart.reduce((acc, curr)=>{
            const itemPrice = curr.price
            acc += itemPrice
            return acc
        },0) 
        
        setTotal(totalCost)
        
        
    },[cart])


    useEffect(()=>{
        window.scrollTo(0, 0)
    },[])

    useEffect(()=>{
        const getProductList = async()=>{
          
            const productsGotten = await API.graphql(graphqlOperation(listProducts))
            setProductsList(productsGotten.data.listProducts.items)

            const myCart = cart.map(product => {
                const {id, name, price} = product
                return <div key={id}>
                <h4>{Capitalize(name)}</h4>
                <p>₦{NumberFormat(price)}</p>
                </div>
            })                  
        }
        getProductList()
    },[productsList])
     

// Paystack setup starts

       let userEmail = ''
    if(user){
        if(user.email){
            // console.log('asdvf sfgd g', user.email)
            userEmail = user.email
        }else{
            // console.log('asdvf sfgd g', user.email)
            userEmail = 'user@gmail.com'
        }
    }else{
        userEmail = 'user@gmail.com'
        // console.log('asdvf sfgd g', user.email)
    }  
     const config = {
       
        reference: (new Date()).getTime(),
        email: userEmail,
        amount: total,
        publicKey: 'pk_test_9a49700b392140d6d00d0568aaeeef0951d25475',
        };

        const componentProps = {
            ...config,
            text : `Pay`,
            onSuccess: () =>setCartEmpty()
            // onClose: () =>updateCartAfterBuy(()=>window.location.redirect('/')),
        };

// Paystack setup ends


    return (<div className ={classes.body}>
        
        {user ? <>
            <h5>You have {cart.length} items in cart</h5>
            <Grid className={classes.cart} container>
            <Grid item xs={12} sm={12} md={8} lg={8} className={classes.cartContainer}>
            {cart.length > 0 ? cart.map(product => {
            const {id, name, description, price} = product

            return <Grid className={classes.cartItem} key={id} item xs={12} sm={12} md={12} lg={12}>
                <Link to = {`/product-details/${id}`}>
                <h4 className={classes.name}>{Capitalize(name)}</h4>
                <p className={classes.desc}>{description}</p>
                </Link>
                <p className={classes.price}>₦{NumberFormat(price)}</p>
                <Button onClick={()=>{removeCartItem(id)}}
                variant="text" color='secondary'
                   size='small' className={classes.btn11}
                ><DeleteForeverIcon /></Button>
                </Grid>
                
                })  :
                <div className={classes.empty}>
                    Your cart is empty. <br/>
                    <Link to='/' className={classes.link}>Continue shopping</Link>
                </div>
                }
                
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} className={classes.priceBox}>
                <hr />
                <h6 className={classes.total}>Total : ₦{NumberFormat(total)}</h6>
                <hr />
                <Button variant='contained' color='primary' size='small' className={classes.payBtnContainer}>
                {cart.length > 0 && <PaystackButton  {...componentProps} className={classes.paystackBtn}/> }
                </Button>
                </Grid>
            </Grid>
            </>
            :
            <Grid container>
                Not yet signed up? Please <a href = '/' >
                 Sign up</a> to purchase this item.
            </Grid>
        }
    </div>
    )
}

export default Cart