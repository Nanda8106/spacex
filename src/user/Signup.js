import React, { useState } from "react";
import {Link, Redirect} from "react-router-dom";
import { signup } from "../auth/helper";
import Base from "../core/Base";
import Loading from "../core/Loading";



const Signup = () => {
    const [values, setValues] = useState({
        username : "",
        email: "",
        password : "",
        error:"",
        success : false,
        loading : false,
        redirect : false,   
    })

    const {username, email, password, error, success, loading, redirect} = values;

    const handleChange = name => event => {
        setValues({...values, error:false, success:false, [name]:event.target.value})
    }
    
    const onSubmit = event => {
        event.preventDefault();
        setValues({...values, error:false, success:false, loading:true})
        signup({username, email, password})
        .then(data => {
            if(data.error){
                setValues({...values, error:data.error, success:false, loading:false})
            }
            else{
              setValues({
                  ...values,
                  username:"",
                  email:"",
                  password:"",
                  error:"",
                  loading:false,
                  success:true,
                  redirect:true,
              })  
            }
        })

    }
    const didLoading = (loading) => {
        if(loading){
            return <Loading type="spin" color="#fffff"/>
        }
    }

    const successMessage = () => {
        if(success){
            alert("successfully crated your account!!")
        }
    }
    const errorMessage = () => {
        return (
            <div style={{display: error ? "":"none"}}>
               <p className="error">
                   {error}
               </p>
           </div>
        )
    }
    const didRedirect = () => {
        if(redirect){
           return <Redirect to="/signin"/>
        }
    }

    const signupForm = () => {
        return (
            <div className="login">
                <form>
                    {successMessage()}
                    {errorMessage()}
                    <label>Email</label><br/>
                    <i className="fa fa-envelope"></i>
                    <input type="text" onChange={handleChange("email")} value={email}/><br/>

                    <label>Username</label><br/>
                    <i className="fa fa-user"></i>
                    <input type="text" onChange={handleChange("username")} value={username}/><br/>

                    <label>Password</label><br/>
                    <i className="fa fa-key"></i>
                    <input type="password" onChange={handleChange("password")} value={password}/>
                    
                    <button onClick={onSubmit}>Sign Up</button>
                </form>
                <p className="account">Already have an account? <Link to="/signin">Sign In</Link> here</p>
            </div>
        )
    }

    return (
        <Base>
            {didLoading(loading)}
            {signupForm()}
            {didRedirect()}
        </Base>
    )
}


export default Signup;