import { createSlice } from '@reduxjs/toolkit';
import { modalNames } from 'common/constansts';
import { UiNotificationType } from 'components/Notification';

type initialStateType = {
  windowWidth: number;
  modals: { [key: string]: boolean };
  notification: UiNotificationType | null;
};

const initialState: initialStateType = {
  windowWidth: window.innerWidth,
  modals: {
    [modalNames.editProfile]: false,
  },
  notification: null,
};

const UiSlice = createSlice({
  name: 'ui',
  initialState: initialState,
  reducers: {
    setWindowWidth(state, action) {
      state.windowWidth = action.payload;
    },
    openModal(state, action) {
      state.modals[action.payload] = true;
    },
    closeModal(state, action) {
      state.modals[action.payload] = false;
    },
    showNotification(state, action: { payload: UiNotificationType }) {
      state.notification = action.payload;
    },
    removeNotification(state) {
      state.notification = null;
    },
  },
});

const UiSliceReducer = UiSlice.reducer;

export const {
  setWindowWidth,
  closeModal: closeModalAction,
  openModal: openModalAction,
  showNotification,
  removeNotification,
} = UiSlice.actions;

export default UiSliceReducer;
