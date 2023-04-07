import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import serviceStyle from "./service.module.css";
import "./style.css";
import { Link } from "react-router-dom";
import { GoPrimitiveDot } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import {
  getServiceBySubCategory,
  clearErrors,
} from "../../../store/action/serviceAction";
import Details from "./Details";

export const Service = (props) => {
  Aos.init({ duration: 700 });

  const [open, setOpen] = React.useState(false);
  const [dialogData, setDialogData] = React.useState({});

  const dispatch = useDispatch();
  const { loading, error, service } = useSelector((state) => {
    console.log(state.allService);
    return state.allService;
  });

  useEffect(() => {
    if (error) {
      console.log(error);
      dispatch(clearErrors());
    }
    dispatch(getServiceBySubCategory(props.subCategoryName));
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  if (loading == true) {
    return <h2>loading.....</h2>;
  }

  return (
    <div className={serviceStyle.services_container}>
      <div className={serviceStyle.services_container_title}>
        <h4>{props.subCategoryName}</h4>
        <h5>{"Explore the greatest our services."}</h5>
      </div>
      <div className={serviceStyle.services_container_content}>
        <div className="item-list details-active">
          {service?.map((item, index) => {
            return (
              <div key={index} className="item">
                <div className="item-img">
                  <img
                    className="img-div"
                    src={"/image/serviceImages/" + item.image}
                  />
                </div>
                <div className="item-detail">
                  <a href="#" className="item-name">
                    {item.serviceName}
                  </a>
                  <div className="item-price">
                    <span className="new-price">
                      <span>&#8377; </span>
                      {item.price}
                    </span>
                    {/* <span className="old-price">$275.60</span> */}
                  </div>
                  <div className="item-price">
                    <span className="new-price">{item.duration} Minutes</span>
                    {/* <span className="old-price">$275.60</span> */}
                  </div>
                  <p>{item.description}</p>
                  <button type="button" className="add-btn">
                    add to cart
                  </button>
                  <button
                    type="link"
                    className="view_details_btn"
                    onClick={() => {
                      setOpen(true);
                      setDialogData(item)
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>

              // <div
              //   className={serviceStyle.services_container_content_item}
              //   key={item._id}
              //   data-aos="zoom-in-up"
              // >
              //   {/* <Link to={"/categories/" + item.category + "/" + item.id}> */}
              //     <img
              //       className={serviceStyle.services_container_content_item_img}
              //       src={"image/serviceImages/" + item.image}
              //       alt={item.serivceName}
              //     />
              //     <div
              //       className={
              //         serviceStyle.services_container_content_item_label
              //       }
              //     >
              //       <GoPrimitiveDot fill="#6b7cff" size={20} />
              //       <p>{item.description}</p>
              //     </div>
              //   {/* </Link> */}
              // </div>
            );
          })}
        </div>
      </div>
      <Details open={open} handleClose={handleClose} data={dialogData} />
    </div>
  );
};
