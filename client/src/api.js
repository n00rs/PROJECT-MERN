const USER_BASE_URL = "http://localhost:5000/api/users";

const ADMIN_BASE_URL = "http://localhost:5000/api/admin";

export const USER_SIGNUP_URL = `${USER_BASE_URL}/signup`;

export const USER_LOGIN_URL = `${USER_BASE_URL}/login`;

export const EMAIL_VERIFY_URL = `${USER_BASE_URL}/verify/`;

export const LOGOUT_URL = `${USER_BASE_URL}/logout`;

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

export const FETCH_PRODUCTS_URL = `${USER_BASE_URL}/shop/products`; /// /shop/products?page=&catgory =

export const FETCH_EACH_PROD_URL = `${USER_BASE_URL}/shop/each-prod/`; //   /shop/each-prod/:prodId

export const CART_COUNT_API = `${USER_BASE_URL}/shop/cart-count`;

export const CART_API = `${USER_BASE_URL}/shop/cart`;

//ADMIN_API

export const ADMIN_LOGIN_URL = `${ADMIN_BASE_URL}/login`;

export const ADMIN_ALLUSERS_URL = `${ADMIN_BASE_URL}/fetch-allusers`;

export const BLOCK_USER_URL = `${ADMIN_BASE_URL}/block-user/`; //      /block-user/:USERiD

export const ADMIN_ALLBLOG_API = `${ADMIN_BASE_URL}/all-blogs`;

export const ADMIN_BLOG_API = `${ADMIN_BASE_URL}/blog/`; //    /api/admin/verify-blog/:blogId

export const ADD_PRODUCT_API = `${ADMIN_BASE_URL}/products`;

export const FETCH_PRODS_API = `${ADMIN_BASE_URL}/products?page=`; //                 /api/admin/products?page=0

export const OUT_OF_STOCK_API = `${ADMIN_BASE_URL}/products/`; //                 /api/admin/products/:prodId

export const UPDATE_STOCK_API = `${ADMIN_BASE_URL}/update-product/`;
