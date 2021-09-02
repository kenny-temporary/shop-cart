import React from "react";
import classnames from "classnames";
import { FilterActionPure } from "@/actions/product";
import style from "./specification.less";

function SpecificationPicker({ specifications, selected, dispatch }) {
  const handleSwitchSpecication = (specification) => {
    dispatch({ ...new FilterActionPure(specification) });
  };

  return (
    <ul
      className={classnames(
        "row justify-content-lg-start justify-content-center px-4",
        style.specificationPickerController
      )}
    >
      <h6 className="text-lg-start fs-5 text-center">Size</h6>
      {specifications?.map((specification) => {
        return (
          <li
            className="col col-lg-3 col-1 mb-3 mx-lg-0 mx-2"
            key={specification}
            onClick={() => handleSwitchSpecication(specification)}
          >
            <div
              className={style.item}
              style={{
                backgroundColor: selected?.includes(specification)
                  ? "#1b1a20"
                  : "#ececec",
                color: selected?.includes(specification)? "white": "black"
              }}
            >
              {specification}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default SpecificationPicker;
