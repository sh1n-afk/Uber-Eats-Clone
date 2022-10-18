import React from "react";
import { Select } from "antd";

const { Option } = Select;

function CustomSelect(props) {
  const placeholderObject = props.placeholder
    ? { placeholder: props.placeholder }
    : {};

  const defaultValueObject = props.defaultValue
    ? { defaultValue: props.defaultValue }
    : {};

  const onChangeObject = props.onChange ? { onChange: props.onChange } : {};

  return (
    <Select
      showSearch
      style={{ width: props.width ? props.width : "100%" }}
      {...placeholderObject}
      {...defaultValueObject}
      optionFilterProp="children"
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      {...onChangeObject}
    >
      {props.selectOptions.map((selectOption) => (
        <Option
          key={selectOption.key}
          value={selectOption.value}
          data={selectOption.data}
        >
          {selectOption.text}
        </Option>
      ))}
    </Select>
  );
}

export default CustomSelect;
