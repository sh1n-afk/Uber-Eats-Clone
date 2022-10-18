import { Button, Modal, Radio, Space } from "antd";
import React, { useState } from "react";
import STRINGS from "../../../global/constants/StringConstants";
import Login from "./Login";
import SignUp from "./SignUp";

function Auth() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [memberType, setMemberType] = useState(STRINGS.restaurant);
  const [displayLogin, setDisplayLogin] = useState(true);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const getSignInButton = () => {
    return (
      <Button type="primary" className="login-button" onClick={showModal}>
        Sign In
      </Button>
    );
  };

  const getMemberTypeOptions = () => {
    return (
      <Radio.Group
        defaultValue={STRINGS.restaurant}
        onChange={(event) => setMemberType(event.target.value)}
      >
        <Radio value={STRINGS.restaurant}>Restaurant</Radio>
        <Radio value={STRINGS.customer}>Customer</Radio>
      </Radio.Group>
    );
  };

  const getAuthModal = () => {
    return (
      <Modal
        title={displayLogin ? STRINGS.login : STRINGS.register}
        visible={isModalVisible}
        onCancel={closeModal}
        footer={null}
      >
        <Space direction="vertical" size={25} className="space-container">
          {getMemberTypeOptions()}
          {displayLogin ? (
            <Login
              setDisplayLogin={setDisplayLogin}
              memberType={memberType}
              closeModal={closeModal}
            />
          ) : (
            <SignUp
              memberType={memberType}
              setDisplayLogin={setDisplayLogin}
              closeModal={closeModal}
            />
          )}
        </Space>
      </Modal>
    );
  };

  return (
    <>
      {getSignInButton()}
      {getAuthModal()}
    </>
  );
}

export default Auth;
