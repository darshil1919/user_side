import { useDispatch, useSelector } from "react-redux";
import { Services } from "../../components/services/Services";
import { popularServices } from "../../Data/ServicesData";
import { useEffect } from "react";
import { getTop6Service } from "../../store/action/serviceAction";
import Loader from "../../components/loader/Loader";

export const PopularServices = () => {
  const dispatch = useDispatch();
  const { service: popularServices } = useSelector((state) => state.top6Service)
  
  useEffect(() => {
    dispatch(getTop6Service())
  }, [dispatch])

  return (
    <>
    <Services
      servicesProps={popularServices}
      // category={popularServices.category}
      title={"Most Popular Services"}
      tagLine={"Explore the greatest our services."}
    />
    {/* {
      loading ? <Loader /> : null
    } */}
    </>
  );
};
