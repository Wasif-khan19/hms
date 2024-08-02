import axios from 'axios'
import React, { useEffect } from 'react'
import Dashboard from './Dashboard';

function Home() {
 
  const getUserData =async ()=>{
    
    try {

      const res = await axios.post('http://192.168.100.24:4000/api/users/getUserData',{},{
        headers:{
          Authorization: "Bearer " + localStorage.getItem('token')
         
        }
      })
     

    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    getUserData()
  }, [])
  
  return (
    <Dashboard>
      Welcome
    </Dashboard>
  )
}

export default Home