import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
// import { CCarousel, CCarouselItem, CImage } from '@coreui/react'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Rating } from 'react-simple-star-rating';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import image_placeholder from '../../public/images/user_placeholder.jpg'


// "./public/images/city_search_background.jpg"
const Listing_detail = () => {

    const [leftCard,setLeftCard] = useState()
    const [rightCard,setRightCard] = useState()


    function handleRating(rate)
    {
        console.log('rate', rate)
        document.getElementById("the_ratings").innerHTML = rate
        setRatings(rate)
    }

    function reviewsubmitter(e){
        e.preventDefault()

        
        const formData = {
            listing : new URL(window.location.href).searchParams.get("id"),
            rating : parseInt(document.getElementById("the_ratings").innerHTML),
            description : e.target.description.value,
            token : sessionStorage.getItem("token")
        }

        if(sessionStorage.getItem("token") == null){
            // navigate("/login",{state:["yes", "Login to add Ratings"]})
            document.getElementById("logreg").click()
        }
        else{
            axios.post(`${sessionStorage.getItem("urls")}/qikdial/rating/`,formData).then((response) => {
                toast.success("Thank you for the Response",{position:"bottom-left"})
                document.getElementById("rstbtn").click()
            }).catch((err) => {
                console.log(err)
                toast.error(err.response.data.Message,{position:"bottom-left"})
            })
        }

    }



    function lover()
    {
        if(sessionStorage.getItem("token") == null){
            // navigate("/login",{state : ["yes", "Login to Add"]})
            document.getElementById("logreg").click()
        }
        else{
            axios.post(`${sessionStorage.getItem("urls")}/qikdial/checker`,{token : sessionStorage.getItem("token")}).then((response) => {
                if(!response.data.merchant)
                    {
                        axios.post(`${sessionStorage.getItem("urls")}/qikdial/favorites/`,{"listing" : new URL(window.location.href).searchParams.get('id'), "token" : sessionStorage.getItem("token")}).then((response) => {
                            if(response.data.Message == "Deleted"){
                                toast.error("Removed from favorites",{position:"bottom-left"})
                            }
                            else{toast.success("Added to favorites",{position:"bottom-left"})}
                            setReloader(!reloader)
                        }).catch((err) => console.log(err))
                    }
                else{
                    toast.warning("Merchant cannot Like",{position : "bottom-left"})
                }
            }).catch((err) => {
                console.log(err)
                // navigate("/login",{state : ["Yes", "Session Timedout"]})
                document.getElementById("logreg").click()
            })
        }
    }

    function addenquiry(phone,list_name, e)
    {
        e.preventDefault()
        const formData = {
            "listing" : new URL(window.location.href).searchParams.get('id'),
            "token" : sessionStorage.getItem("token"),
            "name" : e.target.name.value,
            "email" : e.target.email.value,
            "phone" : e.target.phone.value,
            "message" : e.target.message.value
        }

        if(sessionStorage.getItem("token") == null){
            // navigate("/login",{state:["yes", "Login to Enquire"]})
            document.getElementById("logreg").click()
        }
        else{
            window.open(`https://api.whatsapp.com/send/?phone=${phone}&text=Hi${" I want to discuss about "+list_name}&type=phone_number&app_absent=0`, "_blank")
            axios.post(`${sessionStorage.getItem("urls")}/qikdial/enquiry/`, formData).then((response) => {
                toast.success(response.data.Message,{position:"bottom-left"})
            }).catch((err) => console.log(err))
        }
    }


    useEffect(() => {
        
        var list_id = new URL(window.location.href).searchParams.get('id')
        if(list_id == undefined || list_id == null || list_id == ''){
            window.history.go(-1)
        } 
        else{
            axios.get(`${sessionStorage.getItem("urls")}/qikdial/listings/get/?id=${list_id}`).then((response) => {
                var the_data = response.data.data
                setLeftCard(
                    <div className="col-lg-8 col-md-8">
                    {/* <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))"}}>
                        <div className="gridimg">
                            <img src={image_placeholder} />
                        </div>
                        <div className="gridimg">
                            <img src={image_placeholder} />
                        </div>
                        <div className="gridimg">
                            <img src={image_placeholder} />
                        </div>
                    </div> */}
                    <div id="titlebar" className="utf_listing_titlebar">
                    <div className="utf_listing_titlebar_title">
                    <h2>{the_data.name} <span className="listing-tag">{the_data.category_id.name}</span> <span>{the_data.verified == 1 ? <abbr title="Listing has been verifies and belogs to business owner"><i style={{color:"green"}} className="sl sl-icon-check"></i></abbr> : <abrr title="Listing is not yet verified"><i style={{color:"gray"}} className="sl sl-icon-close"></i></abrr>}</span></h2>
                        <span> <a href="#utf_listing_location" className="listing-address"> <i className="sl sl-icon-location"></i> {the_data.address} </a> </span>			
                        <div className="row">
                            {the_data.mobile == null ? '' : <span className="call_now col-sm-4"><i className="sl sl-icon-phone"></i> <abbr title="Mobile number">{the_data.mobile}</abbr></span>}
                            {the_data.gstin == null ? '' : <span className="call_now col-sm-4"><i className="sl sl-icon-chart"></i> <abbr title="GST number">{the_data.gstin}</abbr></span>}
                            {the_data.established_on == null ? '' : <span className="call_now col-sm-4"><i className="sl sl-icon-flag"></i> <abbr title="Year of Establishment">{the_data.established_on}</abbr></span>}
                            {the_data.listing_type == null ? '' : <span className="call_now col-sm-4"><i className="sl sl-icon-social-dropbox"></i> <abbr title="Listing Type">{the_data.listing_type == 1 ? "Product" : the_data.listing_type == 2 ? "Service" : "Business"}</abbr></span>}
                            {the_data.mode_of_service == null ? '' : <span className="call_now col-sm-4"><i className="sl sl-icon-paper-plane"></i> <abbr title="Mode of Service">{the_data.mode_of_service == 1 ? "Online" : "Offline"}</abbr></span>}
                        </div>

                        <div className="utf_star_rating_section" data-rating="4.5">
                            <Rating readonly initialValue={the_data.avg_rating.avg_rating != null ? the_data.avg_rating.avg_rating : 0} size={15} />
                        <div className="utf_counter_star_rating">({the_data.avg_rating.avg_rating != null ? the_data.avg_rating.avg_rating : 0}) / ({the_data.ratings.length} Reviews)</div>
                        </div>
                        <ul className="listing_item_social">
                        <li onClick={lover}><a href="#"><i className="fa fa-bookmark"></i> Bookmark</a></li>
                        <li><a href="#utf_add_review"><i className="fa fa-star"></i> Add Review</a></li>              
                        {/* <li><a href="#"><i className="fa fa-flag"></i> Featured</a></li> */}
                        <li onClick={() => navigator.clipboard.writeText(window.location.href).then(() => toast.success("Copied to clipboard",{position:"bottom-right"}))}><a href="#"><i className="fa fa-share"></i> Share</a></li>
                        {/* <li><a href="#" className="now_open">Open Now</a></li> */}
                        </ul>			
                    </div>
                    </div>

                    <div id="utf_listing_overview" className="utf_listing_section">
                    <h3 className="utf_listing_headline_part margin-top-30 margin-bottom-30">Summary</h3>
                    <p>{the_data.summary}</p>
                    <h3 className="utf_listing_headline_part margin-top-30 margin-bottom-30">Description</h3>
                    <p>{the_data.description}</p>
                    <div id="utf_listing_tags" className="utf_listing_section listing_tags_section margin-bottom-10 margin-top-0">          
                        {the_data.mobile != undefined ? <a href={the_data.mobile}   ><i className="sl sl-icon-phone" aria-hidden="true"></i> {the_data.mobile}</a> : ''}
                        {the_data.email != undefined ? <a href="#"><i className="fa fa-envelope-o" aria-hidden="true"></i> {the_data.email}</a>:""}
                        {the_data.website != undefined ? <a href={the_data.website}><i className="sl sl-icon-globe" aria-hidden="true"></i> {the_data.website}</a> : ""}		
                    </div>	  		 
                    </div>
                    
                    <div id="utf_listing_tags" className="utf_listing_section listing_tags_section">
                    <h3 className="utf_listing_headline_part margin-top-30 margin-bottom-40">Availability</h3>
                        {the_data.availability == 1 ? <a href="#"><i className="fa fa-tag" aria-hidden="true"></i> Available All Over India</a> : ''}
                        {the_data.cities.map((data,index) => <a href="#"><i className="fa fa-tag" aria-hidden="true"></i> {data.city}</a>)}		
                    </div>

                    {the_data.amenities.length > 0 ? <div id="utf_listing_amenities" className="utf_listing_section">
                    <h3 className="utf_listing_headline_part margin-top-50 margin-bottom-40">Amenities</h3>
                    <ul className="utf_listing_features checkboxes margin-top-0">
                        {the_data.amenities.map((data,index) => <li>{data.amenity}</li>)}                       
                    </ul>
                    </div> : ''}
                    
                    
                    
                    
                    <div id="utf_listing_location" className="utf_listing_section">
                    <h3 className="utf_listing_headline_part margin-top-60 margin-bottom-40">Location</h3>
                    <div id="utf_single_listing_map_block">
                        <div id="utf_single_listingmap" dangerouslySetInnerHTML={{"__html" : the_data.map_address}} data-map-icon="im im-icon-Hamburger"></div>
                    </div>
                    </div>

                    <div id="utf_listing_reviews" className="utf_listing_section">
                    <h3 className="utf_listing_headline_part margin-top-75 margin-bottom-20">Reviews <span>(08)</span></h3>
                    <div className="clearfix"></div>
                    <div className="reviews-container">
                        <div className="row">
                            <div className="col-lg-3">
                                <div id="review_summary">
                                    <strong>{the_data.avg_rating.avg_rating != null ? the_data.avg_rating.avg_rating : '0'}</strong>
                                    <em>Superb Reviews</em>
                                    <small>Out of {the_data.ratings.length} Reviews</small>
                                </div>
                            </div>
                            <div className="col-lg-9">
                                <div className="row">
                                    <div className="col-lg-2 review_progres_title"><small><strong>5 stars</strong></small></div>
                                    <div className="col-lg-9">
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" style={{width: the_data.ratings_split[5] == 0 ? "0%" : `${(the_data.ratings_split[5]/the_data.ratings_split[0]) * 100}%`}} aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                    <div className="col-lg-1 review_progres_title"><small><strong>{the_data.ratings_split[5] == 0 ? 0 : (the_data.ratings_split[5]/the_data.ratings_split[0]) * 100}</strong></small></div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-2 review_progres_title"><small><strong>4 stars</strong></small></div>
                                    <div className="col-lg-9">
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" style={{width: the_data.ratings_split[4] == 0 ? "0%" : `${(the_data.ratings_split[4]/the_data.ratings_split[0]) * 100}%`}} aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                    <div className="col-lg-1 review_progres_title"><small><strong>{the_data.ratings_split[4] == 0 ? 0 : (the_data.ratings_split[4]/the_data.ratings_split[0]) * 100}</strong></small></div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-2 review_progres_title"><small><strong>3 stars</strong></small></div>
                                    <div className="col-lg-9">
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" style={{width: the_data.ratings_split[3] == 0 ? "0%" : `${(the_data.ratings_split[3]/the_data.ratings_split[0]) * 100}%`}} aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                    <div className="col-lg-1 review_progres_title"><small><strong>{the_data.ratings_split[3] == 0 ? 0 : (the_data.ratings_split[3]/the_data.ratings_split[0]) * 100}</strong></small></div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-2 review_progres_title"><small><strong>2 stars</strong></small></div>
                                    <div className="col-lg-9">
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" style={{width: the_data.ratings_split[2] == 0 ? "0%" : `${(the_data.ratings_split[2]/the_data.ratings_split[0]) * 100}%`}} aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                    <div className="col-lg-1 review_progres_title"><small><strong>{the_data.ratings_split[2] == 0 ? 0 : (the_data.ratings_split[2]/the_data.ratings_split[0]) * 100}</strong></small></div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-2 review_progres_title"><small><strong>1 star</strong></small></div>
                                    <div className="col-lg-9">
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" style={{width: the_data.ratings_split[1] == 0 ? "0%" : `${(the_data.ratings_split[1]/the_data.ratings_split[0]) * 100}%`}}  aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                    <div className="col-lg-1 review_progres_title"><small><strong>{the_data.ratings_split[1] == 0 ? 0 : (the_data.ratings_split[1]/the_data.ratings_split[0]) * 100}</strong></small></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="comments utf_listing_reviews">
                        <ul>
                            {the_data.ratings.map((data,index) =>  <li>
                            <div className="avatar"><img src={data.user.photo == null ? image_placeholder :`${sessionStorage.getItem("urls")}/${data.user.photo}`} alt="" /></div>
                            <div className="utf_comment_content">
                            <div className="utf_arrow_comment"><Rating initialValue={data.rating} readonly size={15} /></div>
                            {/* <div className="utf_star_rating_section" data-rating="5"></div> */}
                            {/* <a href="#" className="rate-review">Helpful Review <i className="fa fa-thumbs-up"></i></a>                    */}
                            <div className="utf_by_comment">{data.user.name}<span className="date"><i className="fa fa-clock-o"></i>{data.posted_at.slice(0,10)}</span> </div>
                            <p>{data.comment}</p>                                    
                            </div>
                        </li>)}
                        </ul>
                    </div>
                    <div className="clearfix"></div>
                    <div className="clearfix"></div>
                    </div>

                    <div id="utf_add_review" className="utf_add_review-box">
                    <h3 className="utf_listing_headline_part margin-bottom-20">Add Your Review</h3><br />
                    <div className="row">
                        <div className="col-md-6 col-sm-6 col-xs-12">
                        <div className="clearfix"></div>
                        <div className="utf_leave_rating margin-bottom-30">
                            <Rating initialValue={1} size={25} onClick={(rate) => handleRating(rate)} />
                                <span style={{display:"none"}} id="the_ratings"></span>
                        </div>
                        <div className="clearfix"></div>
                        </div>
                    </div>
                    <form onSubmit={(e) => reviewsubmitter(e)} id="utf_add_comment" className="utf_add_comment">
                        <fieldset>
                        <div>
                            <label>Review:</label>
                            <textarea cols="40" name="description" placeholder="Your Message..." rows="3"></textarea>
                        </div>
                        </fieldset>
                        <button className="button">Submit Review</button>
                        <div className="clearfix"></div>
                    </form>
                    </div>

                </div>
                )

                
                setRightCard(
                    <div className="col-lg-4 col-md-4 margin-top-75 sidebar-search">

                        <Carousel infiniteLoop={true} autoPlay={true} interval={5000} className='wow fadeInUp' data-wow-duration="1s">{the_data.images.map((data,index) => <img src={`${sessionStorage.getItem("urls")}/${data.image}`}  ></img> )}</Carousel>
                
                    <div className="utf_box_widget opening-hours margin-top-30">
                    <h3><i className="sl sl-icon-envelope-open"></i> Request Message Form</h3>
                    <form onSubmit={(e) => addenquiry(the_data.mobile,the_data.name, e)} id="contactform">
                        <div className="row">  
                        <div className="col-md-12">                
                            <input name="name" type="text" placeholder="Your Name" required />                
                        </div>
                        <div className="col-md-12">                
                            <input name="email" type="email" placeholder="Email Address" required />                
                        </div> 
                        <div className="col-md-12">                
                            <input name="phone" type="tel" maxLength={10} minLength={10} placeholder="Phone Number"  pattern="[0-9]{10}" inputMode="numeric" required />
                        </div>	
                        <div className="col-md-12">
                            <textarea name="message" cols="40" rows="2" id="comments" placeholder="Your Message" required ></textarea>
                        </div>
                        </div>            
                        <input type="submit" className="submit button" id="submit" value="Send Message" />
                    </form>
                    </div>

                    {the_data.listing_type == 1 ? <div className="utf_box_widget opening-hours margin-top-35">
                    <h3><i className="sl sl-icon-docs"></i> Product Details</h3>
                    <ul>
                        <li>Price : <span> {the_data.price}</span></li>
                        <li>Height : <span> {the_data.height}</span></li>
                        <li>Width : <span> {the_data.width}</span></li>
                        <li>Weight : <span> {the_data.weight}</span></li>
                        <li>Color : <span> {the_data.color}</span></li>
                    </ul>
                    </div> : ''}
                    
                    <div className="utf_box_widget margin-top-35">
                    <h3><i className="sl sl-icon-phone"></i> Contact Info</h3>
                    <div className="utf_hosted_by_user_title"> <a href="#" className="utf_hosted_by_avatar_listing"><img src={`${sessionStorage.getItem("urls")}/${the_data.images[0].image}`} alt="" /></a>
                        <h4><a href="#">{the_data.company_name}</a><span>Posted on {the_data.created_at.slice(0,10)}</span>
                        </h4>
                    </div>
                    <ul className="utf_listing_detail_sidebar">
                        {the_data.address != undefined ? <li><i className="sl sl-icon-map"></i>{the_data.address}</li> : ''}
                        {the_data.mobile != undefined ? <li><i className="sl sl-icon-phone"></i> {the_data.mobile}</li> : ''}
                        {the_data.email != undefined ? <li><i className="fa fa-envelope-o"></i> <a href={`mailto:${the_data.email}`}>{the_data.email}</a></li> : ''}
                        {the_data.website != undefined ? <li><i className="fa fa-globe"></i> <a href={the_data.website}>{the_data.website}</a></li> : ''}

                                                
                    </ul>		  
                    </div>

                    <div className="utf_box_widget margin-top-35">
                    <h3><i className="sl sl-icon-folder-alt"></i> Categories</h3>
                    <ul className="utf_listing_detail_sidebar">
                        {the_data.categories.map((data,index) => <li><i className="fa fa-angle-double-right"></i> <a href="#">{data.name}</a></li>)}
                    </ul>
                    </div>

                    <div className="utf_box_widget opening-hours margin-top-35">
                    <h3><i className="sl sl-icon-clock"></i> Timing</h3>
                    <span dangerouslySetInnerHTML={{"__html" : the_data.timings}} />
                    </div>

                    {the_data.offers.length != 0 ? <div className="utf_box_widget opening-hours margin-top-35">
                    <h3><i className="sl sl-icon-present"></i> Offers</h3>
                    <ul>
                        {the_data.offers.map((data,index) => <li><b>{data.offer} % OFF</b>: <span>{data.description}</span></li>)}
                    </ul>
                    </div> :""}

                    {(the_data.refund != undefined && the_data.refund.length > 0) ? <div className="utf_box_widget opening-hours margin-top-35">
                    <h3><i className="sl sl-icon-loop"></i> Refund Policy</h3>
                    <span dangerouslySetInnerHTML={{"__html" : the_data.refund}} />
                    </div> :""}

                    <div className="utf_box_widget listing-share margin-top-35 margin-bottom-40 no-border">
                    <h3><i className="sl sl-icon-pin"></i> Bookmark Listing</h3>
                    <span>{the_data.favorites_count} People Bookmarked Listings</span>
                    <button onClick={lover} className="like-button"><span className="like-icon"></span> Add to Bookmarks</button>          
                    <div className="clearfix"></div>
                    </div>

                </div>
                )
            })
        }

    },[])


    return (
        <div style={{overflowY:"auto"}}>
            <Header />
             <div className="container">
                <div className="row utf_sticky_main_wrapper">
                    {leftCard}{rightCard}
                </div>
            </div>


            <Footer />
            <div id="bottom_backto_top"><a href="#"></a></div>
        </div>
    )
}

export default Listing_detail;