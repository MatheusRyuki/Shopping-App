import { AsyncStorage } from "react-native";
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
export const SET_DID_TRY_AL = "SET_DID_TRY_AL";
let timer;


export const setDidTryAl = () => {
  return { type: SET_DID_TRY_AL }
} 

export const authenticate = (userId, token, expiryDate) => {
  return dispatch => {
    dispatch(setLogoutTimer(expiryDate));
    dispatch({ type: AUTHENTICATE, userId, token });
  };
};

export const signup = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCSAOVLfWtAEZek7sFleuOIWQpqCftoj1Y",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;

      let message = "Algo aconteceu de errado!";

      if (errorId === "EMAIL_EXISTS") {
        message = "Esse e-mail já existe!";
      }

      throw new Error(message);
    }

    const resData = await response.json();

    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000
      )
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

export const login = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCSAOVLfWtAEZek7sFleuOIWQpqCftoj1Y",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      console.log(errorResData)

      let message = "Algo aconteceu de errado!";

      if (errorId === "INVALID_EMAIL") {
        message = "Esse e-mail não foi encontrado!";
      } else if (errorId === "INVALID_PASSWORD") {
        message = "Essa senha não é válida!";
      } else if (errorId === "EMAIL_NOT_FOUND") {
        message = "Email não existe"
      }
      throw new Error(message);
    }

    const resData = await response.json();

    dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000
      )
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem("userData");
  return { type: LOGOUT };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = expirationTimer => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTimer);
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token,
      userId,
      expiryDate: expirationDate.toISOString()
    })
  );
};
