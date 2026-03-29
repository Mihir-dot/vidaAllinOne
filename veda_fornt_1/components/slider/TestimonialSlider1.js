'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { getAllReviewsData } from "../helper/serviceNameCommonAPI";
import { getImageSource } from "../helper/apiPath";

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 2,
    spaceBetween: 30,
    autoplay: {
        delay: 7000,
        disableOnInteraction: false,
    },
    loop: true,

    // Navigation
    navigation: {
        nextEl: '.h1n',
        prevEl: '.h1p',
    },

    // Pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    breakpoints: {
        320: {
            slidesPerView: 1,
            // spaceBetween: 30,
        },
        575: {
            slidesPerView: 1,
            // spaceBetween: 30,
        },
        767: {
            slidesPerView: 2,
            // spaceBetween: 30,
        },
        991: {
            slidesPerView: 2,
            // spaceBetween: 30,
        },
        1199: {
            slidesPerView: 2,
            // spaceBetween: 30,
        },
        1350: {
            slidesPerView: 2,
            // spaceBetween: 30,
        },
    }
}
export default function TestimonialSlider1() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
      const fetchReviews = async () => {
        try {
          const data = await getAllReviewsData();
          setReviews(data);
        } catch (error) {
          console.error("Error fetching services:", error);
        }
      };
  
      fetchReviews();
    }, []);
    return (
        <>
        <Swiper {...swiperOptions} className="theme_carousel owl-theme">
        {reviews.map((review, index) => (
            
          <SwiperSlide key={index} className="slide">
            <div className={`testimonial-block-one ${index % 2 === 0 ? 'shape-14' : 'shape-15'}`}>
              <div className="inner-box">
                <div
                  className="shape"
                  style={{ backgroundImage: `url(assets/images/shape/${index % 2 === 0 ? 'shape-14' : 'shape-15'}.png)` }}
                ></div>
                <div className="icon-box"><i className="icon-19"></i></div>
                <figure className="thumb-box">
                {review.pictureLocation ? (
                  <img src={getImageSource(review.pictureLocation)} alt="" />
                ) : (
                  <img src="assets/images/resource/testimonial-3.jpg" alt="" />
                )}
                </figure>
                <p>{review.text}</p>
                <ul className="rating clearfix">
                  {Array.from({ length: review.rating }, (_, i) => (
                    <li key={i}><i className="fas fa-star"></i></li>
                  ))}
                  {Array.from({ length: 5 - review.rating }, (_, i) => (
                    <li key={i}><i className="far fa-star"></i></li>
                  ))}
                </ul>
                <h3>{review.name}</h3>
                <span className="designation">{review.post}</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
        </>
    )
}
