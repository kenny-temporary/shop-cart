import React from "react";
import { FilterActionPure } from "@/actions/product";
import style from './specification.less';

function SpecificationPicker({ specifications, selected, dispatch }) {
  const handleSwitchSpecication = (specification) => {
    dispatch({ ...new FilterActionPure(specification) });
  };

  return (
    <ul className={style.specificationPickerController}>
      {specifications?.map((specification) => {
        return (
          <li
            key={specification}
            style={{
              height: "2rem",
              width: "2rem",
              borderRadius: "50%",
              textAlign: "center",
              lineHeight: "2rem",
              fontSize: "0.65rem",

              backgroundColor: selected?.includes(specification)
                ? "RED"
                : "GREEN",
            }}
            onClick={() => handleSwitchSpecication(specification)}
          >
            {specification}
          </li>
        );
      })}
    </ul>
  );
}

export default SpecificationPicker;
