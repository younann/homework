import React, { useState } from "react";
import { Layout, Button, Drawer, Menu } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";
import AccountArea from "./accountArea";

const { Header } = Layout;

interface NavbarProps {
  onMenuClick: (key: string) => void;
  items: { key: string; label: string; icon: React.ReactNode }[];
  selectedKey: string;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick, items, selectedKey }) => {
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const handleMenuItemClick = (key: string) => {
    onMenuClick(key);
    if (isMobile) {
      setDrawerVisible(false);
    }
  };

  return (
    <Header
      className="navbar"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        className="logo"
        style={{ display: "inline-block", color: "white", fontSize: "20px" }}
      >
        StockApp
      </div>

      {!isMobile && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AccountArea onMenuClick={onMenuClick} />
        </div>
      )}

      {isMobile && (
        <>
          <Button
            type="primary"
            icon={<MenuOutlined />}
            onClick={showDrawer}
            style={{ float: "right", background: "none", border: "none" }}
            aria-label="Open menu"
          />
          <Drawer
            title="Menu"
            placement="right"
            onClose={closeDrawer}
            visible={drawerVisible}
            aria-label="Main menu"
          >
            <AccountArea onMenuClick={onMenuClick} />
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              selectedKeys={[selectedKey]}
              onClick={({ key }) => handleMenuItemClick(key)}
              items={items.map(({ key, label, icon }) => ({
                key,
                label,
                icon,
              }))}
            />
          </Drawer>
        </>
      )}
    </Header>
  );
};

export default Navbar;
