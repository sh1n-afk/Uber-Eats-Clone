import { Form } from "antd";
import React from "react";

function CustomForm(props) {
  const classNameObject = props.className ? { className: props.className } : {};
  const initialValuesObject = props.initialValues
    ? { initialValues: props.initialValues }
    : {};
  const formRefObject = props.form ? { form: props.form } : {};
  const layoutObject = props.layout ? { layout: props.layout } : {};

  const onFinish = (values) => {
    props.onFinish(values);
  };

  return (
    <Form
      name={props.name}
      {...classNameObject}
      {...initialValuesObject}
      {...formRefObject}
      {...layoutObject}
      onFinish={onFinish}
    >
      {props.formItems.map((formItem) => (
        <Form.Item
          key={formItem.id}
          name={formItem.name}
          rules={formItem.rules}
          label={formItem.label}
        >
          {formItem.children}
        </Form.Item>
      ))}
    </Form>
  );
}

export default CustomForm;
