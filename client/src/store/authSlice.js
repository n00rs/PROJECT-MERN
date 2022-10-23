const { createSlice } = require("@reduxjs/toolkit");

console.log(document.cookie.slice("="));

let userId = getCookie("userId");

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
  userExist: userId ? userId : "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userExist = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
