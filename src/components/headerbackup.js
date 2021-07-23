import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Link } from 'react-router-dom';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import {searchShops} from '../graphql/queries'
import {useAppContext} from '../context'
import logo from "../assets/logo.png"
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  img:{
    width: "20rem",
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
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
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
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
    color: "#d52211",
  },
  cartNum:{
    border : "1px solid #d52211",
    padding : '0 0.5rem',
    borderRadius : "50%"
  }
}));

export default function Header() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const {setSearchResultValue, cart} = useAppContext()

  const [inputValue,setInputValue] = React.useState('')
  // const [setSearchResultValue, setSearchResultValue] = useState([])


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

  return (
    <div className={classes.grow} className='navbar'>
      
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
              <Link to='/'>
            <img src={logo} alt='Logo' className={classes.img} />
            </Link>
          </Typography>
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
           <Button onClick={initiateSearch}><SearchIcon /></Button>
          </div>
          <Link to='/cart'>
          <Button className={classes.cart}><ShoppingCartIcon />
          <span className={classes.cartNum}>{cart.length}</span>
          </Button></Link>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
        </div>
        </Toolbar>
      
      {renderMobileMenu}
      {renderMenu}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="1" d="M0,32L60,74.7C120,117,240,203,360,240C480,277,600,267,720,250.7C840,235,960,213,1080,208C1200,203,1320,213,1380,218.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
    </div>
  );
}
