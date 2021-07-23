import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator } from 'aws-amplify-react'
import { AmplifyTheme, Authenticator } from 'aws-amplify-react'
import Amplify, { Auth } from "aws-amplify";
import awsExports from "./aws-exports";
import {Header, Footer} from './components'
import {useAppContext} from './context'
import {Overlay, WarningModal} from './components'
import {LandingPage, Home, ShopDetails, ProductDetails, Cart} from './pages'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
Amplify.configure(awsExports);

function App() {
 const [userInfo, setUserInfo] = useState({})
 const [loading, setLoading] = useState(false)
 const {openModal, itemExists, overlayOpen} = useAppContext()

  useEffect(()=>{
    // setLoading(true)
    let isSubscribed = true
    const fetchUser = async()=>{
    const userInfo = await Auth.currentUserInfo()
    setUserInfo(userInfo)
    }
  fetchUser()

  return ()=> isSubscribed = false

  },[])

  // if(loading){
  //   return <div>Loading...</div>
  // }

  return (
    <>
    <Router>
      <Header />
      {overlayOpen && <Overlay />}
      {itemExists && <><Overlay /><WarningModal /></>}
      <Switch>
        <Route path='/' exact>
            <LandingPage />
        </Route>
        <Route path='/home' exact>
            <Home userInfo={userInfo}/>
        </Route>
        <Route path='/shopdetails/:shopid' exact>
            <ShopDetails userInfo={userInfo}/>
        </Route>
        <Route path='/product-details/:productid' exact>
          <ProductDetails />
        </Route>
        <Route path='/cart' exact >
            <Cart />
        </Route>
      </Switch>
     <Footer />
    </Router>
    </>
  );
}

const theme={
  ...AmplifyTheme,
  background: "green",
  button: {
    ...AmplifyTheme.button,
    background : 'rgba(0, 245, 212, 0.2)',
    boxShadow: "0 4px 12px 0 rgba( 31, 38, 135, 0.37 )",
    color: "#222",
  },
  input : {
     ...AmplifyTheme.input,
    color: "#006688",
    fontSize : "1.03rem",
    outline : "none",
    background : "lightgray"
  }
}
export default withAuthenticator(App,true, null, [], theme);
//export default App