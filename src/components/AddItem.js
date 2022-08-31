import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/AddItem.module.css";
import {
  updateInventories,
  saveInventories,
  deleteInventories,
} from "../redux/action/inventoryDataAction";

const BUTTON_STATE = { SAVE: "SAVE", UPDATE: "UPDATE" };

const arr = [
  {
    key: "sku_code",
    lable: "Sku Code",
    type: "text",
    defaultValue: "",
    isFilterAllowed: true,
  },
  {
    key: "item_name",
    lable: "Item Name",
    type: "text",
    defaultValue: "",
    isFilterAllowed: true,
  },
  {
    key: "order_type",
    lable: "Order Type",
    type: "text",
    defaultValue: "",
    isFilterAllowed: false,
  },
  {
    key: "item_type",
    lable: "Item_type",
    type: "text",
    defaultValue: "",
    isFilterAllowed: false,
  },
  {
    key: "unit_of_measurement",
    lable: "Unit Of Measurement",
    type: "text",
    defaultValue: "",
    isFilterAllowed: false,
  },
  {
    key: "hsn_code",
    lable: "Hsn Code",
    type: "number",
    defaultValue: 0,
    isFilterAllowed: false,
  },
  {
    key: "item_category",
    lable: "Item Category",
    type: "text",
    defaultValue: "",
    isFilterAllowed: true,
  },
  {
    key: "price",
    lable: "Price",
    type: "number",
    defaultValue: 0,
    isFilterAllowed: false,
  },
  {
    key: "current_stock",
    lable: "Current Stock",
    type: "number",
    defaultValue: 0,
    isFilterAllowed: false,
  },
  {
    key: "min_stock_level",
    lable: "Min.Stock Level",
    type: "number",
    defaultValue: 0,
    isFilterAllowed: false,
  },
  {
    key: "max_stock_level",
    lable: "Max.Stock Level",
    type: "number",
    defaultValue: 0,
    isFilterAllowed: false,
  },
  {
    key: "gst",
    lable: "Gst",
    type: "number",
    defaultValue: 0,
    isFilterAllowed: false,
  },
];

//  reduce to default value
const initialState = arr.reduce(
  (acc, curr) => ({
    ...acc,
    [curr.key]: curr.defaultValue,
  }),
  {}
);

export default function AddItem() {
  const [filter, setFilter] = useState(initialState);
  const [obj, setObj] = useState(initialState);
  const [buttonState, setButtonState] = useState(BUTTON_STATE.SAVE);
  const [editIndex, setEditIndex] = useState(undefined);

  const inventoryDataReducer = useSelector(({ inventoryDataReducer }) => {
    return inventoryDataReducer;
  });

  const dispatch = useDispatch();

  const onChange = (key) => (e) => {
    setObj((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const onFilterChange = (key) => (e) => {
    setFilter((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  //  filter function for filtering array
  const filterFunction = (value) => {
    for (let i = 0; i < arr.length; i++) {
      if (
        arr[i].isFilterAllowed &&
        !value[arr[i].key]
          .toLowerCase()
          .includes(filter[arr[i].key].toLowerCase())
      )
        return false;
    }
    return true;
  };

  const submit = () => {
    // if any of one inputField(key) is empty then form will not submit,update andsave

    // {  key = Object.keys(obj)                  //meaning of keys(obj) is "keys of obj"
    //        if(key.some((key)=>{
    //       return!obj(key)
    //         }))
    //     }
    if (
      Object.keys(obj).some((key) => {
        return !obj[key];
      })
    ) {
      return false;
    }
    console.log(obj);

    if (buttonState === BUTTON_STATE.SAVE) {
      console.log(obj);
      dispatch(saveInventories(obj));
      setObj(initialState);
    } else {
      console.log(obj);
      dispatch(updateInventories({ inventory: obj, index: editIndex }));
      setObj(initialState);
      setButtonState(BUTTON_STATE.SAVE);
      setEditIndex(undefined);
    }
  };
  const onEdit = ({ inventory, index }) => {
    return () => {
      setButtonState(BUTTON_STATE.UPDATE);
      setEditIndex(index);
      setObj(inventory);
    };
  };

  // onDelete handler dispatch the deletInventories function that is
  const onDelete = (index) => () => {
    // here,,     deleteInventories => action 
    //            index =>payload    
    dispatch(deleteInventories(index));
  };

  return (
    <div>
      {/* <h2 className={styles.h2}> Inventory </h2> */}
      <div className={styles.app}>
        <div className={styles.form}>
          {arr.map((input) => {
            return (
              <div key={input.key}>
                <label htmlFor={input.key}>{input.lable}</label>
                <input
                  className={styles.input}
                  type={input.type}
                  value={obj[input.key]}
                  onChange={onChange(input.key)}
                  id={input.key}
                  placeholder={input.key}
                />
              </div>
            );
          })}
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.btn} onClick={submit}>
            {buttonState}
          </button>
        </div>
      </div>
      <div className={styles.tablecontainer}>
        {!!inventoryDataReducer.length && (
          <table className={styles.table}>
            <thead>
              <tr className={styles.tr}>
                {/* here "Object" is a class  */}
                {Object.keys(inventoryDataReducer[0]).map((inventory) => (
                  <td className={styles.td} key={inventory}>
                    {inventory}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className={styles.tr}>
                {/* here "Object" is a class  */}
                {arr.map((inventory) => (
                  <td className={styles.td} key={inventory.key}>
                    {inventory.isFilterAllowed ? (
                      <input
                        className={styles.input}
                        type={inventory.type}
                        value={filter[inventory.key]}
                        onChange={onFilterChange(inventory.key)}
                      />
                    ) : null}
                  </td>
                ))}
              </tr>
              {inventoryDataReducer
                .filter(filterFunction)
                .map((inventory, index) => {
                  return (
                    <tr key={index}>
                      {Object.keys(inventory).map((key) => (
                        <td className={styles.td} key={key}>
                          {inventory[key]}
                        </td>
                      ))}
                      <td>
                        <button
                          className={styles.edit}
                          onClick={onEdit({ inventory, index })}
                        >
                          Edit
                        </button>
                        {/* onclick event called a onDelete function, and passed only one parameter "index " because that delete only one whole row  */}
                        <button
                          className={styles.delete}
                          onClick={onDelete(index)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
