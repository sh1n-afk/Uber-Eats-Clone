import { Button, Col, Row, Space, Typography } from "antd";
import React, { useState } from "react";
import CustomSelect from "../../../../global/components/CustomSelect";
import { generateOptionsJson } from "../../../../helpers/methods";
import ItemList from "../ItemList";

const itemFilter = [
  {
    key: "1",
    item_type: "Veg",
  },
  {
    key: "2",
    item_type: "Non-Veg",
  },
  {
    key: "3",
    item_type: "Vegan",
  },
];

function CategoryMenu(props) {
  const [selectedFilter, setSelectedFilter] = useState("");

  const getCategoryItems = (categoryId) => {
    console.log(props.items)
    let result;
    if (selectedFilter.trim() === "") {
      result = props.items.filter((item) => item.category_id === categoryId);
    } else {
      result = props.items.filter(
        (item) =>
          item.category_id === categoryId && item.item_type === selectedFilter
      );
    }

    return result;
  };

  const getCategoriesOptions = () => {
    return generateOptionsJson(
      props.categories,
      "category_name",
      "category_name",
      "category_id"
    );
  };

  const getItemFilterOptions = () => {
    return generateOptionsJson(itemFilter, "item_type", "item_type", "key");
  };

  const getCategorySelect = () => {
    return (
      <Row>
        <Col xs={4} sm={4} md={4} lg={4}>
          <CustomSelect
            width="250px"
            selectOptions={getCategoriesOptions()}
            onChange={props.handleCategorySelect}
          />
        </Col>
        <Col xs={2} sm={2} md={2} lg={2} />
        <Col xs={6} sm={6} md={6} lg={6}>
          <CustomSelect
            width="250px"
            selectOptions={getItemFilterOptions()}
            onChange={(value) => setSelectedFilter(value)}
          />
          <Button type="primary" onClick={() => setSelectedFilter("")}>
            Reset
          </Button>
        </Col>
      </Row>
    );
  };

  const getCategoriesAndItems = () => {
    return (
      <Row>
        <Col className="full-width">
          <Space direction="vertical" className="full-width">
            {props.categories.map((category) => (
              <Row key={category.category_id} id={category.category_id}>
                <Col xs={24} sm={24} md={24} lg={24}>
                  <Row>
                    <Typography.Title level={3}>
                      {category.category_name}
                    </Typography.Title>
                  </Row>
                  <Row>
                    <ItemList
                      editable={props.editable}
                      categories={props.categories}
                      allowCart={props.allowCart}
                      items={getCategoryItems(category.category_id)}
                      refreshItems={(items) => {
                        console.log(items);
                        props.refreshItems(items)}}
                    />
                  </Row>
                </Col>
              </Row>
            ))}
          </Space>
        </Col>
      </Row>
    );
  };

  return (
    <>
      {getCategorySelect()}
      {getCategoriesAndItems()}
    </>
  );
}

export default CategoryMenu;
