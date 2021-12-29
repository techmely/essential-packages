export interface HMRoute {
  title: string;
  path?: string;
  component?: any;
  authenticationRequired?: boolean; // default: true
}

export interface MelySidebarMenu extends HMRoute {
  icon?: any;
  children?: HMRoute[];
}

export interface HMSidebarSubMenu extends MelySidebarMenu {
  visible?: boolean;
}
