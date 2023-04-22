import testimonialsStyles from "./Testimonials.module.css";
import { FaQuoteRight } from "react-icons/fa";
import { testimonials } from "../../Data/UI-Data";
import React, { useEffect } from "react";
import avatar1 from "../../assets/Images/testimonial-1.jpg";

// for swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { useDispatch, useSelector } from "react-redux";
import { getTop3Review } from "../../store/action/reviewAction";
import { Avatar } from "@mui/material";

export const Testimonials = () => {
  const {loading, review /* testimonials */} = useSelector((state) => state.reviewDetails);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTop3Review())
  }, [dispatch]);
  return (
    <>
      <section>
        <div className={testimonialsStyles.container}>
          <h4>Testimonials</h4>
          <h5>The stunning results our customers have experienced</h5>
          <div
            className={`${testimonialsStyles.content} ${testimonialsStyles.testimonials_large_screen}`}
          >
            {
              console.log(review)
            }
            {!Array.isArray(review) ? null :
            review?.map((testimonial, index) => (
              <div
                key={index}
                className={testimonialsStyles.testimonial_card}
              >
                <div className={testimonialsStyles.text}>
                  {testimonial?.description}
                  <FaQuoteRight className={testimonialsStyles.quote} />
                </div>

                <div className={testimonialsStyles.footer}>
                  <div className={testimonialsStyles.image}>
                    <img src={avatar1} alt="user" />
                    {/* <Avatar alt="Remy Sharp" /> */}
                  </div>
                  <h2 className={testimonialsStyles.person}>
                    {testimonial?.userData?.[0].firstName}
                  </h2>
                </div>
              </div>
            ))}
          </div>

          <div
            className={`${testimonialsStyles.content} ${testimonialsStyles.testimonials_mobile_screen}`}
          >
            <Swiper
              pagination={{
                dynamicBullets: true,
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {!Array.isArray(review) ? null :
              review?.map((testimonial, index) => (
                <SwiperSlide key={testimonial._id}>
                  <div className={testimonialsStyles.testimonial_card}>
                    <div className={testimonialsStyles.text}>
                      {testimonial.description}
                      <FaQuoteRight className={testimonialsStyles.quote} />
                    </div>

                    <div className={testimonialsStyles.footer}>
                      <div className={testimonialsStyles.image}>
                        <img src={avatar1} alt="user" />
                      </div>
                      <h2 className={testimonialsStyles.person}>
                        {testimonial?.userData?.[0].firstName}
                      </h2>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
};
