const { createSlice } = require("@reduxjs/toolkit");

console.log(document.cookie.slice("="));

let user = getCookie("userId");
const admin = getCookie("admin");

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

const initialState = {
  userExist: user ? user : "",
  adminExist: admin ? admin : "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userExist = action.payload;
    },
    setAdmin: (state, action) => {
      state.adminExist = action.payload;
    },
  },
});

export const { setUser, setAdmin } = authSlice.actions;
export default authSlice.reducer;
