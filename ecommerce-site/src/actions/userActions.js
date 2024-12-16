import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
} from '../constants/userConstants';

const mockUserDatabase = [
    { email: 'test@example.com', password: 'password123', name: 'Test User' },
    { email: 'user2@example.com', password: 'mypassword', name: 'Second User' },
];


export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });

        await new Promise((resolve) => setTimeout(resolve, 10));

        const user = mockUserDatabase.find(
            (u) => u.email === email && u.password === password
        );

        if (!user) {
            throw new Error('Invalid email or password');
        }

        const userInfo = {
            email: user.email,
            name: user.name,
        };

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: userInfo,
        });

        localStorage.setItem('userInfo', JSON.stringify(userInfo));
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.message || 'Something went wrong',
        });
    }
};


export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: USER_LOGOUT });
};


export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST });

        await new Promise((resolve) => setTimeout(resolve, 10));

        const userExists = mockUserDatabase.find((u) => u.email === email);
        if (userExists) {
            throw new Error('User already exists');
        }

    
        const newUser = { name, email, password };
        mockUserDatabase.push(newUser);

        const userInfo = {
            name: newUser.name,
            email: newUser.email,
        };

    
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: userInfo,
        });

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: userInfo,
        });

        localStorage.setItem('userInfo', JSON.stringify(userInfo));
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.message || 'Something went wrong',
        });
    }
};
