import { init } from "./appFetch";
import * as userService from "./userService";
import * as adminService from './adminService';

export { default as NetworkError } from "./NetworkError";

export default { init, userService, adminService };
