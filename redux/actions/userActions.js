import axios from 'axios';
import absoluteUrl from 'next-absolute-url';
import {
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  CLEAR_ERRORS,
  LOAD_PROFILE_BY_ID,
  LOAD_PROFILE_SUCCESS,
  LOAD_PROFILE_FAIL,
  UPDATE_PROFILE,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_SUCCESS,
} from '../constants/userConstants';

// Register user
export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_USER_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post('/api/auth/register', userData, config);

    dispatch({
      type: REGISTER_USER_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Loader user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_USER_REQUEST,
    });
    const { data } = await axios.get('/api/me');

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Load profile by id
export const loadUserProfile = (req, id) => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_PROFILE_BY_ID,
    });

    const { origin } = absoluteUrl(req);

    const { data } = await axios.get(`${origin}/api/profile?id=${id}`);

    dispatch({
      type: LOAD_PROFILE_SUCCESS,
      payload: data.user,
    })
  } catch(error) {
    dispatch({
      type: LOAD_PROFILE_FAIL,
      payload: error.message.data?.message,
    });
  }
}

export const updateUserProfile = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_PROFILE,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put(`/api/profile`, payload, config);

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data.user,
    })
  } catch(error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.message.data?.message,
    });
  }
}

// Clear Errors
export const clearError = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
