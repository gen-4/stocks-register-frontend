import * as actions from './actions';
import reducer from './reducer'
import * as selectors from './selectors';

export { default as App } from "./components/App";
export { default as Home } from "./components/Home";


export default { actions, reducer, selectors };