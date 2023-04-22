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
        {props.servicesProps.map((item, index) => {
          return (
            <div
              className={servicesStyles.services_container_content_item}
              key={index}
              data-aos="zoom-in-up"
            >
              <Link to={`/view?category=${item?.categoryData?.[0].categoryName}&subcategory=${item?.subCategoryData?.[0].subCategoryName}`}>
                <img
                  className={servicesStyles.services_container_content_item_img}
                  src={"/image/serviceImages/" + item?.serviceData?.[0].image}
                  alt={item?.serviceData[0].serviceName}
                />
                <div
                  className={
                    servicesStyles.services_container_content_item_label
                  }
                >
                  <GoPrimitiveDot fill="#6b7cff" size={20} />
                  <p>{item?.serviceData[0].serviceName}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
