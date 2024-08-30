import React, { useEffect } from "react";
import logo from '../../public/images/q_logo.jpg';
import axios from "axios";
import Cookies from 'js-cookie'

const Header = (props) => {

    useEffect(() => {
        sessionStorage.setItem("urls","https://qikdial.com") //https://qikdial.com http://127.0.0.1:8000
        if(document.getElementById(props.head) != null){
            document.getElementById(props.head).classList.add('current')
        }

        if(sessionStorage.getItem("call_login") == "yes"){
          window.location.href = '/'
          document.getElementById("logreg").click()
          sessionStorage.removeItem("call_login")
        }

        if(sessionStorage.getItem("merchant") == "true"){
          document.getElementById("the_header_dashboard").style.display = 'block'
        }

    },[])


    function logouter(){
      if(sessionStorage.getItem("token") != null){
        axios.post(`${sessionStorage.getItem("urls")}/qikdial/logout`,{token : sessionStorage.getItem("token")}, {headers : {"X-CSRFToken" : Cookies.get("csrftoken") }}).then((response) => {
          sessionStorage.removeItem("token")
          sessionStorage.removeItem("merchant")

          window.location.href = '/login'
        })
      }
      else{
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("merchant")
        window.location.href = '/login'
      }
    }

    function merchnt_nav()
    {
      if(sessionStorage.getItem("token") != null){
        window.location.href = '/merchant/add_listings'          // need to be changer
      }
      else{
        window.location.href = '/login/?nav=1'            // with data
      }
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
                  <li><a id="plan" href="/about">Plans</a> </li>
                  <li><a id="list" href="#">List Your Business</a></li>
                  <li><a id="add" onClick={merchnt_nav}>Post a Free AD</a></li>   
                  <li style={{display:'none'}} id="the_header_dashboard"><a href="/merchant/dashboard" id="add">Dashboard</a></li>
                  </ul>
              </nav>
              <div className="clearfix"></div>
              </div>
              <div className="utf_right_side">
              <div className="header_widget"> <a onClick={logouter} id="logreg" className="button border sign-in x1"><i className="fa fa-sign-in"></i> {sessionStorage.getItem("token") != null ? 'Logout' : 'Login / Register'}</a></div>
              </div>
          </div>
          </div>    
        </header>
        <div class="clearfix"></div>
    </div>

    )
}

export default Header;