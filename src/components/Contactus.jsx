import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
 const Contactus = () => {

    function submitter(e)
    {
        e.preventDefault()
        const formData = {
            name: e.target.name.value,
            email: e.target.email.value,
            mobile : e.target.mobile.value,
            subject : e.target.subject.value,
            message: e.target.message.value
        }
        axios.post(`${sessionStorage.getItem("urls")}/qikdial/contacts`,formData, {headers : {"X-CSRFtoken" : Cookies.get("csrftoken")}}).then((response) => {
            document.getElementById("rst_btn").click()
            toast.success("Thank you for Reaching out",{position:"bottom-left"})
        }).catch((error) => {
            console.log(error)
            toast.error("Entered Email already exists",{position:"bottom-left"})
        })
    }

    return(
        <div id="main_wrapper"> 
        <Header />
        <br />
        
        <div class="container">
            <div class="row"> 
            <div class="col-md-8">
                <section id="contact" class="margin-bottom-70">
                <h4><i class="sl sl-icon-phone"></i> Contact Form</h4>          
                <form id="contactform" onSubmit={(e) => submitter(e)}>
                    <div class="row">
                    <div class="col-md-6">  
                        <input name="name" type="text" placeholder="Name" required />                
                    </div>
                    <div class="col-md-6">                
                        <input name="email" type="email" placeholder="Email" required />                
                    </div>
                    <div class="col-md-6">                
                        <input name="mobile" type="tel" pattern="[0-9]{10}" maxLength={10} placeholder="Mobile" required />                
                    </div>
                    <div class="col-md-6">
                        <input name="subject" type="text" placeholder="Subject" required />              
                    </div>
                    <div class="col-md-12">
                        <textarea name="message" cols="40" rows="2" id="comments" placeholder="Your Message" required></textarea>
                    </div>
                    </div>            
                    <input type="submit" class="submit button" id="submit" value="Submit" />
                    <button style={{display:'none'}} id="rst_btn" type="reset" ></button>
                </form>
                </section>
            </div>
            
            <div class="col-md-4">
                <div class="utf_box_widget margin-bottom-70">
                    <h3><i class="sl sl-icon-map"></i> Office Address</h3>
                    <div class="utf_sidebar_textbox">
                    <ul class="utf_contact_detail">
                        <li><strong>Phone:-</strong> <span>+91 8888888888</span></li>
                        <li><strong>Web:-</strong> <span><a href="https://qikdial.com/">https://qikdial.com/</a></span></li>
                        <li><strong>E-Mail:-</strong> <span><a href="mailto:info@qikdial.com">info@qikdial.com</a></span></li>
                        <li><strong>Address:-</strong> <span>Capace Software Pvt Ltd.</span></li>
                    </ul>
                    </div>	
                </div>
            </div>
            </div>
        </div>

        <section className="utf_cta_area_item utf_cta_area2_block">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="utf_subscribe_block clearfix">
                                <div className="col-md-8 col-sm-7">
                                    <div className="section-heading">
                                        <h2 className="utf_sec_title_item utf_sec_title_item2">Subscribe to Newsletter!</h2>
                                        <p className="utf_sec_meta">
                                            Subscribe to get latest updates and information.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-5">
                                    <div className="contact-form-action">
                                        <form onSubmit={(e) => {
                                            e.preventDefault()
                                            axios.post(`${sessionStorage.getItem("urls")}/qikdial/contacts`,{email : e.target.email.value }, {headers : {"X-CSRFToken" : Cookies.get("csrftoken") }}).then((response) => toast.success("Subscribed successfully",{position:"bottom-right"}))}} >
                                            <span className="la la-envelope-o"></span>
                                            <input className="form-control" type="email" name="email" placeholder="Enter your email" required="" />
                                            <button className="utf_theme_btn" type="submit">Subscribe</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </section>
        
        <Footer />
        <div id="bottom_backto_top"><a href="#"></a></div>
        </div>
    )
}

export default Contactus;