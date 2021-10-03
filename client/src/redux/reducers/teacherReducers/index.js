import {
  TEACHER_DELETE_FAIL,
  TEACHER_DELETE_REQUEST,
  TEACHER_DELETE_SUCCESS,
  TEACHER_DETAILS_FAIL,
  TEACHER_DETAILS_FAIL_BYID,
  TEACHER_DETAILS_REQUEST,
  TEACHER_DETAILS_REQUEST_BYID,
  TEACHER_DETAILS_RESET,
  TEACHER_DETAILS_RESET_BYID,
  TEACHER_DETAILS_SUCCESS,
  TEACHER_DETAILS_SUCCESS_BYID,
  TEACHER_REGISTER_FAIL,
  TEACHER_REGISTER_REQUEST,
  TEACHER_REGISTER_SUCCESS,
  TEACHER_UPDATE_FAIL,
  TEACHER_UPDATE_REQUEST,
  TEACHER_UPDATE_RESET,
  TEACHER_UPDATE_SUCCESS,
} from "../../../constants/userConstants";

export const teacherRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case TEACHER_REGISTER_REQUEST:
      return { loading: true };
    case TEACHER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case TEACHER_REGISTER_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const teacherDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case TEACHER_DETAILS_REQUEST:
      return { loading: true };
    case TEACHER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case TEACHER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case TEACHER_DETAILS_RESET:
      return { user: {} };
    default:
      return state;
  }
};

export const teacherDetailReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case TEACHER_DETAILS_REQUEST_BYID:
      return { loading: true };
    case TEACHER_DETAILS_SUCCESS_BYID:
      return { loading: false, user: action.payload };
    case TEACHER_DETAILS_FAIL_BYID:
      return { loading: false, error: action.payload };
    case TEACHER_DETAILS_RESET_BYID:
      return { user: {} };
    default:
      return state;
  }
};

export const teacherUpdateReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case TEACHER_UPDATE_REQUEST:
      return { loading: true };
    case TEACHER_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case TEACHER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case TEACHER_UPDATE_RESET:
      return {
        user: {},
      };
    default:
      return state;
  }
};

export const teacherDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TEACHER_DELETE_REQUEST:
      return { loading: true };
    case TEACHER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case TEACHER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
