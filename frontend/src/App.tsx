import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import Navbar from "./components/navbar";
import Cookies from "js-cookie";
import { userStore } from "./stores/userStore";
import Portfolio from "./pages/portfolio";
import Stocks from "./pages/stocks";
import Settings from "./pages/settings";
import { useMediaQuery } from "react-responsive";
import { FundTwoTone, SettingOutlined, StockOutlined } from "@ant-design/icons";

const { Content, Footer } = Layout;

const items = [
  {
    key: "1",
    label: "Stock Data",
    icon: <StockOutlined />,
    component: <Stocks />,
  },
  {
    key: "2",
    label: "Portfolio",
    icon: <FundTwoTone />,
    component: <Portfolio />,
  },
  {
    key: "3",
    label: "Settings",
    icon: <SettingOutlined />,
    component: <Settings />,
  },
];

const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string>("1");
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie && !userStore.user) {
      const userData = JSON.parse(userCookie);
      userStore.setUser(userData);
    }
  }, []);

  const handleMenuClick = (key: string) => {
    setSelectedKey(key);
    if (isMobile) {
      setDrawerVisible(false);
    }
  };

  const renderContent = () => {
    const selectedItem = items.find((item) => item.key === selectedKey);
    return selectedItem ? selectedItem.component : <Stocks />;
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Navbar
        onMenuClick={handleMenuClick}
        items={items}
        selectedKey={selectedKey}
      />
      <Layout>
        {!isMobile && (
          <Layout.Sider theme="dark" breakpoint="lg" collapsedWidth="0">
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["1"]}
              selectedKeys={[selectedKey]}
              onClick={({ key }) => handleMenuClick(key)}
              items={items.map(({ key, label, icon }) => ({
                key,
                label,
                icon,
              }))}
            />
          </Layout.Sider>
        )}
        <Layout style={{ minHeight: "700px" }}>
          <Content style={{ margin: "24px 16px 0" }}>
            <div
              style={{
                padding: 24,
                minHeight: 600,
                background: "#fff",
                borderRadius: "8px",
              }}
            >
              {renderContent()}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            StockApp ©{new Date().getFullYear()} Created by Younan Nwesre
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
