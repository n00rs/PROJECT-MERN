export const GOOGLE_CLIENT_ID =
  "776116297541-okm4oor8ffa43umtku091bvc8frbfnen.apps.googleusercontent.com";

const USER_BASE_URL = "http://localhost:5000/api/users";

const ADMIN_BASE_URL = "http://localhost:5000/api/admin";

export const USER_SIGNUP_URL = `${USER_BASE_URL}/signup`;

export const USER_LOGIN_URL = `${USER_BASE_URL}/login`;

export const EMAIL_VERIFY_URL = `${USER_BASE_URL}/verify/`;

export const LOGOUT_URL = `${USER_BASE_URL}/logout`;
// export const RESEND_EMAIL_URL = `http://localhost:5000`

export const FETCH_USERS_URL = `${USER_BASE_URL}/fetchUsers`;

export const FETCH_MSGS_URL = `${USER_BASE_URL}/fetch-messages/`;

export const NEW_BLOG_URL = `${USER_BASE_URL}/blog/new-blog`;

export const ALL_BLOG_URL = `${USER_BASE_URL}/blog/all-blogs?page=`;

export const USER_BLOGS_URL = `${USER_BASE_URL}/blog/my-blog`;

export const COMMENT_URL = `${USER_BASE_URL}/blog/comment`;

export const UPDATE_BLOG_URL = `${USER_BASE_URL}/blog/update-blog`;

export const SEARCH_BLOG_URL = `${USER_BASE_URL}/blog/search?text=`;

export const EACH_BLOG_URL = `${USER_BASE_URL}/blog/`; // blog/:blogId

export const FEATURED_BLOG_URL = `${USER_BASE_URL}/blog/featured-blog`;

export const ADMIN_LOGIN_URL = `${ADMIN_BASE_URL}/login`;

export const ADMIN_ALLUSERS_URL = `${ADMIN_BASE_URL}/fetch-allusers`;

export const BLOCK_USER_URL = `${ADMIN_BASE_URL}/block-user/`; // /block-user/:USERiD
