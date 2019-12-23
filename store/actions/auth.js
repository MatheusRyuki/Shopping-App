export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";

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

    dispatch({
      type: "SIGNUP",
      token: resData.idToken,
      userId: resData.localId
    });
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

      let message = "Algo aconteceu de errado!";

      if (errorId === "INVALID_EMAIL") {
        message = "Esse e-mail não foi encontrado!";
      } else if (errorId === "INVALID_PASSWORD") {
        message = "Essa senha não é válida!";
      }
      throw new Error(message);
    }

    const resData = await response.json();

    dispatch({
      type: "LOGIN",
      token: resData.idToken,
      userId: resData.localId
    });
  };
};
