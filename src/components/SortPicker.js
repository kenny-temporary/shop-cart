import React from "react";
import { connect } from "dva";
import { Select } from "antd";
import { SortActionPure } from "@/actions/product";
import { SortPreset } from "@/utils/preset";

const { Option } = Select;

function SortPicker({ dispatch }) {
  const handleSort = (sortType) => {
    dispatch({ ...new SortActionPure(sortType) });
  }

  return (
    <div>
      <span style={{ fontSize: "1rem" }}>Order by </span>
      <Select
        defaultValue={SortPreset.Nil}
        onChange={handleSort}
        style={{ width: '10rem' }}
      >
        <Option value={SortPreset.Nil}>Reset</Option>
        <Option value={SortPreset.Asc}>Lowest to highest</Option>
        <Option value={SortPreset.Desc}>Highest to lowest</Option>
      </Select>
    </div>
  );
}

export default connect()(SortPicker);
