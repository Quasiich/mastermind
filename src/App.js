import './App.css';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import ParticlesBg from 'particles-bg';
import React, { useEffect, useState } from "react";
import Clarifai from "clarifai"

const app = new Clarifai.App({
      apiKey: '94d0d6c8abab45ad9b7cba096ad295b9',
   })
const returnClarifaiRequestOptions = (imageURL) => {
   // Your PAT (Personal Access Token) can be found in the Account's Security section
   const PAT = 'd583a589bdd14f82ae718401fddfc597';
   // Specify the correct user_id/app_id pairings
   // Since you're making inferences outside your app's scope
   const USER_ID = 'quasiich';
   const APP_ID = 'my-first-application';
   // Change these to whatever model and image URL you want to use
   const MODEL_ID = 'face-detection';
   const IMAGE_URL = {imageURL};

   const raw = JSON.stringify({
      "user_app_id": {
         "user_id": USER_ID,
         "app_id": APP_ID
      },
      "inputs": [
         {
            "data": {
               "image": {
                  "url": IMAGE_URL
               }
            }
         }
      ]
   });

   let requestOptions = {
      method: 'POST',
      headers: {
         'Accept': 'application/json',
         'Authorization': 'Key ' + PAT
      },
      body: raw
   };

   return requestOptions
}

function App () {
   const [input, setInput] = useState('');

   const onInputChange = (event) => {
      console.log(event.target.value);
   }

   const onButtonSubmit = () => {
      fetch("https://api.clarifai.com/v2/models/face-detection/outputs", returnClarifaiRequestOptions(input))
         .then(response => response.text())
         .then(result => console.log(result))
         .catch(error => console.log('error', error));
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