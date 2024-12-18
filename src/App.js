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
      this.setState({box: box}) //this.setState({box})
   }

   onInputChange = (e) => {
         this.setState({input: e.target.value});
      }

   onButtonSubmit = () => {
      this.setState({ imageUrl: this.state.input});
         fetch("https://agile-sea-61978-e465594aa5c4.herokuapp.com/imageurl", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
               input: this.state.input
            })
         })
            .then(res => res.json())
            .then(results => {
            if (results) {
               fetch("https://agile-sea-61978-e465594aa5c4.herokuapp.com/image", {
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
               this.displayFaceBox(this.calculateFaceLocation(results))
         })
         .catch(error => console.log('error', error))
         }

   onRouteChange = (route) => {
      if (route === "signout") {
         this.setState(initialState);
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


