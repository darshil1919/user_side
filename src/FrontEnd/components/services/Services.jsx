import React from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import servicesStyles from "./Services.module.css";
import { Link } from "react-router-dom";
import { GoPrimitiveDot } from "react-icons/go";

export const Services = (props) => {
  Aos.init({ duration: 700 });

  // const dispatch = useDispatch();
  // const { loading, error, category: categoriesData } = useSelector((state) => {
  //   // console.log(state.allCategory);
  //   return state.allCategory;
  // })

  // useEffect(() => {
  //   if (error) {
  //     console.log(error);
  //     dispatch(clearErrors());
  //   }
  //   dispatch(getCategory());

  // }, []);

  // if(loading == true){
  //   return <h2>loading.....</h2>;
  // }

  return (
    <div className={servicesStyles.services_container}>
      <div className={servicesStyles.services_container_title}>
        <h4>{props.title}</h4>
        <h5>{'Explore the greatest our services.'}</h5>
      </div>
      <div className={servicesStyles.services_container_content}>
        {props.servicesProps.map((item) => {
          return (
            <div
              className={servicesStyles.services_container_content_item}
              key={item.id}
              data-aos="zoom-in-up"
            >
              <Link to={"/categories/" + item.category + "/" + item.id}>
                <img
                  className={servicesStyles.services_container_content_item_img}
                  src={item.img}
                  alt={item.desc}
                />
                <div
                  className={
                    servicesStyles.services_container_content_item_label
                  }
                >
                  <GoPrimitiveDot fill="#6b7cff" size={20} />
                  <p>{item.desc}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
