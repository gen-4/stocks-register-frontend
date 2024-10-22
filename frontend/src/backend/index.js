import { init } from "./appFetch";
import * as userService from "./userService";
import * as adminService from './adminService';
import * as stocksService from './stocksService';

export { default as NetworkError } from "./NetworkError";

export default { init, userService, adminService, stocksService };
