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
  UPDATE_PROFILE_SUCCESS,
  LOAD_PROFILE_FAIL,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE,
} from '../constants/userConstants';

// All reducer
export const authReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return {
        loading: true,
      };

    case REGISTER_USER_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case REGISTER_USER_FAIL:
      return {
        loading: false,
      };

    case CLEAR_ERRORS: {
      return {
        ...state,
        error: null,
      };
    }
    default:
      return state;
  }
};

export const loadedUserReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case LOAD_USER_REQUEST:
      return {
        ...state,
        loading: true,
        isAuthenticated: false,
      };
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOAD_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      };

    case LOAD_PROFILE_BY_ID:
      return {
        ...state,
        loadingProfile: true,
      };
    case LOAD_PROFILE_SUCCESS:
      return {
        ...state,
        loadingProfile: false,
        currentProfile: action.payload,
      };
    case LOAD_PROFILE_FAIL:
      return {
        ...state,
        loadingProfile: false,
        error: action.payload,
      }

    case UPDATE_PROFILE:
      return {
        ...state,
        loadingProfile: true,
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loadingProfile: false,
        currentProfile: action.payload,
        user: action.payload,
      };
    case UPDATE_PROFILE_FAIL:
      return {
        ...state,
        loadingProfile: false,
        error: action.payload,
      }

    case CLEAR_ERRORS: {
      return {
        ...state,
        error: null,
      };
    }
    default:
      return state;
  }
};
