import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import subcategoryStyle from "./subcategory.module.css";
import { Link } from "react-router-dom";
import { GoPrimitiveDot } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getSubCategoryByCategory } from "../../../store/action/subcategoryAction";

export const Subcategory = (props) => {
  Aos.init({ duration: 700 });

  const dispatch = useDispatch();
  const { loading, error, subcategory: subCategoryData } = useSelector((state) => {
    // console.log(state.allCategory);
    return state.allSubCategory;
  })

  useEffect(() => {
    if (error) {
      console.log(error);
      dispatch(clearErrors());
    }
    dispatch(getSubCategoryByCategory(props.categoryName));

  }, []);

  if(loading == true){
    return <h2>loading.....</h2>;
  }

  return (
    <div className={subcategoryStyle.services_container}>
      <div className={subcategoryStyle.services_container_title}>
        <h4>{props.categoryName}</h4>
        <h5>{'Explore the greatest our services.'}</h5>
      </div>
      <div className={subcategoryStyle.services_container_content}>
        {subCategoryData.map((item) => {
          return (
            <div
              className={subcategoryStyle.services_container_content_item}
              key={item._id}
              data-aos="zoom-in-up"
            >
              <Link to={"/view?category=" + props.categoryName + "&subcategory=" + item.subCategoryName}>
                <img
                  className={subcategoryStyle.services_container_content_item_img}
                  src={"image/subCategoryImages/" + item.image}
                  alt={item.subCategoryName}
                />
                <div
                  className={
                    subcategoryStyle.services_container_content_item_label
                  }
                >
                  <GoPrimitiveDot fill="#6b7cff" size={20} />
                  <p>{item.description}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
