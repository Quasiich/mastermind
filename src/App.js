import './App.css';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import ParticlesBg from 'particles-bg';
import React, { Component} from "react";
// import Clarifai from 'clarifai'

// const app = new Clarifai.App({
//    apiKey: '94d0d6c8abab45ad9b7cba096ad295b9'
// })

const returnRequestOptions = () => {

   const PAT = 'd583a589bdd14f82ae718401fddfc597';
   const USER_ID = 'quasiich';
   const APP_ID = 'my-first-application';
   // const MODEL_ID = 'face-detection';
   const IMAGE_URL = 'https://samples.clarifai.com/metro-north.jpg';


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

   return {
      method: 'POST',
      headers: {
         'Accept': 'application/json',
         'Authorization': 'Key ' + PAT
      },
      body: raw
   };

}

class App extends Component {
   constructor() {
      super();
      this.state = {
         input: "",
      }
   }

   onInputChange = (e) => {
      console.log(e.target.value);
   }

   onButtonSubmit = () => {
      console.log('click')
      fetch("https://api.clarifai.com/v2/models/face-detection/outputs", returnRequestOptions())
         .then(response => response.json())
         .then(result => {

            const regions = result.outputs[0].data.regions;

            regions.forEach(region => {
               // Accessing and rounding the bounding box values
               const boundingBox = region.region_info.bounding_box;
               const topRow = boundingBox.top_row.toFixed(3);
               const leftCol = boundingBox.left_col.toFixed(3);
               const bottomRow = boundingBox.bottom_row.toFixed(3);
               const rightCol = boundingBox.right_col.toFixed(3);

               region.data.concepts.forEach(concept => {
                  // Accessing and rounding the concept value
                  const name = concept.name;
                  const value = concept.value.toFixed(4);

                  console.log(`${name}: ${value} BBox: ${topRow}, ${leftCol}, ${bottomRow}, ${rightCol}`);

               });
            });

         })
         .catch(error => console.log('error', error));
   }

   render() {
      return (
         <div className="App">
            <ParticlesBg className={'particles'} type="cobweb" num={150} bg={true}/>
            <Navigation/>
            <Logo/>
            <Rank/>
            <ImageLinkForm
               onInputChange={this.onInputChange}
               onButtonSubmit={this.onButtonSubmit}/>
            {/*  <FaceRecognition />}*/}
         </div>
      );
   }
}


export default App;


