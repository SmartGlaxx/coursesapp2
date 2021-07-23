import React, {useState, useEffect} from 'react'
import { makeStyles, TextField, Button } from '@material-ui/core';
import {useParams, Link} from 'react-router-dom'
import {API, graphqlOperation } from 'aws-amplify';
import {getProduct} from '../graphql/queries'
import {NumberFormat, Capitalize} from '../utils'
import ClipLoader from "react-spinners/ClipLoader";
import {useAppContext} from '../context'
import {S3Image} from 'aws-amplify-react'

const useStyles = makeStyles((theme) => ({
  body:{
        margin: "10rem 5rem",
        textAlign: 'center',
        height: 'auto',
        minHeight : "70vh",
    },
    link:{
    	color: "#334477",
    	marginTop : "2rem",
    	fontWeight: "600",
    	display : 'block'
    },
    owner:{
    	color: "#d52211",
    	fontSize : "0.8rem",
    	float : 'right'
    },
    price : {
    	background: "orange",
    	fontStyle : "italic",
        color: "#333",
        fontWeight: "600",
        padding : "0.3rem",
        fontSize : "0.8rem",

    },
    btn7 :{
	    background : 'rgba(0, 255, 0, 0.25)',
	    color: "#222",
	    fontSize :"0.8rem",
	    backdropFilter: "blur( 4px )",
	    boxShadow: "0 4px 12px 0 rgba( 31, 38, 135, 0.37 )",
	    webkitBackdropFilter: "blur( 4px )",
	    borderRadius: "3px",
	    border: "1px solid rgba( 255, 255, 255, 0.18 )",
	    padding : '0.4rem',
 	},
 	link:{
 		 color: "#000080",
 	},
 	linkContain:{
 		textAlign : "center", 
 		marginTop:"1rem"
 	}
})
)

const ProductDetails = ()=>{
	const {addToCart, user} = useAppContext()
	const path = useParams()
	const classes = useStyles()
	const {productid} = path
	const [productId, setProductId] = useState(productid)
	const [product,setProduct] = useState({})
	const [shop,setShop] = useState({})

	const color= "#1155dd"
    const override = 'css'
    const tr = true

    const addToCartFunc =(item)=>{
    	addToCart(item)
    }

     useEffect(()=>{
        window.scrollTo(0, 0)
    },[])




	useEffect(()=>{
	const getProductItem =async()=>{
		const input = {id : productId}

		const gotenProduct =  await API.graphql(graphqlOperation(getProduct, input))
		setProduct(gotenProduct.data.getProduct)
		setShop(gotenProduct.data.getProduct.shop)
		console.log('file', gotenProduct.data.getProduct)
	 }
	 getProductItem()

	},[product])

	const {description, name, owner, price, file} = product

	let {id} = shop
	const shopId = id
	return <div className={classes.body}>
		{
			product.name ? <>
			<S3Image 
			imgKey = {file.key}
			theme={{
				photoImg : {maxWidth: "100%",
				maxHeight: "100%"}
			}}
			/>
			<h3>{name}</h3>
			<p>{description}</p>
			<span className={classes.price}>₦{NumberFormat(price)}</span>
				
			{user.username != owner && <><Link to='/cart'
            className={classes.btn7}
            variant="contained" 
                type="button"
                onClick={()=>addToCartFunc(product)}
            >Buy Now</Link>
			<br />
			<div className={classes.linkContain}>
			<Link to= {`/shopdetails/${id}`} className={classes.link}>Vist seller's shop</Link>
			</div>
			</>
			}

		
			<div className={classes.owner}>Created by {owner}</div>
			</>
			:
			<ClipLoader color={color} loading={tr} css={override} size={50} />

		}
	</div>
}

export default ProductDetails