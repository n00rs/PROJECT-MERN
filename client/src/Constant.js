export const GOOGLE_CLIENT_ID =
  "776116297541-okm4oor8ffa43umtku091bvc8frbfnen.apps.googleusercontent.com";

const BASE_URL = "http://localhost:5000/api";
export const USER_SIGNUP_URL = `${BASE_URL}/users/signup`;
export const USER_LOGIN_URL = `${BASE_URL}/users/login`;
export const EMAIL_VERIFY_URL = `${BASE_URL}/users/verify/`;
export const LOGOUT_URL = `${BASE_URL}/users/logout`;
// export const RESEND_EMAIL_URL = `http://localhost:5000`
export const FETCH_USERS_URL = `${BASE_URL}/users/fetchUsers`;
export const FETCH_MSGS_URL = `${BASE_URL}/users/fetch-messages/`;
export const NEW_BLOG_URL = `${BASE_URL}/users/new-blog`;
export const ALL_BLOG_URL = `${BASE_URL}/users/all-blogs?page=`;
export const USER_BLOGS_URL = `${BASE_URL}/users/my-blog`;
export const COMMENT_URL = `${BASE_URL}/users/blog/comment`;
export const UPDATE_BLOG_URL = `${BASE_URL}/users/blog/update-blog`;
