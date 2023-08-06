import { Provider } from "react-redux";
import store from "./redux/store/store";

function AppProviders({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

export default AppProviders;
