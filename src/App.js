import './App.css';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
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

const initialState = {
      input: "",
      imageUrl: "",
      box: {},
      route: "signin",
      isSignedIn: false,
      user: {
         id: "",
         name: "",
         email: "",
         entries: 0,
         joined: "",
      }
   }

class App extends Component {
   constructor() {
      super();
      this.state = initialState;
   }

   loadUser = (data) => {
      this.setState({user: {
            id: data.id,
            name: data.name,
            email: data.email,
            entries: data.entries,
            joined: data.joined,
      }})
   }

   calculateFaceLocation = (data) => {
      const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
      const image = document.getElementById("inputImage")
      const width = Number(image.width);
      const height = Number(image.height);
      return {
         leftCol: clarifaiFace.left_col * width,
         topRow: clarifaiFace.top_row * height,
         rightCol: width - (clarifaiFace.right_col * width),
         bottomRow: height - (clarifaiFace.bottom_row * height)
      }
   }

   displayFaceBox = (box) => {
      console.log(box);
      this.setState({box: box}) //this.setState({box})
   }

   onInputChange = (e) => {
         this.setState({input: e.target.value});
      }

   onButtonSubmit = () => {
      this.setState({imageUrl: this.state.input})
      fetch("https://api.clarifai.com/v2/models/face-detection/outputs", returnRequestOptions(this.state.input))
         .then(response => response.json())
         .then(results => {
            this.displayFaceBox(this.calculateFaceLocation(results))
            if (results) {
               fetch("http://localhost:3000/image", {
                  method: "PUT",
                  headers: {"Content-Type": "application/json"},
                  body: JSON.stringify({
                     id: this.state.user.id
                  }),
               })
                  .then(response => response.json())
                  .then(count => {
                     this.setState(Object.assign(this.state.user, { entries: count}))
                  })
                  .catch(console.log)
            }
         })
         .catch(error => console.log('error', error))
   }

   onRouteChange = (route) => {
      if (route === "signout") {
         this.setState({initialState});
      } else if (route === "home") {
         this.setState({isSignedIn: true});
      }
      this.setState({route: route})
   }

   render() {
      const { isSignedIn, imageUrl, route, box } = this.state;
      return (
         <div className="App">
            <ParticlesBg className={'particles'} type="cobweb" num={120} bg={true}/>
            <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
            {this.state.route === "home"
               ? <div>
                  <Logo/>
                  <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                  <ImageLinkForm
                     onInputChange={this.onInputChange}
                     onButtonSubmit={this.onButtonSubmit}/>
                  <FaceRecognition box={box} imageUrl={imageUrl}/>
               </div>
               : (
                  route === "signin"
                     ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                     : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>

               )

            }
         </div>
      );
   }
}


export default App;


