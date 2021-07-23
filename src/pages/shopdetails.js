import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom'
import { makeStyles, TextField, Button } from '@material-ui/core';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import {getProduct,listProducts,getShop} from '../graphql/queries'
import {onCreateProduct, onDeleteProduct} from '../graphql/subscriptions'
import {deleteProduct} from '../graphql/mutations'
import {Link} from 'react-router-dom'
import ProductModal from '../components/modal'
import {UpdateProduct} from '../components'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import {useAppContext} from '../context'
import {NumberFormat, Capitalize} from '../utils'
import ClipLoader from "react-spinners/ClipLoader";
import EditIcon from '@material-ui/icons/Edit';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {Typography, Fab} from '@material-ui/core';
import {Grid, Paper} from '@material-ui/core/'
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
      body:{
          minHeight : "50vh",
          padding: '2rem 10%',
          fontSize: "1.4rem",
          marginTop: "2rem",
          [theme.breakpoints.down('xs')]: {
            marginTop: "5rem",
            minHeight : "70vh",
          }
      },
      body2:{
        height : "50vh",
          padding: '2rem 10%',
          fontSize: "1.4rem",
          marginTop: "2rem",
          textAlign : "center",
          [theme.breakpoints.down('xs')]: {
            marginTop: "5rem",
        }
      },
      btn:{
        background: "#8a8a8a"
      },
    product:{
          margin: ' 1rem auto',
          width: "80%",
          height: "3rem",
          maxHeight : "4rem",
           
      },
    root: {
        minWidth: 275,
    },
    loader: {
        display: "grid", 
        placeItems: "center", 
        paddingTop: "15%"
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
    h3:{
        marginTop: '2rem'
    },
    btn10:{
        background : 'rgba(155, 155, 155, 0.25)',
        color: "#222",
        fontSize :"0.8rem",
        backdropFilter: "blur( 4px )",
        boxShadow: "0 4px 12px 0 rgba( 31, 38, 135, 0.37 )",
        webkitBackdropFilter: "blur( 4px )",
        borderRadius: "3px",
        border: "1px solid rgba( 255, 255, 255, 0.18 )",
        padding : '0.4rem',
        position: "absolute",
        right: "6rem",
        bottom : "1rem",
    },
    btn7 :{
        // background : 'rgba(0, 255, 0, 0.25)',
        // color: "#222",
        // fontSize :"0.8rem",
        // backdropFilter: "blur( 4px )",
        // boxShadow: "0 4px 12px 0 rgba( 31, 38, 135, 0.37 )",
        // webkitBackdropFilter: "blur( 4px )",
        // borderRadius: "3px",
        // border: "1px solid rgba( 255, 255, 255, 0.18 )",
        // padding : '0.4rem',
        position: "absolute",
        right: "1rem",
        bottom : "1rem",
     },
     btn13:{
        // background : 'rgba(252, 158, 79, 0.25)',
        // color: "#222",
        // fontSize :"0.8rem",
        // backdropFilter: "blur( 4px )",
        // boxShadow: "0 4px 12px 0 rgba( 31, 38, 135, 0.37 )",
        // webkitBackdropFilter: "blur( 4px )",
        // borderRadius: "3px",
        // border: "1px solid rgba( 255, 255, 255, 0.18 )",
        // padding : '0.4rem',
        position: "absolute",
        right: "5rem",
        bottom : "1rem",
     },
     btnDelete:{
       position: "absolute",
        right: "1rem",
        bottom : "1rem", 
     },
    price :{
        background : 'orange',
        // background : 'rgba(252, 158, 79, 0.25)',
        fontStyle : "italic",
        color: "#333",
        fontWeight: "600",
        padding : "0.3rem",
        fontSize : "0.8rem"
    },
    owner:{
        fontSize : "0.7rem",
        fontWeight : "600",
        color: "#91A8A4"
    },
    info2:{
        fontSize : "0.8rem",
         color: "#516674"
    },
    info1:{
        fontSize : "1.1rem",
         color: "#516674"
    },
    info:{
        fontSize : "0.9rem",
        color: "#516674"
    },
    tagItem:{
        margin : '0 0.15rem'
    },
    productName : {
        margin : "0",
        color: "#334"
    }
}))


const ShopDetails = ({userInfo})=>{
    const {addToCart, cart, user, setUpdateProductModal, setOverlay} = useAppContext()
    const classes = useStyles()
    const param = useParams()
    const shopId = param.shopid

    const [shop, setShop] = useState({})
    const [shopProducts, setShopProducts] = useState([])
    const [realProducts, setRealProducts] = useState([])
    
    const color= "#1155dd"
    const override = 'css'
    const tr = true

     useEffect(()=>{
        window.scrollTo(0, 0)
    },[])

    useEffect(()=>{
        const getShopData = async()=>{
            const input = {id : shopId}
            
            const shopGotten =  await API.graphql(graphqlOperation(getShop, input))
            setShop(shopGotten.data.getShop)
            setShopProducts(shopGotten.data.getShop.products.items)

         }  
      
         getShopData()       
    },[shop])

    useEffect(()=>{
        const productListner = async()=>{
            const createProductListener = await API.graphql(graphqlOperation(onCreateProduct))
            .subscribe({
                next : createProductData =>{
                    const createdProduct = createProductData.value.data.onCreateProduct
                    const oldProducts = shopProducts.filter(product => product.id !== createdProduct.id)
                    const allShopProducts = [createdProduct, ...oldProducts]
                    setShop(allShopProducts)      
                }
            })

       const deletedProductListener = async()=>{
        const deleteProductData = await API.graphql(graphqlOperation(onCreateProduct))
        .subscribe({
            next : deleteProductData =>{
                const deleteProductItem = deleteProductData.value.data.onDeleteProduct
                
            }
        })
       }


         return ()=>{
            createProductListener.unsubscribe()
            }
        }
        productListner()
    },[shop])

    // const updateProductFunc =(product)=>{

    // }

    const setDeleteProduct = async(id)=>{
        const input = {id : id}
        const deletedProduct = await API.graphql(graphqlOperation(deleteProduct, {input}))
        
    }

    const addToCartFunc =(item)=>{
        addToCart(item)
    }
    if(!shop.name){
        return <div className={classes.loader}>
            <ClipLoader color={color} loading={tr} css={override} size={50} />
        </div>
    }


    const {id, name, owner, createdAt, tags, products} = shop
    const tagStr = JSON.parse(tags)



    const id1 = 'Me'
    const id2  = owner
    
    return (<div className={classes.body}> 
        {userInfo.username == owner && <><ProductModal userInfo={userInfo} shopid={id} owner = {owner}/></> }
        {shop && <>
        {userInfo.username != owner && <div className={classes.info1}>Welcome to {name} Shop</div>}
        {userInfo.username == owner && <div className={classes.info}>{Capitalize(name)} Shop</div>}
        {userInfo.username != owner && <div className={classes.info}> Owner: {Capitalize(owner)}</div>}
        
        <div className ={classes.info2}>
            Shop Tags: {tagStr.map(tag =>{
                return <span className ={classes.tagItem}>{tag.name},</span>
            })}
        </div>
     
        
            <div className ={classes.info2}>{products.items.length} courses available</div>
            <Grid container>
            {products.items.map(product =>{
                const {id, name, description, price, owner, createdAt} = product
                return (<Grid key={id} item xs={12} sm={6} md={6} lg={4}>
                        <CardContent className="product">
                        <Link to = {`/product-details/${id}`}>
                            <h5 className={classes.productName}>
                            {Capitalize(name)}</h5>
                            <Typography className='product-desc'>
                                {description}
                            </Typography>
                            <Typography>
                        <span className={classes.price}>
                        ₦{NumberFormat(price)}</span>
                            </Typography>
                            <Typography className={classes.owner}>
                                {owner}
                            </Typography>
                        </Link>
                            {userInfo.username != owner ? <Link to='/cart' onClick={()=>addToCartFunc(product)}>
                            <Button  variant="text" color='secondary'
                            size='small' className={classes.btn7}>
                            <ShoppingCartIcon /></Button></Link>
                            :
                            <>
                            <span onClick={()=>setOverlay(true)}>
                            <Button className={classes.btn13} variant="text"  size='small' color='primary'
                                onClick={()=>{setUpdateProductModal(true, id, name, description, price)}} 
                            ><EditIcon /></Button>
                            </span>
                            <Button className={classes.btnDelete} onClick={()=>setDeleteProduct(id)} 
                            color='secondary' variant="text" size='small' ><DeleteForeverIcon /></Button>
                            </>
                        }
                        
                        </CardContent>
                        <Grid    item xs={12} sm={12} md={12} lg={12}>
                            <UpdateProduct id={id}/>
                        </Grid>
                    </Grid>
                    )
            })
        }

        </Grid>
           
        </>
        }
    </div>)
}




export default ShopDetails