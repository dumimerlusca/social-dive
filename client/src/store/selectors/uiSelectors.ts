import { RootState } from 'store/store';

export const isMobileDevice = (state: RootState) => state.ui.windowWidth < 600;
export const isTabletDevice = (state: RootState) => state.ui.windowWidth < 1024;
export const isDesktopDevice = (state: RootState) => state.ui.windowWidth >= 1024;

export const isModalOpenSelector = (modalName: string) => (state: RootState) =>
  state.ui.modals[modalName];

export const getNotification = (state: RootState) => state.ui.notification;
