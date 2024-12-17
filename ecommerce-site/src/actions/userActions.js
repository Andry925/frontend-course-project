import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_RESET

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



export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST });

        await new Promise((resolve) => setTimeout(resolve, 10));

        const user = mockUserDatabase.find((u) => u.id === id);

        if (!user) {
            throw new Error('User not found');
        }

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: { id: user.id, name: user.name, email: user.email },
        });
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.message || 'Something went wrong',
        });
    }
};


export const updateUserProfile = (updatedUserData) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

        await new Promise((resolve) => setTimeout(resolve, 10));
        const {
            userLogin: { userInfo },
        } = getState();

        if (!userInfo) {
            throw new Error('User not logged in');
        }
        const userIndex = mockUserDatabase.findIndex((u) => u.email === userInfo.email);

        if (userIndex === -1) {
            throw new Error('User not found');
        }

        mockUserDatabase[userIndex] = {
            ...mockUserDatabase[userIndex],
            ...updatedUserData,
        };

        const updatedUser = {
            email: mockUserDatabase[userIndex].email,
            name: mockUserDatabase[userIndex].name,
        };

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: updatedUser,
        });

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: updatedUser,
        });

        localStorage.setItem('userInfo', JSON.stringify(updatedUser));
    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.message || 'Something went wrong',
        });
    }
};