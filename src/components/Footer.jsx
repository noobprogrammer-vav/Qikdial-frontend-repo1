import axios from "axios";
import React, { useEffect, useState } from "react";

const Footer = () => {

    const [leftCategory,setLeftCategory] = useState()
    const [righttCategory,setRightCategory] = useState()


    useEffect(() => {
        axios.get(`${sessionStorage.getItem("urls")}/qikdial/category/`).then((response) => {

            setLeftCategory(response.data.slice(0,Math.round(response.data.length/2)).map((data,index) => <li key={index}><a href="#">{data.name}</a></li>))
            setRightCategory(response.data.slice(Math.round(response.data.length/2),).map((data,index) => <li key={index}><a href="#">{data.name}</a></li>))
            
            console.log();
        })
    },[])

    return(
        <div id="footer" className="footer_sticky_part"> 
        <div className="container">
        <div className="row">
            <div className="col-md-4 col-sm-12 col-xs-12"> 
            <h4>About Us</h4>
            <p>At Qikdial, we are dedicated to connecting businesses with their target audience. Our comprehensive business listing platform makes it easy for customers to discover and engage with local companies. With a user-friendly interface and a wide range of categories, we strive to be the go-to destination for finding the best products and services in your area.</p>          
            </div>
            <div className="col-md-2 col-sm-3 col-xs-6">
            <h4>Useful Links</h4>
            <ul className="social_footer_link">
                <li><a href="#">About us</a></li>
                <li><a href="#">Free Listing</a></li>
                <li><a href="#">Customer care</a></li>
                <li><a href="#">Sitemap</a></li>
            </ul>
            </div>
            <div className="col-md-4 col-sm-6 col-xs-12">
            <h4>Categories</h4>
            <div className="row">
                <div className="col-sm-6">
                    <ul className="social_footer_link">
                        {leftCategory}
                    </ul>
                </div>
                <div className="col-sm-6">
                    <ul className="social_footer_link">
                        {righttCategory}
                    </ul>
                </div>
            </div>
            </div>
            <div className="col-md-2 col-sm-3 col-xs-6">
            <h4>Corporate</h4>
            <ul className="social_footer_link">
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms and Conditions</a></li>
                <li><a href="#">Copyright Policy</a></li>
            </ul>
            </div>
        </div>
        
        <div className="row">
            <div className="col-md-12">
            <div className="footer_copyright_part">Copyright © 2022 All Rights Reserved.</div>
            </div>
        </div>
        </div>
    </div> 
    )
}

export default Footer;