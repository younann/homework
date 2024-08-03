import React from "react";
import { observer } from "mobx-react-lite";
import { userStore } from "../stores/userStore";
import { Avatar, Dropdown, Menu } from "antd";

import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import useAuth from "../hooks/useAuth";
import { useMediaQuery } from "react-responsive";

interface NavbarProps {
  onMenuClick: (key: string) => void;
}

const AccountArea: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const { login, logout } = useAuth();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const handleSettingsClick = () => {
    onMenuClick("3");
  };

  const menu = () => (
    <Menu>
      <Menu.Item
        key="1"
        icon={<SettingOutlined />}
        onClick={handleSettingsClick}
      >
        Settings
      </Menu.Item>
      {!userStore.isLoggedIn ? (
        <Menu.Item key="2" icon={<UserOutlined />} onClick={login}>
          Sign in
        </Menu.Item>
      ) : (
        <Menu.Item key="2" icon={<LogoutOutlined />} onClick={logout}>
          Sign out
        </Menu.Item>
      )}
    </Menu>
  );

  const styleDesktop: React.CSSProperties = {
    float: "right",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "5px",
  };
  const styleMobile: React.CSSProperties = {
    display: "flex",
    flexDirection: "column-reverse",
    justifyContent: "center",
    alignItems: "center",
    gap: "5px",
  };

  return (
    <div style={isMobile ? styleMobile : styleDesktop}>
      <h5 style={{ color: isMobile ? "black" : "white" }}>
        {userStore.displayName}
      </h5>
      <Dropdown overlay={menu} aria-label="Account menu">
        <Avatar
          size="large"
          icon={<UserOutlined />}
          src={userStore.image}
          style={{ cursor: "pointer" }}
          alt={`${userStore.displayName}'s avatar`}
        />
      </Dropdown>
    </div>
  );
};

export default observer(AccountArea);
