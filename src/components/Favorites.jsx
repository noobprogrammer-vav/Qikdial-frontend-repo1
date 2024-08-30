import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import axios from 'axios'
import { Rating } from 'react-simple-star-rating'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'

export default function Favorites() {


  const [listings,setListings] = useState()
  const [reloader,setReloader] = useState(false)

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
      let the_token =  sessionStorage.getItem('token')
        if(the_token == null){
            window.history.go(-1)
            sessionStorage.setItem("call_login","yes")
        }
        else{
          axios.post(`${sessionStorage.getItem("urls")}/qikdial/favorites/get/`,{token : the_token  }, {headers : {"X-CSRFToken" : Cookies.get("csrftoken") }}).then((response) => {
            let data = response.data.data
            setListings(data.map((data,index) => <div key={index} className="col-md-4 col-lg-4 col-md-12"> 
            <div className="utf_listing_item-container compact">
                <a href={`/listing/?id=${data.id}`}>
                    <div className="utf_listing_item"> <img src={`${sessionStorage.getItem("urls")}/${data.image.image}`} alt="" /> <span className="tag"><i className="im im-icon-Electric-Guitar"></i> {data.company_name}</span>
                    <div className="utf_listing_item_content">
                        <h3>{data.name}</h3>
                        <span><i className="fa fa-phone"></i> {data.mobile}</span>												
                    </div>
                    </div>
                </a>
                <div className="utf_star_rating_section" data-rating={data.avg_rating}>
                    <Rating readonly initialValue={data.avg_rating} size={15} />
                    <div className="utf_counter_star_rating">({data.avg_rating})</div>
                    <span className="utf_view_count"><i className="fa fa-eye"></i> {data.views}</span>
                    <span onClick={() => lover(data.id)} className="like-icon liked"></span>
                </div>
            </div> 
        </div>))
          })
        }
    },[reloader])
    
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
          {listings}
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
  </div>
  

    <Footer />
  <div id="bottom_backto_top"><a href="#"></a></div>

    </div>
  )
}
