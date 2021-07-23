import React from 'react'
import {useAppContext} from '../context'
import { fade, makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
	menuItems: {
		background : "navy",
		zIndex : "30",
		height: "100vh",
		width: "85%",
		position :"fixed",
		display: "block",
		padding: "2rem 1rem",
		top: "0",
		left: "0",
	},
	linkItem:{
		color: "#fff",
		padding: "1rem 0.5rem",
	},
	closeBtn:{
		float :'right',
	},
	btnGroup:{
		padding:""
	}
}))

const SideBar =()=>{
	const {setSidebarOpen, setModal, setOverlay} = useAppContext()
	const classes = useStyles()

	return <div className={classes.menuItems}>
		<Button className={classes.closeBtn} color ='secondary' onClick={()=>setOverlay(false)}>
			<CloseIcon onClick={()=>setSidebarOpen(false)}/>
		</Button>
		<ButtonGroup
		orientation="vertical"
        color="primary"
        aria-label="vertical contained primary button group"
        variant="text"
        className={classes.btnGroup}
        fullWidth
		>
		<Button className={classes.linkItem} onClick={()=>setOverlay(false)} fullWidth>
			<Link to='/about' onClick={()=>setSidebarOpen(false)}> About </Link>
		</Button>
		<Button className={classes.linkItem} onClick={()=>setOverlay(false)} fullWidth>
			<Link to='/home' onClick={()=>setSidebarOpen(false)}> Cousers </Link>
		</Button>
		<Button className={classes.linkItem} onClick={()=>setOverlay(false)} fullWidth>
			<Link to='/contact' onClick={()=>setSidebarOpen(false)}> Contact </Link>
		</Button>
		</ButtonGroup>
	</div>
}
export default SideBar