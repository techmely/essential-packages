export interface HMRoute {
  title: string;
  path?: string;
  component?: any;
  authenticationRequired?: boolean; // default: true
}

export interface HMSidebarMenu extends HMRoute {
  icon?: any;
  children?: HMRoute[];
}

export interface HMSidebarSubMenu extends HMSidebarMenu {
  visible?: boolean; // default: false
}
