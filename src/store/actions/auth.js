import * as actionTypes from './actionTypes';
import api from '../../services/api.js';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const setOnlineUser = (username, email, photo) => {
    return {
        type: actionTypes.SET_ONLINE_USER,
        username,
        email,
        photo
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
   return {
       type: actionTypes.AUTH_LOGOUT 
   };    
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (user, isSignup) => {
    return async dispatch => {
        dispatch(authStart());
        const authData = {
            email: user.email,
            password: user.password,
            username: user.username,
            isSignup: isSignup
        };

        return await api.post(`/auth`, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.userId);
                dispatch(authSuccess(response.data.token, response.data.userId));
                dispatch(checkAuthTimeout(response.data.expiresIn));            
                dispatch(setAuthRedirectPath('/chat'));
            })
            .catch(error => {
                dispatch(authFail(error.response.data))
            });
    };
};

export const fetchUserData = (userId) => {
    return async dispatch => {
        return await api.get(`/users/${userId}`)
        .then(response => {      
            dispatch(setOnlineUser(response.data.user.username, response.data.user.email, response.data.photo));
        })
        .catch(error => {console.log(error)});
    };
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));                  
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
                dispatch(setAuthRedirectPath('/chat'));
            }
        }
    };
};