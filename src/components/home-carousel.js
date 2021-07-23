import React, {useState, useEffect} from 'react'
import flutter from '../assets/flutter.jpg'
import react from '../assets/react.png'
import node from '../assets/Node.jpg'
import python from '../assets/python.jpg'

import { fade, makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme)=>({
  carouselBox:{
    display: "flex",
    alignItems : "center",
    justifyContent : "center",
    height: "auto",
    width:  "100%",
    position: "relative",
    top: "10rem"
  },
  img:{
    width: "30rem",
    height: "10rem",
    display: "inline-block",
    position : "absolute",
    marginRight: "200"
  }
}))

const images = [
  {
    id : 4,
    name: "React",
    url : react
  },
  {
    id : 3,
    name: "Flutter",
    url : flutter
  },
  {
    id : 2,
    name: "Node",
    url : node
  },
  {
    id : 1,
    name: "Python",
    url : python
  },

]

const HomeCarouse =()=>{
  const classes = useStyles()
  const [index, setIndex] = useState(1)



  useEffect(()=>{
   const interv = setInterval(()=>{
      if(index == 4){
        setIndex(1)
      }else{
        setIndex(prev =>{
          return prev - 1
        })
      }
    },2000)

      return ()=>{
        clearInterval(interv)
      }

  },[index])

  return <>
    {images.map(image =>{
      const {id, name, url} = image
      return <div key ={id} className={classes.carouselBox}>
          <img src ={url}  className={`${index != id ? `${classes.img}` : `${classes.img} slideImage` }`} alt={name}/>
      </div>
    })}
    

  </>
}


export default HomeCarouse