import { Button, Col, Popover, Row, Space, Menu, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomSelect from "../../../global/components/CustomSelect";
import { generateOptionsJson } from "../../../helpers/methods";
import { selectMemberId } from "../../shared/auth/authSlice";
import CategoryForm from "../MenuEdit/CategoryForm";
import ItemForm from "../MenuEdit/ItemForm";
import { fetchCategories, fetchItems } from "../restaurantService";
import CategoryMenu from "./CategoryMenu";
import ItemList from "./ItemList";

function MenuView() {
  const [categoryPopoverVisible, setCategoryPopoverVisible] = useState(false);
  const [showMenuEdit, setShowMenuEdit] = useState(false);
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [categoryItems, setCategoryItems] = useState([]);
  const restaurantId = useSelector(selectMemberId);

  useEffect(() => {
    loadCategoriesAndItems();
  }, []);

  const handleCategoryPopoverVisible = (visible) => {
    setCategoryPopoverVisible(visible);
  };

  const loadCategoriesAndItems = async () => {
    const [categories, items] = await Promise.all([
      fetchCategories(restaurantId),
      fetchItems(restaurantId),
    ]);
    setCategories(categories.data.categories);
    setItems(items.data.items);
  };

  const refreshItems = (items) => {
    setItems(items);
  };

  const handleCategorySelect = (value, categoryJson) => {
    document.getElementById(categoryJson.data.category_id).scrollIntoView();
  };

  const getMenuView = () => {
    return (
      <Space direction="vertical" size={10} className="full-width">
        <Row>
          <Col>
            <Space>
              <Popover
                content={
                  <CategoryForm
                    closeForm={() => handleCategoryPopoverVisible(false)}
                    refreshCategories={(categories) =>
                      setCategories(categories)
                    }
                  />
                }
                title="Add Category"
                trigger="click"
                visible={categoryPopoverVisible}
                onVisibleChange={handleCategoryPopoverVisible}
              >
                <Button type="primary">Add Category</Button>
              </Popover>
              <Button type="primary" onClick={() => setShowMenuEdit(true)}>
                Add Item
              </Button>
            </Space>
          </Col>
        </Row>
        <Row>
          <Typography.Title level={2}>Menu</Typography.Title>
        </Row>
        <CategoryMenu
          editable
          items={items}
          categories={categories}
          handleCategorySelect={handleCategorySelect}
          allowCart={false}
          refreshItems={refreshItems}
        />
      </Space>
    );
  };

  const getMenuEdit = () => {
    return (
      <ItemForm
        closeForm={() => setShowMenuEdit(false)}
        refreshItems={(items) => setItems(items)}
        categories={categories}
      />
    );
  };

  return <>{showMenuEdit ? getMenuEdit() : getMenuView()}</>;
}

export default MenuView;
