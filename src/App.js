import './App.css';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import ParticlesBg from 'particles-bg';
import React, { useEffect, useState } from "react";

function App () {
   const [input, setInput] = useState('');

   const onInputChange = (event) => {
      console.log(event.target.value);
   }

   const onButtonSubmit = () => {
      console.log("click")
   }

   return(
         <div className="App">
            <ParticlesBg className={'particles'} type="cobweb" num={150} bg={true}/>
            <Navigation/>
            <Logo/>
            <Rank/>
            <ImageLinkForm
               onInputChange={onInputChange}
               onButtonSubmit={onButtonSubmit}/>
            {/*  <FaceRecognition />}*/}
         </div>
   );
}


export default App;
