import React, {Component} from 'react';

class SignIn extends Component {
    // change_color = (e) => {
    //     e.target.style.color = "red"
    // }
    constructor(props) {
        super(props);
        this.state ={
            name: '',
            password: '',
            invalid: "",
            isLoggedIn: false
        }
    }

    onNameChange = (event) => {
    this.setState({name: event.target.value})
};
    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    };

    onSubmitSignIn = (e) => {
        e.preventDefault();
        let tempbody = {
            name: this.state.name,
             password: this.state.password
        };
       console.log(this.state);
       fetch('http://localhost:3001/sign',{
           method: 'POST',
           headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
           body: JSON.stringify(tempbody)
       })
       .then(response => response.json())
       .then(response => {
           if (response === 'success'){
             this.props.onRouteChange('home');
               console.log(response)

           } else {
               console.log("response2: " + response);
               // this.setState({isLoggedIn: true,})
           }
        })
    };
    render() {
        return (
            <div id='main'>
                {/*<article class="br2 ba dark-gray b--black-10 w-100 s-50m w-25-1 mw5 center"/>*/}
                {this.state.invalid}
                <form className='hover-bg-transparent'>
                    <div id='head'>

                        <div id='username'>
                            <label htmlFor="name"> Enter Username: </label>
                            <input onChange={this.onNameChange} type='text' className="name" />
                        </div>

                        <div id='password'>
                            <label htmlFor="password"> Enter Password: </label>
                            <input onChange={this.onPasswordChange} type='text' id="password"/>
                            <br/>

                        </div>
                        <button id={'sign'} onClick={this.onSubmitSignIn} className='shadow-5 dim ba bw2'>Sign In</button>
                    </div>
                    <div id='register'>
                        <p className='hover-white' onClick={() => this.props.onRouteChange('register')}>Not A user? Register</p>
                    </div>
                </form>

            </div>
        );
    }
}

export default SignIn;
