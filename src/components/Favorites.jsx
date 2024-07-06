import React, { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'

export default function Favorites() {

    useEffect(() => {
        if(sessionStorage.getItem('token') == null){
            window.history.go(-1)
            sessionStorage.setItem("call_login","yes")
        }
    },[])
    
  return (
    <div>
        <Header />
          <div id="titlebar" class="gradient margin-bottom-0">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h2>Your Wishlist</h2>
          <nav id="breadcrumbs">
            <ul>
              <li><a href="/">Home</a></li>
              <li>Your Wishlist</li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
  
  <div class="container">
    <div class="row">      
      <div class="col-md-12 listing_grid_item margin-top-70">
        <div class="row">
          <div class="col-md-4 col-lg-4 col-md-12"> <a href="listings_single_page_1.html" class="utf_listing_item-container" data-marker-id="1">
            <div class="utf_listing_item"> <img src="images/utf_listing_item-01.jpg" alt="" /> <span class="tag"><i class="im im-icon-Hotel"></i> Hotels</span> <span class="featured_tag">Featured</span>
			  <span class="utf_closed">Closed</span>
              <div class="utf_listing_item_content"> 
				<div class="utf_listing_prige_block">							
					<span class="utf_meta_listing_price"><i class="fa fa-tag"></i> $45 - $70</span>					
					<span class="utp_approve_item"><i class="utf_approve_listing"></i></span>
				</div>
                <h3>Chontaduro Barcelona</h3>
                <span><i class="fa fa-map-marker"></i> The Ritz-Carlton, Hong Kong</span>                               
				<span><i class="fa fa-phone"></i> (+15) 124-796-3633</span>
              </div>
            </div>
			<div class="utf_star_rating_section" data-rating="4.5">
			  <div class="utf_counter_star_rating">(4.5)</div>
			  <span class="utf_view_count"><i class="fa fa-eye"></i> 822+</span>
			  <span class="like-icon"></span>
			</div>
            </a> 
		  </div>
          <div class="col-md-4 col-lg-4 col-md-12"> <a href="listings_single_page_1.html" class="utf_listing_item-container" data-marker-id="2">
            <div class="utf_listing_item"> <img src="images/utf_listing_item-02.jpg" alt="" /> <span class="tag"><i class="im im-icon-Hotel"></i> Hotels</span>
              <div class="utf_listing_item_content"> 
				<div class="utf_listing_prige_block">							
					<span class="utf_meta_listing_price"><i class="fa fa-tag"></i> $25 - $55</span>					
				</div>
                <h3>The Lounge & Bar</h3>
                <span><i class="fa fa-map-marker"></i> The Ritz-Carlton, Hong Kong</span>                
				<span><i class="fa fa-phone"></i> (+15) 124-796-3633</span>
              </div>
            </div>
			<div class="utf_star_rating_section" data-rating="4.5">
			  <div class="utf_counter_star_rating">(4.5)</div>
			  <span class="utf_view_count"><i class="fa fa-eye"></i> 822+</span>
			  <span class="like-icon"></span>
			</div>
            </a> 
		  </div>
          <div class="col-md-4 col-lg-4 col-md-12"> <a href="listings_single_page_1.html" class="utf_listing_item-container" data-marker-id="3">
            <div class="utf_listing_item"> <img src="images/utf_listing_item-03.jpg" alt="" /> <span class="tag"><i class="im im-icon-Hotel"></i> Hotels</span>
			  <span class="utf_open_now">Open Now</span>
              <div class="utf_listing_item_content"> 
				<div class="utf_listing_prige_block">							
					<span class="utf_meta_listing_price"><i class="fa fa-tag"></i> $45 - $70</span>					
					<span class="utp_approve_item"><i class="utf_approve_listing"></i></span>
				</div>
                <h3>Westfield Sydney</h3>
                <span><i class="fa fa-map-marker"></i> The Ritz-Carlton, Hong Kong</span>                                
				<span><i class="fa fa-phone"></i> (+15) 124-796-3633</span>
              </div>
            </div>
			<div class="utf_star_rating_section" data-rating="4.5">
			  <div class="utf_counter_star_rating">(4.5)</div>
			  <span class="utf_view_count"><i class="fa fa-eye"></i> 822+</span>
			  <span class="like-icon"></span>
			</div>
            </a> 
		  </div>
          <div class="col-md-4 col-lg-4 col-md-12"> <a href="listings_single_page_1.html" class="utf_listing_item-container" data-marker-id="4">
            <div class="utf_listing_item"> <img src="images/utf_listing_item-04.jpg" alt="" /> <span class="tag"><i class="im im-icon-Hotel"></i> Hotels</span>
              <div class="utf_listing_item_content"> 
				<div class="utf_listing_prige_block">							
					<span class="utf_meta_listing_price"><i class="fa fa-tag"></i> $25 - $55</span>					
				</div>
                <h3>Ruby Beauty Center</h3>
                <span><i class="fa fa-map-marker"></i> The Ritz-Carlton, Hong Kong</span>                                
				<span><i class="fa fa-phone"></i> (+15) 124-796-3633</span>
              </div>
            </div>
			<div class="utf_star_rating_section" data-rating="4.5">
			  <div class="utf_counter_star_rating">(4.5)</div>
			  <span class="utf_view_count"><i class="fa fa-eye"></i> 822+</span>
			  <span class="like-icon"></span>
			</div>
            </a> 
		  </div>
          <div class="col-md-4 col-lg-4 col-md-12"> <a href="listings_single_page_1.html" class="utf_listing_item-container" data-marker-id="5">
            <div class="utf_listing_item"> <img src="images/utf_listing_item-05.jpg" alt="" /> <span class="tag"><i class="im im-icon-Hotel"></i> Hotels</span> <span class="featured_tag">Featured</span>
              <div class="utf_listing_item_content"> 
				<div class="utf_listing_prige_block">							
					<span class="utf_meta_listing_price"><i class="fa fa-tag"></i> $25 - $55</span>					
					<span class="utp_approve_item"><i class="utf_approve_listing"></i></span>
				</div>
                <h3>UK Fitness Club</h3>
                <span><i class="fa fa-map-marker"></i> The Ritz-Carlton, Hong Kong</span>                               
				<span><i class="fa fa-phone"></i> (+15) 124-796-3633</span>
              </div>
            </div>
			<div class="utf_star_rating_section" data-rating="4.5">
			  <div class="utf_counter_star_rating">(4.5)</div>
			  <span class="utf_view_count"><i class="fa fa-eye"></i> 822+</span>
			  <span class="like-icon"></span>
			</div>
            </a> 
		  </div>
          <div class="col-md-4 col-lg-4 col-md-12"> <a href="listings_single_page_1.html" class="utf_listing_item-container" data-marker-id="6">
            <div class="utf_listing_item"> <img src="images/utf_listing_item-06.jpg" alt="" /> <span class="tag"><i class="im im-icon-Hotel"></i> Hotels</span>
			  <span class="utf_closed">Closed</span>
              <div class="utf_listing_item_content"> 
				<div class="utf_listing_prige_block">							
					<span class="utf_meta_listing_price"><i class="fa fa-tag"></i> $45 - $70</span>					
					<span class="utp_approve_item"><i class="utf_approve_listing"></i></span>
				</div>
                <h3>Fairmont Pacific Rim</h3>
                <span><i class="fa fa-map-marker"></i> The Ritz-Carlton, Hong Kong</span>                                
				<span><i class="fa fa-phone"></i> (+15) 124-796-3633</span>
              </div>
            </div>
			<div class="utf_star_rating_section" data-rating="4.5">
			  <div class="utf_counter_star_rating">(4.5)</div>
			  <span class="utf_view_count"><i class="fa fa-eye"></i> 822+</span>
			  <span class="like-icon"></span>
			</div>
            </a> 
		  </div>
        </div>
        <div class="clearfix"></div>
        <div class="row">
          <div class="col-md-12">
            <div class="utf_pagination_container_part margin-top-20 margin-bottom-75">
              <nav class="pagination">
                <ul>
                  <li><a href="#"><i class="sl sl-icon-arrow-left"></i></a></li>
                  <li><a href="#" class="current-page">1</a></li>
                  <li><a href="#">2</a></li>
                  <li><a href="#">3</a></li>
                  <li><a href="#"><i class="sl sl-icon-arrow-right"></i></a></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  

    <Footer />
  <div id="bottom_backto_top"><a href="#"></a></div>

    </div>
  )
}
