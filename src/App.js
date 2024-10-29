import './App.css';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import ParticlesBg from 'particles-bg';

function App() {
  return (
    <div className="App">
       <ParticlesBg className={'particles'} type="cobweb" num={150} bg={true}/>
      <Navigation />
      <Logo />
       <Rank />
       <ImageLinkForm />
      {/*  <FaceRecognition />}*/}
    </div>
  );
}

export default App;
