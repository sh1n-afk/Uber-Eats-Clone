import { Button } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  selectDeliverySelected,
  setDeliverySelected,
} from "../../../screens/customer/customerSlice";
import STRINGS from "../../constants/StringConstants";

function DeliveryModeSwitch() {
  const dispatch = useDispatch();
  const deliverySelected = useSelector(selectDeliverySelected);

  return (
    <>
      <Button
        type={deliverySelected ? "default" : "primary"}
        onClick={() => dispatch(setDeliverySelected(false))}
      >
        {STRINGS.pickup}
      </Button>
      <Button
        type={deliverySelected ? "primary" : "default"}
        onClick={() => dispatch(setDeliverySelected(true))}
      >
        {STRINGS.delivery}
      </Button>
    </>
  );
}

export default DeliveryModeSwitch;
