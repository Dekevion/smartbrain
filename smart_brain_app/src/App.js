import React, {Component} from 'react';
import logo from './logo.svg';
// import './App.css';
import Navigation from "./Components/Navigation";
import Logo from "./Components/Logo";
// import 'logo.css'
import ImageLinkForm from "./Components/ImageLinkForm";
import Rank from "./Components/Rank";
import FaceRecognition from "./Components/FaceRecognition";
import Particles from "react-particles-js";
import Clarifai from 'clarifai';
import Sign_in from "./Components/Sign_in"
import Register from "./Components/Register";

const app = new Clarifai.App({
    apiKey: 'b8364124c9f64430befec37bfb2e2ddb'
});

const particleOptions =
    {
        particles: {
            number: {
                value: 30,
                density: {
                    enable: true,
                    value_area: 800,
                }
            }
        }
    };

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: " ",
            imageurl: " ",
            box: {},
            route: 'sign_in',
            isSignedIn: false,
            user: {
                id: '',
                name: '',
                password: "",
                email: '',
                entries: 0,
                joined: '',
            }
        }
    }

    loadUser = (data) => {
        this.setState(({
            user: {
                id: data.id,
                name: data.name,
                password: data.pass,
                email: data.email,
                entries: data.entries,
                joined: data.joined,
            }
        }))
};

    onInputChange = (e) => {
        console.log(e.target.value);
        this.setState({input: e.target.value})
    };
    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputImage');
        const width = Number(image.width);
        const height = Number(image.height);
        console.log("width " + width, "height: " + height);
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)
        }
    };
    dispayFaceBox = (box) => {
        console.log({box});
        this.setState({box: box})
    };

    onSubmit = () => {
        console.log('click');
        this.setState({imageurl: this.state.input});
        app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
            .then(response => this.dispayFaceBox(this.calculateFaceLocation((response)))
                .catch(err => console.log(err)))
    };

    onRouteChange = (route) => {
        if (route === 'signout'){
            this.setState({isSignedIn: false})
        } else if (route ==='home') {
            this.setState({isSignedIn: true})
        }
        this.setState({route: route})
    };

    // componentDidMount() {
    //     fetch('http://localhost:3001')
    //         .then(response => response.json())
    //         .then(data =>console.log(data))
    // }

    render() {
        
        return (
            <div>
                <Particles className='particles'
                           params={particleOptions}
                />

                <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}></Navigation>


                     <div>
                        <Logo/>
                        <Rank></Rank>
                        <ImageLinkForm input_change={this.onInputChange} click={this.onSubmit}></ImageLinkForm>
                        <FaceRecognition box={this.state.box} imageurl={this.state.imageurl}></FaceRecognition>
                    </div>



                            {/*<Sign_in onRouteChange={this.onRouteChange}></Sign_in>*/}
                            {/* <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} sign={this.state.isSignedIn} user={this.state.user}></Register>*/}




            </div>
        );
    }
}

export default App;
