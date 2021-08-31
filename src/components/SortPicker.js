import React from "react";
import { connect } from "dva";
import { SortActionPure } from "@/actions/product";
import { SortPreset } from "@/utils/preset";

function SortPicker({ dispatch }) {
  const handleSort = (sortType) =>
    dispatch({ ...new SortActionPure(sortType) });

  return (
    <div>
      Order by 
      <li onClick={() => handleSort(SortPreset.Asc)}>升序</li>
      <li onClick={() => handleSort(SortPreset.Desc)}>降序</li>
      <li onClick={() => handleSort(SortPreset.Nil)}>重置</li>
    </div>
  );
}

export default connect()(SortPicker);
