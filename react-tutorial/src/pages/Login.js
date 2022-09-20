import React from "react";
import axios from 'axios';

import erasmus from "./logo/img_avatar2.png"
import hems from "./logo/hems.jpg"

class Login extends React.Component{

    constructor(props){
        super(props)

        this.state =  {
            email: '',
            password: ''
        }
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = e =>{
        e.preventDefault()
        console.log(this.state)
        axios.post('http://192.168.137.1:3000/api/login', this.state)
        .then(response =>{
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
    }

    render() {

        const { email, password } = this.state

        return (
            <div>
                
                <div class="w3-top">
                    <div class="w3-bar w3-theme1" id="myNavbar">
                    <a href="/" class="w3-bar-item w3-text-white w3-button w3-dark-gray"> ⬅ Back</a>
                    <a href="/impress" class="w3-bar-item w3-button w3-text-white w3-right w3-dark-gray">Legal notice</a>
                    </div>
                </div>

                <div class="imgcontainer w3-hide-small">
                    <img src={erasmus} alt="Avatar" class="avatar"/>
                    <img src={hems} alt="Avatar2" class="avatar"/>
                </div>

                <div class="center">

                <div class=" w3-center w3-hide-large w3-margin-top">
                    <img src={erasmus} alt="Avatar" class="avatar"/>
                    <img src={hems} alt="Avatar2" class="avatar"/>

                    <h1>Login</h1>
                </div>

                <div class="w3-hide-small">

                    <h1>[WebseiteName] <br/>Login</h1>
                </div>

                

                    <form onSubmit={this.submitHandler}> 

                            <div class="txt_field">
                            <input type="text" id="email" name="email" value={email} onChange = {this.changeHandler} required/>
                            <span></span>
                            <label>Enter Email</label>
                            </div>

                            <div class="txt_field">
                            <input type="password" id="password" name="password" value={password} onChange = {this.changeHandler} required/>
                            <span></span>
                            <label>Enter Password</label>
                            </div>

                            <div class="pass"><a href="/frgtpass">Forgot Password?</a></div>

                            <input type="submit" value="Login"></input>

                            <div class="signup_link">

                            <label>
                                <input type="checkbox" checked="checked" name="remember"/><span>  Remember me</span>
                            </label>

                            <br/>
                            <br/>

                            <a href="/register" class="w3-button w3-orange">+ Register now</a>

                            <br/>

                            <a href="/country" class="w3-button w3-green w3-margin left">Continue without Login !</a>

                            <br/>

                            </div>
                     </form>

                     
                </div>
                            <div class="footer">
                                <p>&copy; 2019 | 2022 GreenMedia | Erasmus+ FinalBuild </p>
                            </div>
            </div>
      );
    }
}

export default Login;