import React, {Component} from 'react';
import '../index.css'
class Register extends Component {
    constructor(props) {
        super(props);
        console.log("test");
        this.state ={
            name: '',
            password: '',
            invalid: "",
            isLoggedIn: false,
            email: "",
            isSignedIn: this.props.sign
        }
    }

    // componentWillLoad(){
    //     console.log("test");
    // }
    onNameChange = (event) => {
        this.setState({name: event.target.value})
    };
    onEmailChange = (event) => {
        this.setState({name: event.target.value})
    };
    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    };
    onSubmitSignIn = (e) => {
        console.log("This is the submit function");
        e.preventDefault();
        // let name_from_input = document.getElementById('name').value;
        // let pass_from_input = document.getElementById('password').value;
        // let email_from_input = document.getElementById('email');
        console.log(this.state);
        fetch('http://localhost:3001/reg',{
            method: 'post',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            body: JSON.stringify({
                email: this.props.user.email,
                name: this.props.user.name,
                password: this.props.user.password
                // name: name_from_input,
                // password: pass_from_input,
                // email: email_from_input
            })
        })
            .then(response => response.json())
            .then(data => {
                if(data === false){
                    this.setState({error: "username taken"});
                    console.log(data)
                } else {
                    console.log("response 2" + data);
                    this.setState({isSignedIn: true});
                    this.props.loadUser(data);
                    this.props.onRouteChange('home')

                }

                // if (user){
                //     this.props.loadUser(user);
                //     this.props.onRouteChange('home');
                //     console.log(user)
                //
                // } else {
                //     console.log("response2: " + user);
                //     // this.setState({isLoggedIn: true,})
                // }
            })
    };
    render() {

        return (
            <div>
                <h1> Create Account test</h1>
                <div id='main'>
                    {/*<article class="br2 ba dark-gray b--black-10 w-100 s-50m w-25-1 mw5 center"/>*/}
                    <form onSubmit={this.onSubmitSignIn}>
                        <div id='head'>

                            <div id='name'>
                                <label htmlFor="Username">  Username: </label>
                                <input onChange={this.onNameChange} type='text' className="name" />
                            </div>

                            <div id='email'>
                                <label htmlFor="email"> Enter Email </label>
                                <input onChange={this.onEmailChange} type='text' id="email"/>
                            </div>
                            <div id='password'>
                                <label htmlFor="password">  Password: </label>
                                <input onChange={this.onPasswordChange} type='text' id="password"/>
                                <br/>

                            </div>
                            <button id={'sign'}  class='shadow-5 dim ba bw2'>Create Account</button>
                        </div>

                    </form>

                </div>

            </div>
        );
    }
}

export default Register;