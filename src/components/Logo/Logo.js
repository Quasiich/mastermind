import React from 'react';
import Tilt from 'react-parallax-tilt'
import logo from './logo.png'
import './logo.css'

const Logo = () => {
   return (
      <div className='center ma4 mt0'>
         <Tilt tiltEnable={false} scale={1.1} transitionSpeed={3000} >
            <div className=' br2 shadow-1' style={{ height: 150, width: 150}}>
               <h1>
                  <img src={logo} alt="Mastermind Logo"/>
               </h1>
            </div>
         </Tilt>
      </div>
   )
}

export default Logo;