import React, {useEffect} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Button, ButtonGroup} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { FaAlignJustify } from 'react-icons/fa';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {MenuIcon, AccountCircle, MailIcon, NotificationsIcon, MoreIcon} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import {searchShops} from '../graphql/queries'
import {useAppContext} from '../context'
import logo from "../assets/logo.png"
import SearchIcon from '@material-ui/icons/Search';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Grid from '@material-ui/core/Grid'
import SideBar from "./sidebar";

import 'fontsource-roboto'

const useStyles = makeStyles((theme) => ({
  gridBox:{
    display: "flex",
    alignItems : "center",
    justifyContent: "center"
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  cartBox: {
    display: "grid",
    alignItems :"center",
    marginTop : "5.5rem",
    // marginTop: "-4rem",
    // [theme.breakpoints.down('sm')]:{
    //   display:"hidden",
      
    // }
    // [theme.breakpoints.up('md')]:{
    //   marginTop: "-4rem"
    // }
    
  },
  btngrp:{
    display: "none",
    [theme.breakpoints.up('sm')]:{
      display: "flex",
      alignItems :"center",
       marginTop: "0rem"
    },
    [theme.breakpoints.up('md')]:{
      marginTop: "0rem"
    },
  },
  link:{
    color: '#88c',
    '&:hover':{
      color :"white",
    }
  },
  img:{
    width: "12.4rem",
    height: "3rem",
    [theme.breakpoints.up('sm')]:{
      marginTop: "0rem"
    },
    [theme.breakpoints.up('md')]:{
      marginTop: "0rem"
    }
  },
  btn:{
    color: "#ddd",
  '&:hover': {
    color :"white",
    // background : "#eee"
  }
},
  menu: {
    display: "block",
    color: "#88c",
    fontSize: "1.5rem",
    fontSize : "1.2rem",
    marginTop : "6rem",
    zIndex : '10',
    [theme.breakpoints.up('sm')]:{
      display: "none"
    },
    '&:hover':{
      color : "white"
    },
  },
  search: {
    position: 'relative',
    height: "0.2rem",
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(2),
    marginLeft: '3rem',
    width: '100%',
    maxWidth : "40rem",
    marginTop: "-2rem",
    [theme.breakpoints.up('xs')]:{
      marginTop: "-4rem"
    },
    [theme.breakpoints.up('sm')]:{
      marginTop: "-4rem"
    },
    [theme.breakpoints.up('md')]:{
      marginTop: "-4rem"
    },
    [theme.breakpoints.down('sm')]:{
      marginLeft: "1rem"
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: "#aac",
    marginTop: "1.5rem",
    width: '60%',
     backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    [theme.breakpoints.down('xs')]:{
      height: "1.5rem",
      marginTop : "2rem"
    }
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '40%',
    MaxHeight: '1rem',
  },
  searchBtn:{
    color: "#88c",
    transform : "translateX(-4rem)",
    [theme.breakpoints.down('sm')]:{
      width: "1rem",
      transform : "translateX(-3rem)",
    },
    // [theme.breakpoints.down('xs')]:{
    //     width : "0.1rem"
    // },
  // sectionDesktop: {
  //   display: 'none',
  //   [theme.breakpoints.up('md')]: {
  //     display: 'flex',
  //   },
  // },
  // sectionMobile: {
  //   display: 'flex',
  //   [theme.breakpoints.up('md')]: {
  //     display: 'none',
  //   },
  },
  btn14:{
      background : 'rgba(155, 155, 155, 0.25)',
      color: "#222",
      fontSize :"0.8rem",
      backdropFilter: "blur( 4px )",
      boxShadow: "0 4px 12px 0 rgba( 31, 38, 135, 0.37 )",
      webkitBackdropFilter: "blur( 4px )",
      borderRadius: "3px",
      border: "1px solid rgba( 255, 255, 255, 0.18 )",
      padding : '0.4rem',
      position : "absolute",
      right: "10rem",
      top : "1.5rem",
  },
  cart:{
    color: "#88c",
    float: "right",
    [theme.breakpoints.down('xs')]:{
     transform : "translateX(-1rem)",
    },
    '&:hover':{
      color : "white"
    },
    zIndex: "10",
  },
  // cartBox:{
  //   position: "absolute",
  //   right: "2rem"
  // },
  cartNum:{
    border : "2.5px solid #88c",
    padding : '0 0.5rem',
    borderRadius : "50%",
    [theme.breakpoints.down('xs')]:{
      padding : '0 0.2rem',
      transform : "translateX(-0.5rem)",
      border : "2.5px solid transparent",
    }
  }
}));

export default function Header() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const {setSearchResultValue, cart, sidebarOpen, setSidebarOpen,
   setOverlay} = useAppContext()

  const [inputValue,setInputValue] = React.useState('')
  // const [setSearchResultValue, setSearchResultValue] = useState([])
  useEffect(()=>{
    console.log('setbaroprn', sidebarOpen)
  },[sidebarOpen])

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const initiateSearch = async()=>{

    const filter = {
      or : [
        {name : {eq : inputValue}},
        {tags : {eq : inputValue}},
        {owner : {eq : inputValue}}
      ]
    }

    const searchResult = await API.graphql(graphqlOperation( searchShops, {filter}))
    setSearchResultValue(searchResult.data.searchShops.items)
    
  }



  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      
      <MenuItem>
        {/* <NavLink to='/create-shops.js'>
        Create New Shop
        </NavLink> */}
         {/* <Link to="/create-shop">
            Create Shop
        </Link> */}
      </MenuItem>
      {/* 
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem> */}
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (<>
  {sidebarOpen && <SideBar />}
    <div className={classes.grow} className='navbar'>
      
        <Toolbar>
          <Grid container className={classes.gridBox}>
          <Grid item xs={9} sm={5} md={5} lg={5}>
          <Typography className={classes.title} variant="h6" noWrap>
              <Link to='/'>
            <img src={logo} alt='Logo' className={classes.img} />
            </Link>
          </Typography>
          </Grid>
          <Grid item xs={9} sm={5} md={5} lg={5} className={classes.btngrp}>
            
              <Button size='small'className={classes.btn}>
                <Link to='/about' className={classes.link} > About </Link>
              </Button>
              <Button variant='primary' size='small'className={classes.btn}>
                <Link to='/home' className={classes.link}>Courses</Link>
              </Button>
              <Button variant='primary' size='small'className={classes.btn}>
                <Link to='/contact' className={classes.link}>Contact</Link>
              </Button>
            
          </Grid>
          <Grid item xs={2} sm={1} md={1} lg={1} className={classes.cartBox}>
          <Link to='/cart'>
          <Button className={classes.cart}><ShoppingCartIcon />
          <span className={classes.cartNum}>{cart.length}</span>
          </Button></Link>
          </Grid>
          <Grid item xs={1} sm={1} md={1} lg={1} className={classes.menu}>
          <span onClick={()=>setOverlay(true)}>
            <FaAlignJustify onClick={()=>setSidebarOpen(true) }/>
          </span>
          </Grid>
          <Grid item xs={12} sm={12} md={11} lg={11}>
          <div className={classes.search}>
            <InputBase
            value={inputValue}
            onChange={(e)=>setInputValue(e.target.value)}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
           <Button onClick={initiateSearch} className={classes.searchBtn}><SearchIcon /></Button>
          </div>
          </Grid>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
        </div>
        </Grid>
        </Toolbar>
  
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="1" d="M0,32L60,74.7C120,117,240,203,360,240C480,277,600,267,720,250.7C840,235,960,213,1080,208C1200,203,1320,213,1380,218.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
    </div>
    </>
  );
}
