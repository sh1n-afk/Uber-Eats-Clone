import { Avatar, Button, Image, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./CustomAvatar.css";
import React from "react";
import { getImageURL } from "../../../helpers/methods";

function CustomAvatar(props) {
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const handleOnChange = (info) => {
    switch (info.file.status) {
      case "uploading":
        break;
      case "done":
        props.onChange(info);
        break;
      default:
        break;
    }
  };

  const getAvatarView = () => (
    <div>
      <div className="avatar-container">
        <Avatar
          className="avatar"
          src={<Image src={getImageURL(props.avatar)} />}
        />
      </div>
      <Upload
        showUploadList={false}
        onChange={handleOnChange}
        customRequest={dummyRequest}
      >
        <div className="button-view">
          <Button type="primary">
            <UploadOutlined />
            Change Avatar
          </Button>
        </div>
      </Upload>
    </div>
  );

  return <div className="center-container">{getAvatarView()}</div>;
}

export default CustomAvatar;
