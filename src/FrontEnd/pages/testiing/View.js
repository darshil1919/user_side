import React from "react";
import { useSearchParams } from "react-router-dom";
import { Subcategory } from "./subcategory/Subcategory";
import { Service } from "./service/service";

const View = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");
  const subcategory = searchParams.get("subcategory");
  
  if (subcategory) {
    return (
      <>
        <Service subCategoryName={subcategory} />
      </>
    )
  }
  return (
    <>
      <Subcategory categoryName={category} />
    </>
  );
};

export default View;
