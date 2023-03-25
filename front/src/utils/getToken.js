import jwtDecode from "jwt-decode";

export const getToken = () => {
    const token = sessionStorage.getItem("AccessToken");
    if (!token) return null;
    return token;
};

export const getDecodedToken = () => {
    const token = sessionStorage.getItem('AccessToken');
    if (token) return jwtDecode(token);
};