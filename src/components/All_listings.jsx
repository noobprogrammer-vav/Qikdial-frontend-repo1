import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Multiselect from "multiselect-react-dropdown";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Cookies from 'js-cookie'


const All_listings = () => {

    const [categories,setCategories] = useState([])
    const [listings,setListings] = useState([])
    const [paginatedlistings,setPaginatedListings] = useState([])
    const [cities, setCities] = useState([])

    const [selectedCities, setSelectedCities] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [listingTypes, setListingTypes] = useState([])

    const [currentpage,setCurrentPage] = useState(0)
    const [displayData,setDisplayData] = useState(false)

    const nav_data = useLocation().state


    useEffect(() => {
        axios.get(`${sessionStorage.getItem("urls")}/qikdial/listings/`).then((response) => {
            setCategories(response.data.data.categories.map((data,index) => ({"name" : data[1], "id" : data[0]})))
            if(nav_data == null){
                setListings(response.data.data.listings)
                setPaginatedListings(response.data.data.listings.slice(0,5))
            }
            setCities(response.data.data.cities.map((data,index) => ({"name" : data[1], "id" : data[0]})))
        }).then(() => {
            if(nav_data == null){
            }
        })
        
        if(nav_data != null){
            console.log('nav_data :>> ', nav_data);
            axios.post(`${sessionStorage.getItem("urls")}/qikdial/newFilter/`,nav_data, {headers : {"X-CSRFToken" : Cookies.get("csrftoken") }}).then((response) => {
                setListings(response.data.data)
            }).catch((err) => {
                console.log(err)
            })
        }

    },[])


    useEffect(() => {
            const preloader = document.getElementsByClassName("preloader")[0]
            preloader.style.display = "block"
            try{
                document.getElementById(`page${currentpage}`).classList.add("current-page")
                let newData = 5*currentpage
                setPaginatedListings(listings.slice(0+newData,5+newData))
                for (let index = 0; index < Math.ceil(listings.length/5); index++) {
                    if(index != currentpage){
                        document.getElementById(`page${index}`).classList.remove("current-page")
                    }
                }
            }catch(err){
                console.log(err)
            }finally{
                preloader.style.display = "none"
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior:'smooth'
                })
            }
    },[currentpage])

    useEffect(() => {
        setDisplayData(listings.length <= 0 ? <center><h3>No Data Found</h3></center> : paginatedlistings.map((data,index) => <div class="col-lg-12 col-md-12">
        <div class="utf_listing_item-container list-layout"> <a class="utf_listing_item">
        <div class="utf_listing_item-image"> 
            <img src={`${sessionStorage.getItem("urls")}/${data.image.image}`} alt="" /> 
            {/* <span class="like-icon"></span>  */}
            <span class="tag">{data.category_id.name}</span> 
            <div class="utf_listing_prige_block utf_half_list">							
                <span class="utf_meta_listing_price"><abbr title={data.verified == 0 ? "Listing is not yet verified" : "Listing is verified and identified by the user"}><i style={{padding:'5px', color : data.verified == 0 ? 'red' : 'green'}} class={data.verified == 0 ? "sl sl-icon-close rounded rounded-5" : "sl sl-icon-check rounded rounded-5"}></i></abbr><i class="sl sl-icon-social-dropbox"></i> {data.listing_type == 1 ? 'Product' : data.listing_type == 2 ? "Service" : "Business"}</span>				

            </div>
        </div>
        <div class="utf_listing_item_content">
        <a href={`/listing/?id=${data.id}`}>
            <div class="utf_listing_item-inner">
            <h3>{data.name}</h3>
            <span><i class="fa fa-map-marker"></i> {data.address}</span>
            <span><i class="fa fa-phone"></i> {data.mobile}</span>
            <div class="utf_star_rating_section" data-rating="5.0">
                {data.avg_rating == 0 ? null : <div class="utf_counter_star_rating">( {data.avg_rating} )</div>}
            </div>
            <p className="listing_summary">{data.summary}</p>
            </div>
        </a>
        </div>
        </a> 
        </div>
    </div>))
    },[paginatedlistings])

    useEffect(() => {
        setPaginatedListings(listings.slice(0,5))
    },[listings])

    async function filterer(e,text,id=null)
    {
        const preloader = document.getElementsByClassName("preloader")[0]
        preloader.style.display = "block"
        if(text === "cat"){
            const formData = {
                "cities" : [],
                "categories" : [id],
                "listingTypes" : [],
                "mos" : '-1',
                "text" : '',
                "sort_order" : '0'
            }
            const response = await axios.post(`${sessionStorage.getItem("urls")}/qikdial/newFilter/`,formData, {headers : {"X-CSRFToken" : Cookies.get("csrftoken") }})//.then((response) => {
            //     setListings([])
            //     setPaginatedListings([])
            //     setListings(response.data.data)
            // }).then(() => { 
            //     setCurrentPage(1)
            //     setCurrentPage(0)
            // }).then(() => {
            //     preloader.style.display = "none"
            // }).catch((err) => {
            //     preloader.style.display = "none"
            //     console.log(err)
            // })

            setListings([])
            setPaginatedListings([])
            setListings(response.data.data)
            setCurrentPage(0)
            
            preloader.style.display = "none"
            
        }
        else{
            e.preventDefault()
            const formData = {
                "cities" : selectedCities.map((data,index) => (data.id)),
                "categories" : selectedCategories.map((data,index) => (data.id)),
                "listingTypes" : listingTypes.map((data,index) => (data.id)),
                "sort_order" : e.target.sorter.value,
                "mos" : e.target.mos.value,
                "text" : e.target.search.value
            }
            const response = await axios.post(`${sessionStorage.getItem("urls")}/qikdial/newFilter/`,formData, {headers : {"X-CSRFToken" : Cookies.get("csrftoken") }})//.then((response) => {
            //     setListings([])
            //     setPaginatedListings([])
            //     setListings(response.data.data)
            // }).then(() => { 
            //     setCurrentPage(1)
            //     setCurrentPage(0)
                
            //  }).then(() => {
            //     preloader.style.display = "none"
            // }).catch((err) => {
            //     preloader.style.display = "none"
            //     console.log(err)
            // })

            setListings([])
            setPaginatedListings([])
            setListings(response.data.data)
            setCurrentPage(0)
            
            preloader.style.display = "none"
        }

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
            

    }


    return(

        <div>
            {/* <style>
                .multiSelectContainer li:hover{
                    background-color: red;
                }
            </style> */}
            <Header />
            <div id="titlebar" class="gradient">
                <div class="container">
                <div class="row">
                    <div class="col-md-12">
                    <h2>Listings</h2>
                    <nav id="breadcrumbs">
                        <ul>
                        <li><a href="/">Home</a></li>
                        <li>Listings</li>
                        </ul>
                    </nav>
                    </div>
                </div>
                </div>
            </div>

            <div class="container">
                <div class="row">
                <div class="col-lg-8 col-md-8">
                    <div class="row">
                        {displayData}
                    </div>
                    <div class="clearfix"></div>
                    <div class="row">
                    <div class="col-md-12">
                        <div class="utf_pagination_container_part margin-top-20 margin-bottom-70">
                        <nav class="pagination">
                            <ul>
                            <li><a onClick={() => setCurrentPage(currentpage-1 < 0 ? 0 : currentpage-1)}><i class="sl sl-icon-arrow-left"></i></a></li>
                                {Array.from(Array(Math.ceil(listings.length/5)).keys()).map((data,index) => <li key={index}><a className={data == 0 ? 'current-page' : ''} id={`page${data}`} onClick={() => setCurrentPage(data)} >{data+1}</a></li>)}
                            <li><a onClick={() => setCurrentPage(currentpage+1 > Math.ceil(listings.length/5) ? Math.ceil(listings.length/5) : currentpage+1)}><i class="sl sl-icon-arrow-right"></i></a></li>
                            </ul>
                        </nav>
                        </div>
                    </div>
                    </div>
                </div>
                
            {/* Sidebar */}
                <div id="sticky_sidebar" class="col-lg-4 col-md-4">
                    <div class="sidebar">
                    <form onSubmit={(e) => filterer(e,"form")} class="utf_box_widget margin-bottom-35">
                        <h3><i class="sl sl-icon-direction"></i> Filters</h3>	
                        <div class="row with-forms">
                        <div class="col-md-12">
                            <select name="sorter" defaultValue={0} class="utf_chosen_select_single">
                                <option value={0}>Sort Listings</option>
                                <option value={'latest'}>Latest Listings</option>
                                <option value={'popular'}>Popular Listings</option>
                                <option value={'high'}>Highest Reviewed</option>
                                <option value={'low'}>Lowest Reviewed</option>   
                                <option value={'verified'}>Verified</option>               
                            </select>
                        </div>
                        </div>		
                        <div class="row with-forms">
                        <div class="col-md-12">
                            <input name="search" type="text" placeholder="What are you looking for?"/>
                        </div>
                        </div>            
                            <Multiselect 
                                className="" 
                                placeholder="Select your categories" 
                                onSelect={(e) => setSelectedCategories(e)} 
                                onRemove={(e) => setSelectedCategories(e)} 
                                displayValue="name" 
                                avoidHighlightFirstOption 
                                style={{
                                    searchBox : { border : 'none', width:'100%', padding:"0"}, 
                                    inputField : {border : "1px solid #DBDBDB", width:"100%"}, 
                                    chips:{backgroundColor : "red"}
                                }} 
                                closeIcon="close"
                                options={categories} 
                            />
                            <Multiselect 
                                className="" 
                                placeholder="Type of Listing" 
                                onSelect={(e) => setListingTypes(e)} 
                                onRemove={(e) => setListingTypes(e)} 
                                displayValue="name" 
                                avoidHighlightFirstOption 
                                style={{
                                    searchBox : { border : 'none', width:'100%', padding:"0"}, 
                                    inputField : {border : "1px solid #DBDBDB", width:"100%"}, 
                                    chips:{backgroundColor : "red"}
                                }} 
                                closeIcon="close"
                                options={[{id : 1, name : "Product"},{id : 2, name : "Service"},{id : 3, name : "Business"}]} 
                            />
                            <Multiselect 
                                className="" 
                                placeholder="Select your Cities" 
                                onSelect={(e) => setSelectedCities(e)} 
                                onRemove={(e) => setSelectedCities(e)} 
                                displayValue="name" 
                                avoidHighlightFirstOption 
                                style={{
                                    searchBox : { border : 'none', width:'100%', padding:"0"}, 
                                    inputField : {border : "1px solid #DBDBDB", width:"100%"}, 
                                    chips:{backgroundColor : "red"}
                                }} 
                                closeIcon="close"
                                options={cities} 
                            />
                            <div style={{display:'flex', flexWrap:'nowrap', gap:'63px', justifyContent:"center"}}>
                                <div ><label>All</label><center><input type="radio" defaultChecked name="mos" value={-1}></input></center></div>
                                <div ><label>Online</label><center><input type="radio" name="mos" value={1}></input></center></div>
                                <div ><label>Offline</label><center><input type="radio" name="mos" value={2}></input></center></div>
                            </div>
                        <button type="submit" class="button fullwidth_block margin-top-5">Update</button>
                    </form>		  
                    <div style={{zIndex:"0"}} class="utf_box_widget margin-top-35 margin-bottom-75">
                        <h3><i class="sl sl-icon-folder-alt"></i> Categories</h3>
                        <ul class="utf_listing_detail_sidebar">
                            {categories.map((data,index) => <li className="sidebar_cats" onClick={(e) => filterer(e,"cat",data.id)} key={index}><i class="fa fa-angle-double-right"></i> <a >{data.name}</a></li>)}
                        </ul>
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

export default All_listings;