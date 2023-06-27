import React from "react";
import { Page } from "../../pages";

export interface ISideBarMenu {
  name: string;
  icon: string;
  path: Page;
  submenu?: ISideBarMenu[];
}

export const SideBarData: ISideBarMenu[] = [
  {
    name: "Home",
    icon: "bi-house",
    path: Page.HOME,
  },
  {
    name: "FootFall",
    icon: "bi bi-people",
    path: Page.PEOPLECOUNTING,
  },
  {
    name: "Demographics",
    icon: "bi bi-bar-chart-line",
    path: Page.DEMOGRAPHICS,
  },
  {
    name: "Heatmap",
    icon: "bi bi-fire",
    path: Page.HEATMPAGE,
    // submenu:[
    //   {
    //     name:'Heat page 1',
    //     icon: 'bi bi-fire',
    //     path: Page.HEATMPAGE1
    //   },
    //   {
    //     name:'Heat page 2',
    //     icon: 'bi bi-fire',
    //     path: Page.HEATMPAGE2
    //   } ]
  },

  {
    name: "POS",
    icon: "bi bi-cash-coin",
    path: Page.POSPAGE,
    // submenu:[
    //   {
    //     name:'Reports',
    //     icon: 'bi bi-wallet',
    //     path: Page.POSPAGE
    //   },
    //   {
    //     name:'Warnings',
    //     icon: 'bi bi-exclamation-diamond',
    //     path: Page.POSPAGE
    //   },
    // ]
  },
  {
    name: "Users",
    icon: "bi bi-people-fill",
    path: Page.MANGEUSERS,
    submenu: [
      {
        name: "Manage",
        icon: "bi bi-person-vcard",
        path: Page.MANGEUSERS,
      },
    ],
  },
  

  

  
  
  {
    name: "Setting",
    icon: "bi bi-gear-fill",
    path: Page.SETTINGS,
  },
  {
    name: "logout",
    icon: "bi bi-door-closed",
    path: Page.SETTINGS,
  },
];
