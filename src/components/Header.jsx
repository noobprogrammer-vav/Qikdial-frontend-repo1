import React, { useEffect } from "react";
import logo from '../../public/images/q_logo.jpg';

const Header = (props) => {

    useEffect(() => {
        sessionStorage.setItem("urls","http://127.0.0.1:8000") //https://qikdial.com http://127.0.0.1:8000
        if(document.getElementById(props.head) != null){
            document.getElementById(props.head).classList.add('current')
        }

        if(sessionStorage.getItem("call_login") == "yes"){
          window.location.href = '/'
          document.getElementById("logreg").click()
          sessionStorage.removeItem("call_login")
        }

    },[])


    function handleLogin(e){
      e.preventDefault()
      const formData = {
        email : e.target.email.value,
        password : e.target.password.value
      }
      console.log('formData :>> ', formData);
    }

    function handleRegistration(e){
      e.preventDefault()
      const formData = {
        email : e.target.email.value,
        password : e.target.password.value,
        name : e.target.name.value,
        phone : e.target.phone.value
      }
      console.log('formData :>> ', formData);
    }


    return(
    <div>
        <header id="header_part" className="fullwidth"> 
          <div id="header">
          <div className="container"> 
              <div className="utf_left_side"> 
              <div id="logo"> <a href="/"><img src={logo} alt="" /></a> </div>
              <div className="mmenu-trigger">
                  <button className="hamburger utfbutton_collapse" type="button">
                      <span className="utf_inner_button_box">
                          <span className="utf_inner_section"></span>
                      </span>
                  </button>
              </div>
              <nav style={{float:"right"}} id="navigation" className="style_one">
                  <ul id="responsive">
                  <li><a id="benefits" href="#">Benefits</a></li>			  
                  <li><a id="plan" href="#">Plan</a> </li>
                  <li><a id="list" href="#">List Your Business</a></li>
                  <li><a id="add" href="#">Post a Free Add</a></li>             
                  </ul>
              </nav>
              <div className="clearfix"></div>
              </div>
              <div className="utf_right_side">
              <div className="header_widget"> <a href="/login" id="logreg" className="button border sign-in x1"><i className="fa fa-sign-in"></i> Login / Register</a></div>
              </div>
          </div>
          </div>    
        </header>
        <div class="clearfix"></div>
    </div>

    )
}

export default Header;