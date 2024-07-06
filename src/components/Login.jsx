import React from 'react'
import Header from './Header'
import Footer from './Footer'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate()

  async function handleLogin(e){
    e.preventDefault()
    const formData = {
      email : e.target.email.value,
      password : e.target.password.value
    }
    const response = await axios.post(`${sessionStorage.getItem("urls")}/qikdial/login`, formData).catch((err) => console.log(err))
    if(response != undefined)
    {
        sessionStorage.setItem("token",response.data.token)
        if(response.data.admin){
            window.location.href = "/admin/dashboard"
        }
        else{
            navigate("/",{state:"yes"})
        }
    }
    else{
        toast.warning("Invalid Credentials",{position:"bottom-left"})
    }
  }
  
  async function handleRegistration(e){
    e.preventDefault()
    if(e.target.pwd.value == e.target.repwd.value)
    {
      const formData = {
        name : e.target.name.value,
        email : e.target.email.value,
        phone : e.target.phone.value,
        password : e.target.pwd.value,
        city : e.target.city.value,
        is_merchant : e.target.is_merchant.checked
      }
      const response = await axios.post(`${sessionStorage.getItem("urls")}/qikdial/signup`, formData).catch((error) => {
        toast.warning("error", {position:"bottom-left"})
      })
            
      if(response != undefined)
      {
          if(e.target.is_merchant.checked)
          {
              sessionStorage.setItem("merchant","true")
          }
          else{
              sessionStorage.setItem("merchant","false")
          }
          sessionStorage.setItem("token",response.data.token)
          navigate("/",{state : "yes"})
      }
    }
    else{
      toast.error("Passwords does't match", {position:"bottom-left"})
    }
  }
// style={{backgroundImage: `url(./public/images/city_search_background.jpg)`}}
  return (
    <div >
        <Header />
        <div className="container justify-content-center text-center" style={{padding:'2%', marginTop:'5%', marginBottom:'5%',}}>
            <center>
                    <div style={{width:'50%'}} className="small_dialog_header">
                    <h3>Sign In</h3>
                    </div>
                <div className="card" style={{width:'50%', backgroundColor:'white', boxShadow:'10px 10px 10px gray', borderRadius:'3%'}}>
                    <div className="card-body">
                        <ul className="utf_tabs_nav">
                            <li  className=""><a href="#tab1" >Log In</a></li>
                            <li><a href="#tab2">Register</a></li>
                        </ul>
                    <div className="tab_container alt" > 
                        <div className="tab_content" id="tab1" style={{display:'none'}}>
                        <form onSubmit={(e) => handleLogin(e)} >
                            <input required type="email" className="input-text" name="email" id="login_email" placeholder="Email" />
                            <input required className="input-text" type="password" name="password" id="login_password" placeholder="Password"/>
                            <span className="lost_password fl_left"> <a>Forgot Password?</a> </span><br />
                            <button type="submit" style={{width:'100%'}} className="button border margin-top-5">Login</button>
                        </form>
                        </div>
                        
                        <div className="tab_content" id="tab2" style={{display:'none'}}>
                            <form onSubmit={(e) =>handleRegistration(e)} >
                                <input required type="text" className="input-text" name="name" id="username" placeholder="Username" />
                                <input required type="email" className="input-text" name="email" id="register_email" placeholder="Email" />
                                <input required type='tel' className='input-text' name='phone' minLength={10} maxLength={10} pattern='[0-9]{10}' placeholder='Mobile' />
                                <input required type='text' className='input-text' name='city' placeholder='City name' />
                                <input required className="input-text" type="password" name="pwd" id="register_password" placeholder="Password" />
                                <input required className="input-text" type="password" name="repwd" id="register_password" placeholder="Confirm Password" />
                                <span style={{display:'inline-block'}}><label style={{float:'left'}}>Are you a Recruiter?</label></span><span><input style={{accentColor:'#ff2222',width:'20px', boxShadow:'none', marginLeft:'4px'}} className="form-control" name="is_merchant" type='checkbox' /></span>
                                <button type="submit" style={{width:'100%'}} className="button border fw margin-top-10" name="register" >Register</button>
                            </form>
                        </div>
                        </div>
                    </div>
                </div>
            </center>
        </div>
        <Footer />
    </div>
  )
}

export default Login