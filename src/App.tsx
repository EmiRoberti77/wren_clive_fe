import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PosPage from "./pages/PosPage";
import HeatPage from "./pages/HeatPage";
import HeatPage1 from "./pages/Heatpage1";
import HeatPage2 from "./pages/Heatpage2";
import LoginPage from "./pages/LoginPage";
import Demographics from "./pages/Demographics";
import store from "./state/store";
import { Provider } from "react-redux";
import SideBar from "./components/general/SideBar";
import "./css/App.css";
import { Page } from "./pages";
import SettingsPage from "./pages/SettingsPage";
import ManageUsers from "./pages/ManageUsers";
import PosTransacPage from "./pages/PosTransacPage";
import React, { useEffect, useState } from "react";
import PeopleCountingPage from "./pages/PeopleCountingPage";




const App: React.FC = () => {
  
  const [displayBar, setDisplayBar] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    if (Page.POSTRANSAC == window.location.pathname) setDisplayBar(false);
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="master_container">
          
          {displayBar ? <SideBar /> : null}
          <div className="side-page">
            <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path={Page.HOME} element={<HomePage />} />
            <Route path={Page.HEATMPAGE} element={<HeatPage />} />
            <Route path={Page.HEATMPAGE1} element={<HeatPage1 />} />
            <Route path={Page.HEATMPAGE2} element={<HeatPage2 />} />
            <Route path={Page.DEMOGRAPHICS} element={<Demographics />} />
            <Route path={Page.POSPAGE} element={<PosPage />} />
            <Route path={Page.SETTINGS} element={<SettingsPage />} />
            <Route path={Page.MANGEUSERS} element={<ManageUsers />} />
            <Route path={Page.POSTRANSAC} element={<PosTransacPage />} />
            <Route
              path={Page.PEOPLECOUNTING}
              element={<PeopleCountingPage />}
            />
          </Routes>
         
        </div>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
