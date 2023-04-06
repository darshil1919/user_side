// import { categoriesData } from "../../Data/CategoriesData";
import Aos from "aos";
import "aos/dist/aos.css";
import servicesStyles from "../../components/services/Services.module.css";
import { Link } from "react-router-dom";
import { GoPrimitiveDot } from "react-icons/go";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getCategory } from "../../store/action/categoryAction";

export const ServicesCategories = () => {
  Aos.init({ duration: 1000 });

  const dispatch = useDispatch();
  const {loading, error, category: categoriesData} = useSelector((state) => {
    return state.allCategory;
  });

  useEffect(() => {
    // console.log("loading", loading)
    // console.log("error", error)
    if (error) {
      // alert(error);
      dispatch(clearErrors());
    }
    dispatch(getCategory());

  }, []);

  if(loading == true){
    return <h2>loading.....</h2>;
  }
  return (
    <div className={servicesStyles.services_container}>
      <div className={servicesStyles.services_container_title}>
        <h4>Categories Of Services We Offer</h4>
        <h5>Explore the greatest our services.</h5>
      </div>
      <div className={servicesStyles.services_container_content}>
        {categoriesData.map((item) => (
          <div
            key={item._id}
            className={servicesStyles.services_container_content_item}
            data-aos="zoom-in-up"
          >
            <Link to={"/categories/" + item._id}>
              <img
                className={servicesStyles.services_container_content_item_img}
                src={"/image/categoryImages/" + item.image}
                alt={item.categoryName}
              />
              <div
                className={servicesStyles.services_container_content_item_label}
              >
                <GoPrimitiveDot fill="#6b7cff" size={20} />
                <p>{item.description}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
