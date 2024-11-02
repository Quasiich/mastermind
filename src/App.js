import './App.css';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import ParticlesBg from 'particles-bg';
import React, { Component} from "react";

const returnRequestOptions = (ImageUrl) => {

   const PAT = 'd583a589bdd14f82ae718401fddfc597';
   const USER_ID = 'quasiich';
   const APP_ID = 'my-first-application';
   // const MODEL_ID = 'face-detection';
   const IMAGE_URL = ImageUrl;


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
         imageUrl: ""
      }
   }

   onInputChange = (e) => {
      this.setState({input: e.target.value});
   }

   onButtonSubmit = () => {
      this.setState({imageUrl: this.state.input})
      fetch("https://api.clarifai.com/v2/models/face-detection/outputs", returnRequestOptions(this.state.input))
         .then(response => response.json())
         .then(result => console.log(result.outputs[0].data.regions[0].region_info.bounding_box))
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
            <FaceRecognition imageUrl={this.state.imageUrl}/>
         </div>
      );
   }
}


export default App;


