import React from "react"
import Header from "./Header"
import Footer from "./Footer"

const About = () => {
    return (
        <div id="main_wrapper"> 
            <Header />
        
        <div id="titlebar" class="gradient margin-bottom-0">
            <div class="container">
            <div class="row">
                <div class="col-md-12">
                <h2>About Us</h2>          
                <nav id="breadcrumbs">
                    <ul>
                    <li><a href="index_1.html">Home</a></li>
                    <li>About Us</li>
                    </ul>
                </nav>
                </div>
            </div>
            </div>
        </div>
        <br /><br />
        
        <div class="parallax" data-background="images/home_search_bg_image.jpg"> 
            <div class="utf_text_content white-font">
            <div class="container">
                <div class="row">
                <div class="col-lg-12 col-sm-12">
                    <h2>Run and Grow Your Business With Listing<br />Star from Anywhere</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in pulvinar neque. Nulla finibus lobortis pulvinar. Donec a consectetur nulla. Nulla posuere sapien vitae lectus suscipit, et pulvinar nisi tincidunt. Aliquam erat volutpat. Curabitur convallis fringilla diam sed aliquam. Sed tempor iaculis massa faucibus feugiat. In fermentum facilisis massa, a consequat purus viverra.</p>
                    <a href="listings_list_with_sidebar.html" class="button margin-top-25">Get Started</a> </div>
                </div>
            </div>
            </div>   
        </div>
            
        <section class="fullwidth_block padding-bottom-70" data-background-color="#f9f9f9"> 
            <div class="container">
                <div class="row">
                <div class="col-md-8 col-md-offset-2">
                    <h2 class="headline_part centered margin-top-80">How It Works? <span class="margin-top-10">Discover & connect with great local businesses</span> </h2>
                </div>
                </div>
                <div class="row container_icon"> 
                <div class="col-md-4 col-sm-4 col-xs-12">
                    <div class="box_icon_two box_icon_with_line"> <i class="im im-icon-Map-Marker2"></i>
                    <h3>Find Interesting Place</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in pulvinar neque Nulla finibus.</p>
                    </div>
                </div>
                
                <div class="col-md-4 col-sm-4 col-xs-12">
                    <div class="box_icon_two box_icon_with_line"> <i class="im im-icon-Mail-Add"></i>
                    <h3>Contact a Few Owners</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in pulvinar neque Nulla finibus.</p>
                    </div>
                </div>
                
                <div class="col-md-4 col-sm-4 col-xs-12">
                    <div class="box_icon_two"> <i class="im im-icon-Administrator"></i>
                    <h3>Make a Reservation</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in pulvinar neque Nulla finibus.</p>
                    </div>
                </div>
                </div>
            </div>
        </section>
        
        <section class="fullwidth_block padding-top-75 padding-bottom-55" data-background-color="#fff"> 
            <div class="container">
            <div class="row">
                <div class="col-md-12">
                <h3 class="headline_part centered margin-bottom-20">Choose Your Plan<span>Discover & connect with top-rated local businesses</span></h3>
                </div>
            </div>
            <div class="row">        
                <div class="utf_pricing_container_block margin-top-30 margin-bottom-20"> 
                    <div class="plan featured col-md-3 col-sm-6 col-xs-12">
                    <div class="utf_price_plan">
                        <h3>Basic</h3>
                        <span class="value">$29<span>/Par Month</span></span> <span class="period">Basic User Membership</span> 
                    </div>
                    <div class="utf_price_plan_features">
                        <ul>
                        <li>One Time Fee</li>
                        <li>One Listing</li>
                        <li>90 Days Availability</li>
                        <li>Featured In Search Results</li>
                        <li>24/7 Support</li>
                        </ul>
                        <a class="button border" href="#"><i class="sl sl-icon-basket"></i> Order Now</a> 
                    </div>
                    </div>
                    
                    <div class="plan featured col-md-3 col-sm-6 col-xs-12 active">
                    <div class="utf_price_plan">
                        <h3>Business</h3>
                        <span class="value">$49<span>/Par Month</span></span> <span class="period">Business User Membership</span> </div>
                    <div class="utf_price_plan_features">
                        <ul>
                        <li>One Time Fee</li>
                        <li>One Listing</li>
                        <li>90 Days Availability</li>
                        <li>Featured In Search Results</li>
                        <li>24/7 Support</li>
                        </ul>
                        <a class="button border" href="#"><i class="sl sl-icon-basket"></i> Order Now</a> 
                    </div>
                    </div>
                    
                    <div class="plan featured col-md-3 col-sm-6 col-xs-12">
                    <div class="utf_price_plan">
                        <h3>Premium</h3>
                        <span class="value">$69<span>/Par Month</span></span> <span class="period">Premium User Membership</span> </div>
                    <div class="utf_price_plan_features">
                        <ul>
                        <li>One Time Fee</li>
                        <li>One Listing</li>
                        <li>90 Days Availability</li>
                        <li>Featured In Search Results</li>
                        <li>24/7 Support</li>
                        </ul>
                        <a class="button border" href="#"><i class="sl sl-icon-basket"></i> Order Now</a> 
                    </div>
                    </div>
                    
                    <div class="plan featured col-md-3 col-sm-6 col-xs-12">
                    <div class="utf_price_plan">
                        <h3>Platinum</h3>
                        <span class="value">$99<span>/Par Month</span></span> <span class="period">Platinum User Membership</span> </div>
                    <div class="utf_price_plan_features">
                        <ul>
                        <li>One Time Fee</li>
                        <li>One Listing</li>
                        <li>90 Days Availability</li>
                        <li>Featured In Search Results</li>
                        <li>24/7 Support</li>
                        </ul>
                        <a class="button border" href="#"><i class="sl sl-icon-basket"></i> Order Now</a> 
                    </div>
                    </div>
                </div>        
            </div>      
            </div>    
        </section>
        
        <section class="fullwidth_block margin-bottom-0 padding-top-30 padding-bottom-65" data-background-color="linear-gradient(to bottom, #f9f9f9 0%, rgba(255, 255, 255, 1))">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <h3 class="headline_part centered margin-bottom-40 margin-top-30">Our Company Logos</h3>
                    </div>
                    <div class="col-md-12">
                        <div class="companie-logo-slick-carousel utf_dots_nav margin-bottom-10">
                            <div class="item">
                                <img src="images/brand_logo_01.png" alt="" />
                            </div>
                            <div class="item">
                                <img src="images/brand_logo_02.png" alt="" />
                            </div>
                            <div class="item">
                                <img src="images/brand_logo_03.png" alt="" />
                            </div>
                            <div class="item">
                                <img src="images/brand_logo_04.png" alt="" />
                            </div>
                            <div class="item">
                                <img src="images/brand_logo_05.png" alt="" />
                            </div>		
                            <div class="item">
                                <img src="images/brand_logo_06.png" alt="" />
                            </div>	
                            <div class="item">
                                <img src="images/brand_logo_07.png" alt="" />
                            </div>					
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <section class="utf_testimonial_part fullwidth_block padding-top-75 padding-bottom-75"> 
            <div class="container">
            <div class="row">
                <div class="col-md-8 col-md-offset-2">
                <h3 class="headline_part centered"> What Say Our Customers <span class="margin-top-15">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since...</span> </h3>
                </div>
            </div>
            </div>
            <div class="fullwidth_carousel_container_block margin-top-20">
            <div class="utf_testimonial_carousel testimonials"> 
                <div class="utf_carousel_review_part">
                <div class="utf_testimonial_box">
                    <div class="testimonial">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in pulvinar neque. Nulla finibus lobortis pulvinar. Donec a consectetur nulla. Nulla posuere sapien vitae lectus suscipit, et pulvinar nisi tincidunt. Aliquam erat volutpat. Curabitur convallis fringilla diam sed aliquam. Sed tempor iaculis massa faucibus feugiat. In fermentum facilisis massa, a consequat purus viverra.</div>
                </div>
                <div class="utf_testimonial_author"> <img src="images/happy-client-01.jpg" alt="" />
                    <h4>Denwen Evil <span>Web Developer</span></h4>
                </div>
                </div>
                <div class="utf_carousel_review_part">
                <div class="utf_testimonial_box">
                    <div class="testimonial">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in pulvinar neque. Nulla finibus lobortis pulvinar. Donec a consectetur nulla. Nulla posuere sapien vitae lectus suscipit, et pulvinar nisi tincidunt. Aliquam erat volutpat. Curabitur convallis fringilla diam sed aliquam. Sed tempor iaculis massa faucibus feugiat. In fermentum facilisis massa, a consequat purus viverra.</div>
                </div>
                <div class="utf_testimonial_author"> <img src="images/happy-client-02.jpg" alt="" />
                    <h4>Adam Alloriam <span>Web Developer</span></h4>
                </div>
                </div>
                <div class="utf_carousel_review_part">
                <div class="utf_testimonial_box">
                    <div class="testimonial">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in pulvinar neque. Nulla finibus lobortis pulvinar. Donec a consectetur nulla. Nulla posuere sapien vitae lectus suscipit, et pulvinar nisi tincidunt. Aliquam erat volutpat. Curabitur convallis fringilla diam sed aliquam. Sed tempor iaculis massa faucibus feugiat. In fermentum facilisis massa, a consequat purus viverra.</div>
                </div>
                <div class="utf_testimonial_author"> <img src="images/happy-client-03.jpg" alt="" />
                    <h4>Illa Millia <span>Project Manager</span></h4>
                </div>
                </div>
                <div class="utf_carousel_review_part">
                <div class="utf_testimonial_box">
                    <div class="testimonial">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in pulvinar neque. Nulla finibus lobortis pulvinar. Donec a consectetur nulla. Nulla posuere sapien vitae lectus suscipit, et pulvinar nisi tincidunt. Aliquam erat volutpat. Curabitur convallis fringilla diam sed aliquam. Sed tempor iaculis massa faucibus feugiat. In fermentum facilisis massa, a consequat purus viverra.</div>
                </div>
                <div class="utf_testimonial_author"> <img src="images/happy-client-01.jpg" alt="" />
                    <h4>Denwen Evil <span>Web Developer</span></h4>
                </div>
                </div>
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
    )
}

export default About