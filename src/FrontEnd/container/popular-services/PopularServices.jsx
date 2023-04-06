import { useDispatch, useSelector } from "react-redux";
import { Services } from "../../components/services/Services";
import { popularServices } from "../../Data/ServicesData";
import { useEffect } from "react";
import { clearErrors, getService } from "../../store/action/serviceAction";

export const PopularServices = () => {
  // const dispatch = useDispatch();
  // const {error, loading, service: popularServices} = useSelector((state) => {
  //   console.log("service====>>>>", state.allService.service.slice(0, 6))
  //   return state.allService
  // })
  
  // useEffect(() => {
  //   if(error){
  //     console.log(error)
  //     dispatch(clearErrors())
  //   }
  //   dispatch(getService())
  // }, [dispatch])

  // if(loading == true){
  //   return <h2>loading.....</h2>;
  // }

  return (
    <Services
      servicesProps={popularServices}
      // category={popularServices.category}
      title={"Most Popular Services"}
      tagLine={"Explore the greatest our services."}
    />
  );
};
