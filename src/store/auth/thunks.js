import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./authSlice";

export const checkingAuthentication = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await singInWithGoogle();
    if (!result.ok) return dispatch(logout(result.errorMessage));

    dispatch(login(result));
  };
};


//cuando se registra un usuario con email y password se debe loguear
export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
  return async( dispatch ) => {

      dispatch( checkingCredentials() );

      const result = await registerUserWithEmailPassword({ email, password, displayName });
      if ( !result.ok ) return dispatch( logout( result.errorMessage ) );

      dispatch( login( result ))

  }

}

//cuando el usuario se loguea con email y password
export const startLoginWithEmailPassword = ({ email, password }) => {
  return async( dispatch ) => {

      dispatch( checkingCredentials() );

      const result = await loginWithEmailPassword({ email, password });
      console.log(result);

      if ( !result.ok ) return dispatch( logout( result ) );
      dispatch( login( result ));

  }
}


//cuando el usuario hace logout de la aplicacion se debe desloguear de firebase
export const startLogout = () => {
  return async( dispatch ) => {
      
      await logoutFirebase();

      dispatch( logout() );

  }
}
