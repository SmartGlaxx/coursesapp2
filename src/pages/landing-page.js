import React, {useState, useEffect} from 'react'
import {Grid, Paper} from '@material-ui/core/'
import { fade, makeStyles } from '@material-ui/core/styles';
import {HomeCarousel} from '../components'
import backgnd from '../assets/backgnd.jpg'
import { Button, ButtonGroup } from '@material-ui/core';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import {listProducts} from '../graphql/queries'
import ClipLoader from "react-spinners/ClipLoader";
import {Link} from 'react-router-dom'
import { useAppContext } from '../context';
import Testimonials from '../assets/testimonials'
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles((theme)=>({
	page : {
		width:"100%",
		height:"auto",
		overflow :"hidden",
		minHeight : "70vh",
	},
	topPosts:{
		margin : "0 5%",
		width: "90%",
		[theme.breakpoints.down('xs')]:{
			margin : "0 1%",
			width: "98%",
		}

	},

	paper:{
		minHeight: "20rem",
		fontSize : '1.1rem',
		padding: "0.2rem 1rem",
		paddingBottom : "3rem",
		margin  :"2rem",
		textAlign : "center",
		background: "#D1D8EC", 
		transition: "all 1s",
		position : "relative",
		[theme.breakpoints.down('xs')]:{
			margin  :"2rem 0.5rem",
		},
		'&:hover':{
			transform : "translateY(-0.5rem)",
		}

	},
	featured:{
		height : "auto",
		width : "100%",
		margin :"2rem auto",
		background: "#D1D8EC",
		padding : "2rem",
		paddingBottom : "3rem",
	},
	course:{
		maxHeight: "20rem",
		height: "auto",
	  	padding: "1rem",
	  	textAlign: "center",
	  	color: "#333",
	  	borderRadius: "1rem",
		background: "linear-gradient(145deg, #cacaca, #f0f0f0)",
		boxshadow:  "20px 20px 60px #bebebe,-20px -20px 60px #ffffff",
		paddingBottom: "3rem"
	},
	lm:{
		position: "absolute",
		right : "1rem",
		bottom : "1rem"
	},
	loader:{
		width: '100%',
		display : "grid",
		placeItems : "center",
		margin : "2rem 0" 
	},
	coursePaper:{
		position:"relative",
		// paddingBottom: "3rem"
	},
	vc:{
		fontSize:"0.7rem"
	},
	testimony:{
		height :"25rem",
		width: "100%",
		padding : "1rem 5%",
		marginBottom : "-4rem",
		position: "relative",
		background: "linear-gradient(145deg, #cacaca, #f0f0f0)",
		[theme.breakpoints.down('sm')]:{
			height: "17rem"
		}
	},
	testimonials : {
		height: "100%"
	},
	tesImage1:{
		height:"18rem",
		position: "absolute",
		top : "-3rem",
		zIndex :"5",
		transition : "3s",
		[theme.breakpoints.down('sm')]:{
			height: "10rem"
		}
	},
	tesBtnGrp:{
		right : "2rem",
		top : "20rem",
		position : "absolute",
		zIndex :"10",
		[theme.breakpoints.down('sm')]:{
			top : "12rem",
		},
		[theme.breakpoints.down('xs')]:{
			textAlign : "center",
			width : "50%",
			right : "25%"
		}
	},
	tesBtn:{
		// bottom : "2rem",
		zIndex : "0",
		position:  "relative"
	},
	rotateBtn :{
		transform : "rotate(180deg)"
	},
	box:{
		textAlign :"center",
		height :"auto",
		zIndex : "6"
	},
	wordBox : {
		zIndex : "6",
		background: "linear-gradient(145deg, #cacaca, #f0f0f0)",
		position : "relative",
		width: "50%",
		margin :"0 auto",
		[theme.breakpoints.down('md')]:{
			marginTop : "rem",
		},
		[theme.breakpoints.down('sm')]:{
			marginTop : "-6rem",
			width: "100%",
		}
	},
	word: {
		marginTop : "12rem",
		zIndex : "6",
		[theme.breakpoints.down('sm')]:{
		height : "100%"
		}
	},
	name : {
		
		fontSize : "0.7rem",
		color :"#333"
	},


}))


const LandingPage = ()=>{
	const {setUserInfo, user} = useAppContext()
	const [products, setProducts] = useState([])
	const [shopOwner, setShopOwner] = useState('') 
	const [imageIndex,setImageIndex] = useState(1)

	const color= "#1155dd"
    const override = 'css'
    const tr = true

     useEffect(()=>{
        window.scrollTo(0, 0)
    },[])

	useEffect(()=>{
	const productList = async()=>{
	    const productsGotten =  await API.graphql(graphqlOperation(listProducts))
	    setProducts(productsGotten.data.listProducts.items)
	 }  
         productList()       
    },[])

     useEffect(()=>{
	    const fetchUserInfo = async()=>{
	      const shopOwnerInfo = await Auth.currentUserInfo()
	      shopOwnerInfo ? setShopOwner(shopOwnerInfo.username) : setShopOwner('')
	      setUserInfo(shopOwnerInfo)
        }
    fetchUserInfo()
      },[])
   
     const setPicNext = ()=>{
     	let newIndex = imageIndex + 1

     	if(imageIndex == Testimonials.length){
				newIndex = 1     	
     	}
     	 setImageIndex(newIndex)
     }

     const setPicPrev = ()=>{
     	let newIndex = 1
     	if(imageIndex == 1){
     		newIndex = Testimonials.length
     	}else{
     		newIndex = imageIndex - 1
     	}
     	setImageIndex(newIndex)
     }

     

 		// const io = setInterval(()=>{
   //    		setPicNext()
   //    		return ()=>clearInterval(io)
   //  	},7000)

 		// 	setInterval(()=>{
 		// 		clearInterval(io)
 		// 	},7000)
 
    		


         

    
	const classes = useStyles()
	return <>
		<div className={`${classes.page} pageSection`}>
			<div className={classes.imgBox} >
				<img src = {backgnd} className='backgnd'/>
			</div>
			<div>

			</div>
			<div className='main'>
				<Grid container className={classes.topPosts}>
					<Grid item xs={12} sm={12} md={4} lg={4}>
						<Paper className={classes.paper} >
							<h3>Title</h3>
							f you bootstrap your application using Create React App and have your 
							image inside the src folder, you can import the image first and then place
							 it as the background of your element:
							 <Button to='#' variant='contained' size='medium' color='primary' className={classes.lm}>Learn more</Button>
						</Paper>
					</Grid>
					<Grid item xs={12} sm={12} md={4} lg={4}>
						<Paper className={classes.paper} >
						<h3>Title</h3>
						f you bootstrap your application using Create React App and have your 
						image inside the src folder, you can import the image first and then place
						 it as the background of your element:
						 <Button to='#' variant='contained' size='medium' color='primary' className={classes.lm}>Learn more</Button>
						</Paper>
					</Grid>
					<Grid item xs={12} sm={12} md={4} lg={4}>
						<Paper className={classes.paper} >
						<h3>Title</h3>
						f you bootstrap your application using Create React App and have your 
						image inside the src folder, you can import the image first and then place
						 it as the background of your element:
						 <Button to='#' variant='contained' size='medium' color='primary' className={classes.lm}>Learn more</Button>
						</Paper>
					</Grid>
				</Grid>
				<div className={classes.featured}>
					<Grid container spacing={1}>
						{products.length > 0 ? products.slice(0,4).map(product => {
						const {id, name, description} = product
						return <Grid item key={id} xs={12} sm={12} md={6} lg={6}>
								<div className={classes.coursePaper}>
								<Paper className={classes.course}>
									<h4>{name}</h4>
									<p>{description.length > 35 ? description.slice(0, 35) + "..." : description}</p>
								</Paper>
								<Button  variant='contained' size='medium' color='primary' className={classes.lm}>
									<Link to ={`/product-details/${id}`} className={classes.vc}>View course</Link>
								</Button >
								</div>
							</Grid>
						})
						:
						<div className={classes.loader}>
						<ClipLoader color={color} loading={tr} css={override} size={50} />
						</div>
					}
					</Grid>
				</div>
			</div>
		</div>
		<div className={classes.testimony}>
			<div className={classes.testimonials}>
				{Testimonials.map((item, i) => {
					const {id, name, word, image} = item
					return <div key={id} className={classes.box}>
						{imageIndex == id && <>
							<img src = {image} alt='name' 
							className={classes.tesImage1}/>
							<div className={classes.wordBox}>
								<div className={classes.word}><FormatQuoteIcon />{word}</div>
								<p className={classes.name}>{name}</p>
							</div>
							</>
						}
					</div>
				})}
			</div>
			<div color="primary" aria-label="outlined primary button group" className={classes.tesBtnGrp}>
			<Button
			onClick={setPicPrev}
			className={`${classes.tesBtn} ${classes.rotateBtn}`}
			size ='small'
			variant='text'
			><NavigateNextIcon /></Button><Button
			onClick={setPicNext}
			className={classes.tesBtn}
			size ='small'
			variant='text'
			><NavigateNextIcon /></Button>
			</div>
		</div>
	</>
}

export default LandingPage