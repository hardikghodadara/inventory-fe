import {
  DELETE_INVENTORY,
  INVENTORY_DETAIL,
  UPDATE_INVENTORY_DETAIL,
} from "../constants";

export const saveInventories = (inventory) => {
  return async (dispatch) => {
    dispatch({ type: INVENTORY_DETAIL, payload: inventory });
  };
};
export const updateInventories = ({ inventory, index }) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_INVENTORY_DETAIL, payload: { inventory, index } });
  };
};

export const deleteInventories = (index) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_INVENTORY, payload: { index } });
  };
};

