import axios from "axios";
import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Footer from "./Footer";
import Header from "./Header";
import { Rating } from "react-simple-star-rating";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import back_image from "../../public/images/city_search_background.jpg"
import Cookies from 'js-cookie'

import Typewriter from 'typewriter-effect';
import Multiselect from "multiselect-react-dropdown";
import Select from 'react-select';
// import CountUp from 'react-countup';
// import { Parallax } from 'react-parallax';
// <h2>Find & Explore Nearby <h2 style={{color:"red"}}><Typewriter  options={{autoStart:true, loop: true, delay:'150', cursor:".", deleteSpeed:"100", pauseFor:"5000", strings:["Attractions", "Places", "Categories"]}} /></h2></h2>
// <h2>Find & Explore Nearby <Typewriter options={{autoStart:true, loop: true}} onInit={(typewriter) => {typewriter.typeString('Places').pauseFor(2500).deleteAll().typeString("Attractions").pauseFor(2500).deleteAll().typeString("Categories").pauseFor(2500).deleteAll().start()}} /></h2>
//npm i react-loading-skeleton, npm i typewriter-effect, npm i react-countup
// <CountUp start={1} end={1000} delay={5} />+


const Homepage = () => {
    
    const navigate = useNavigate()
    const nav_data = useLocation().state
    
    const [categories2,setCategories2] = useState()     //Below Searchbar Categories
    const [categories1,setCategories1] = useState()     //Rotating Categories
    
    const [categories,setCategories] = useState()       //2nd Category cards
    
    const [categorieSpace1,setCategorieSpace1] = useState()
    const [categorieSpace2,setCategorieSpace2] = useState()
    
    const [dropdown_categories,setDropdown_categories] = useState()

    const [dropdown_cities,setDropdown_cities] = useState([])
    const [reloader,setReloader] = useState(true)
    

    
    
    var settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
      };


      function  lover(list_id)
      {
          if(sessionStorage.getItem("token") == null){
            window.location.href = "/login"
            
          }
          else{
              axios.post(`${sessionStorage.getItem("urls")}/qikdial/checker`,{token : sessionStorage.getItem("token")}, {headers : {"X-CSRFToken" : Cookies.get("csrftoken") }}).then((response) => {
                  if(!response.data.merchant)
                      {
                          axios.post(`${sessionStorage.getItem("urls")}/qikdial/favorites/`,{"listing" : list_id, "token" : sessionStorage.getItem("token")}, {headers : {"X-CSRFToken" : Cookies.get("csrftoken") }}).then((response) => {
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
                  window.location.href = "/login"
                
              })
          }
      }

    useEffect(() => {

        if(nav_data != null){
            toast.success("Login Successful", {position:'top-center'})
        }

        axios.get(`${sessionStorage.getItem("urls")}/qikdial/homepage`,{headers:{"Authorization" : sessionStorage.getItem("token")}}).then((response) => {
            setDropdown_cities(response.data.data.cities.map((data,index) => <option key={index} value={data[0]}>{data[1]}</option>))
            setCategories1(response.data.data.categories.map((data,index) => (<a onClick={() => filterer(null, 0, data.id)} key={index} className="utf_category_small_box_part"> <i><img src={`${sessionStorage.getItem("urls")}/${data.image}`} /></i><h4>{data.name}</h4><span>{data.total_listings}</span></a>)))
            setCategories(response.data.data.categories.map((data,index) => (<div onClick={() => filterer(null, 0, data.id)} key={index} className="col-md-3 col-sm-6 col-xs-12"> 
                <a className="img-box" style={{backgroundImage : `url(${sessionStorage.getItem("urls")}/${data.image})`}}>
                    <div className="utf_img_content_box visible">
                        {data.name.split(" ").map((data,index) => <h4>{data}</h4>)}
                        {/* <h4>{data.name}</h4> */}
                     {/* need to change .replaceAll(" ",<br />)*/ }
                    <span>{data.total_listings} Listings</span> 
                    </div>
                </a> 
            </div>)))

            setDropdown_categories(response.data.data.categories.map((data,index) => <option key={index} value={data.id}>{data.name}</option>))
            setCategories2(response.data.data.categories.map((data,index) =>  <li onClick={() => filterer(null, 0, data.id)} key={index}><abrr title={data.name}><a>
            <div className="utf_box category_box"> <i><img src={`${sessionStorage.getItem("urls")}/${data.image}`} height={"60%"} width={"40%"} /></i>
            <p>{data.name}</p>
            </div>
            </a></abrr> 
            </li>))

            var list_keys = Object.keys(response.data.data.listings)

            setCategorieSpace1(list_keys.slice(0,2).map((dat,index) =><div key={index} className="col-md-12">
            <h3 id="categorieSpace1" className="headline_part margin-bottom-45">{dat}</h3>
            <Slider {...settings}>{response.data.data.listings[dat].map((data,index) => <div key={index} className="utf_carousel_item p-2"> 
                <div  className="utf_listing_item-container compact">
                    <a href={`/listing/?id=${data.id}`}>
                        <div className="utf_listing_item"> <img src={`${sessionStorage.getItem("urls")}/${data.image.image}`} alt="" /> <span className="tag"><i className="im im-icon-Electric-Guitar"></i> {data.company_name}</span>
                        <div className="utf_listing_item_content">
                            <h3>{data.name}</h3>
                            {/* <span><i className="fa fa-map-marker"></i> {data.address}</span> */}
                            <span><i className="fa fa-phone"></i> {data.mobile}</span>												
                        </div>
                        </div>
                    </a>
                    <div className="utf_star_rating_section" data-rating={data.avg_rating}>
                    <Rating readonly initialValue={data.avg_rating} size={15} />
                        <span className="utf_view_count"><i className="fa fa-eye"></i> {data.views}</span>
                        <span onClick={() => lover(data.id)} className={`like-icon ${data.is_fav ? 'liked' : ''}`}></span>
                    </div>
                </div> 
            </div>)}</Slider>
            </div>))

            setCategorieSpace2(list_keys.slice(2,).map((dat,index) =><div key={index} className="col-md-12">
            <h3 id="categorieSpace1" className="headline_part margin-bottom-45">{dat}</h3>
            <Slider {...settings}>{response.data.data.listings[dat].map((data,index) => <div key={index} className="utf_carousel_item p-2"> 
                <div className="utf_listing_item-container compact">
                    <a href={`/listing/?id=${data.id}`}>
                        <div className="utf_listing_item"> <img src={`${sessionStorage.getItem("urls")}/${data.image.image}`} alt="" /> <span className="tag"><i className="im im-icon-Electric-Guitar"></i> {data.company_name}</span>
                        <div className="utf_listing_item_content">
                            <h3>{data.name}</h3>
                            {/* <span><i className="fa fa-map-marker"></i> {data.address}</span> */}
                            <span><i className="fa fa-phone"></i> {data.mobile}</span>												
                        </div>
                        </div>
                    </a>
                    <div className="utf_star_rating_section" data-rating={data.avg_rating}>
                        <Rating readonly initialValue={data.avg_rating} size={15} />
                        <div className="utf_counter_star_rating">({data.avg_rating})</div>
                        <span className="utf_view_count"><i className="fa fa-eye"></i> {data.views}</span>
                        <span onClick={() => lover(data.id)} className={`like-icon ${data.is_fav ? 'liked' : ''}`}></span>
                    </div>
                </div> 
            </div>)}</Slider>
            </div>))

        })

        
    },[reloader])

    function filterer(e, text, id=null)
    {
        if(text == 1){
            e.preventDefault()
            const formData = {
                "cities" : e.target.citiess.value == '0' ? [] : [e.target.citiess.value],
                "categories" : e.target.cates.value == '0' ? [] : [e.target.cates.value],
                "listingTypes" : [],
                "mos" : '-1',
                "text" : e.target.text.value,
                "sort_order" : '0'
            }
            navigate("/listings/",{state : formData})
        }
        else{
            const formData = {
                "cities" : [],
                "categories" : [id],
                "listingTypes" : [],
                "mos" : '-1',
                "text" : '',
                "sort_order" : '0'
            }
            navigate("/listings/",{state : formData})
        }
    }

    return(
        <>
        <div id="main_wrapper">
            <Header head="home" />
            <div className="search_container_block home_main_search_part main_search_block search_container_classic_block" data-background-image={back_image}>
                <div className="main_inner_search_block">
                <div className="container">
                    <div className="row">
                    <div className="col-md-12">
                        <div style={{display:'flex', flexDirection:'row', gap:'10px', justifyContent:'center'}}>
                            <h2>Find & Explore</h2> 
                            <h2 style={{color:"#FF2222"}}>
                                <Typewriter options={{
                                    autoStart:true, 
                                    loop: true, 
                                    delay:'150',  
                                    deleteSpeed:"natural", 
                                    pauseFor:"3000", 
                                    cursor:'!',
                                    strings:["Great Services ", "Professional Businesses ", "New Products "]
                                }} />
                            </h2>
                        </div>
                        <form onSubmit={(e) => filterer(e, 1, )} className="main_input_search_part">
                        <div className="main_input_search_part_item intro-search-field">
                            <input name="text" placeholder="What are you looking for?" />
                        </div>
                        <div className="main_input_search_part_item intro-search-field">
                        <select name="cates" defaultValue={0} className="default">
                            <option disabled value={0}>All Categories</option>
                            {dropdown_categories}
                            </select>
                        </div>
                        <div className="main_input_search_part_item intro-search-field">
                        <select name="citiess" defaultValue={0} className="default">
                            <option disabled value={0}>All Cities</option>
                            {dropdown_cities}
                            </select>
                        </div>
                        
                        <button className="button" type="submit">Search</button>
                        </form>
                        <div className="main_popular_categories">
                        <h3>Or Browse Popular Categories</h3>	
                        <ul className="main_popular_categories_list">
                            {categories2}
                        </ul>
                        </div>
                    </div>
                    </div>
                </div>
                </div>    
            </div>
            
            <div className="container">
                <div className="row">
                <div className="col-md-12">
                    <h3 className="headline_part centered margin-top-75"> Most Popular Categories<span>Browse the most desirable categories</span></h3>
                </div>
                </div>
                <div className="row">
                <div className="col-md-12">
                    <div className="container_categories_box margin-top-5 margin-bottom-30"> 
                        {categories1}
                    </div>
                    {/* <div className="col-md-12 centered_content"> <a href="#" className="button border margin-top-20">View More</a> </div> */}
                </div>
                </div>
            </div>
            
            <section className="fullwidth_block margin-top-65 padding-top-75 padding-bottom-70" data-background-color="#f9f9f9">
            <div className="container">
                <div className="row slick_carousel_slider">
                    {categorieSpace1}
                </div>
                </div>
            </section>
            
            <div className="container padding-bottom-70">
                <div className="row">
                <div className="col-md-12">
                    <h3 className="headline_part centered margin-bottom-35 margin-top-70">Most Popular Categories <span>Discover best services and businesses<br />all over India by categories.</span></h3>
                </div>
                {categories}
                </div>
            </div>  

            <section className="fullwidth_block margin-top-65 padding-top-75 padding-bottom-70" data-background-color="#f9f9f9">
                <div className="container">
                <div className="row slick_carousel_slider">
                    {categorieSpace2}
                </div>
                </div>
            </section> 

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
        </>
    )
}

export default Homepage