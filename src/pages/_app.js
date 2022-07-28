import { Provider } from "react-redux";

import store from "../redux/store";
import Form from "./form";

import NavBar from "../components/navBar";

export default function MyApp() {
  return (
    <Provider store={store}>
      <NavBar />
      <Form />
    </Provider>
  );
}
