import React from "react";

const AuthContext = React.createContext({
  loggedIn: false,
  login: () => {},
});

export default AuthContext;
