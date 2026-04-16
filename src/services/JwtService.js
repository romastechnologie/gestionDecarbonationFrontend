const ID_TOKEN_KEY = "id_token";
const ID_USER_KEY = "id_user";
const USER_INFO = "user_info";
const ID_PHONE_KEY = "user_phone";
const USER_NAME = "user_name";
const USER_LASTNAME = "user_lastname";
const USER_EMAIL = "user_email";
const USER_PRIVILEGE = "user_privilege";
const USER_ROLE = "user_role";
/**
 * @description get token form localStorage
 */
export const getToken = () => {
    return window.localStorage.getItem(ID_TOKEN_KEY);
};
export const saveUserPhone = (telephone) => {
    window.localStorage.setItem(ID_PHONE_KEY, telephone);
};
/**
 * @description get privilige form localStorage
 */
export const getPrivilege = () => {
    const privlg = window.localStorage.getItem(USER_PRIVILEGE);
    let privlgTable = [];
    if (privlg != null) {
        privlgTable = JSON.parse(privlg);
    }
    return privlgTable;
};
export const destroyUserPrivilege = () => {
    window.localStorage.removeItem(USER_PRIVILEGE);
};
export const savePrivilege = (privilege) => {
    window.localStorage.setItem(USER_PRIVILEGE, privilege);
};
export const getRole = () => {
    const roll = window.localStorage.getItem(USER_ROLE);
    let rollTable = [];
    if (roll != null) {
        rollTable = JSON.parse(roll);
    }
    return rollTable;
};
export const destroyUserRole = () => {
    window.localStorage.removeItem(USER_ROLE);
};
export const saveRole = (role) => {
    window.localStorage.setItem(USER_ROLE, role);
};
export const getUserPhone = () => {
    return window.localStorage.getItem(ID_PHONE_KEY);
};
export const setUserEmail = (email) => {
    window.localStorage.setItem(USER_EMAIL, email);
};
export const getUserEmail = () => {
    return window.localStorage.getItem(USER_EMAIL);
};
export const destroyUserEmail = () => {
    window.localStorage.removeItem(USER_EMAIL);
};
/**
 * @description get user form localStorage
 */
export const getUser = () => {
    return window.localStorage.getItem(ID_USER_KEY);
};
export const getUserName = () => {
    return window.localStorage.getItem(USER_NAME);
};
export const getUserLastName = () => {
    return window.localStorage.getItem(USER_LASTNAME);
};
export const saveUserName = (name) => {
    window.localStorage.setItem(USER_NAME, name);
};
export const saveUserLastName = (prenom) => {
    window.localStorage.setItem(USER_LASTNAME, prenom);
};
export const destroyUserPhone = () => {
    window.localStorage.removeItem(ID_PHONE_KEY);
};
export const destroyUserName = () => {
    window.localStorage.removeItem(ID_PHONE_KEY);
};
/**
 * @description save token into localStorage
 * @param token: string
 */
export const saveToken = (token) => {
    window.localStorage.setItem(ID_TOKEN_KEY, token);
};
/**
 * @description save user into localStorage
 * @param user: string
 */
export const saveUser = (user) => {
    window.localStorage.setItem(ID_USER_KEY, user);
};
export const saveUserInfo = (user_info) => {
    window.localStorage.setItem(USER_INFO, user_info);
};
export const getUserInfo = () => {
    return window.localStorage.getItem(USER_INFO);
};
export const destroyUserINfo = () => {
    window.localStorage.removeItem(USER_INFO);
};
/**
 * @description remove token form localStorage
 */
export const destroyToken = () => {
    window.localStorage.removeItem(ID_TOKEN_KEY);
};
/**
 * @description remove user form localStorage
 */
export const destroyUser = () => {
    window.localStorage.removeItem(ID_USER_KEY);
};
export default { destroyUserPrivilege, getPrivilege, savePrivilege,
    getToken, saveUserName, saveUserLastName, setUserEmail, getUserEmail, destroyUserEmail,
    getUserName, getUserLastName, getUserPhone, saveUserPhone, destroyUserPhone, destroyUserName,
    saveToken, destroyToken, saveUser, destroyUser, getUser,
    destroyUserRole, getRole, saveRole, };
//# sourceMappingURL=JwtService.js.map