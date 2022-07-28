import * as types from "../constants";

const initialState = [
  {
    sku_code: "HUIIO",
    item_name: "some",
    item_type: "dgbdh",
    order_type: "kjnjknk",
    unit_of_measurement: "kg",
    hsn_code: "300",
    item_category: "dfd",
    price: "033",
    current_stock: "033",
    min_stock_level: "03",
    max_stock_level: "03",
    gst: "03",
  },
  {
    sku_code: "HhIIO",
    item_name: "sodme",
    item_type: "dgbddeh",
    order_type: "kjnjkcdnk",
    unit_of_measurement: "kgc",
    hsn_code: "300",
    item_category: "dfd",
    price: "033",
    current_stock: "033",
    min_stock_level: "03",
    max_stock_level: "03",
    gst: "03",
  },
  {
    sku_code: "HbIIO",
    item_name: "sodme",
    item_type: "dgbdhde",
    order_type: "kjnjknck",
    unit_of_measurement: "kgcd",
    hsn_code: "300",
    item_category: "dfd",
    price: "033",
    current_stock: "033",
    min_stock_level: "03",
    max_stock_level: "03",
    gst: "03",
  },
];

export default function inventoryDataReducer(state = initialState, actions) {
  switch (actions.type) {
    case types.INVENTORY_DETAIL:
      return [...state, { ...actions.payload }];
    case types.UPDATE_INVENTORY_DETAIL: {
      let temp = [...state];
      temp[actions.payload.index] = actions.payload.inventory;
      return temp;
    }
    case types.DELETE_INVENTORY: {
      let temp = [...state];
      temp.splice(actions.payload.index, 1);
      return temp;
    }
    default:
      return state;
  }
}
