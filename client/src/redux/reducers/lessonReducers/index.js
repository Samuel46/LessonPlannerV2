import {
  LESSON_DELETE_FAIL,
  LESSON_DELETE_REQUEST,
  LESSON_DELETE_SUCCESS,
  LESSON_DETAILS_FAIL,
  LESSON_DETAILS_FAIL_BYID,
  LESSON_DETAILS_REQUEST,
  LESSON_DETAILS_REQUEST_BYID,
  LESSON_DETAILS_RESET,
  LESSON_DETAILS_RESET_BYID,
  LESSON_DETAILS_SUCCESS,
  LESSON_DETAILS_SUCCESS_BYID,
  LESSON_REGISTER_FAIL,
  LESSON_REGISTER_REQUEST,
  LESSON_REGISTER_SUCCESS,
  LESSON_UPDATE_FAIL,
  LESSON_UPDATE_REQUEST,
  LESSON_UPDATE_RESET,
  LESSON_UPDATE_SUCCESS,
} from "../../../constants/lessonConstants";

export const lessonRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case LESSON_REGISTER_REQUEST:
      return { loading: true };
    case LESSON_REGISTER_SUCCESS:
      return { loading: false, lesson: action.payload };
    case LESSON_REGISTER_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const lessonDetailsReducer = (state = { lesson: {} }, action) => {
  switch (action.type) {
    case LESSON_DETAILS_REQUEST:
      return { loading: true };
    case LESSON_DETAILS_SUCCESS:
      return { loading: false, lessons: action.payload };
    case LESSON_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case LESSON_DETAILS_RESET:
      return { lesson: {} };
    default:
      return state;
  }
};

export const lessonDetailReducer = (state = { lesson: {} }, action) => {
  switch (action.type) {
    case LESSON_DETAILS_REQUEST_BYID:
      return { loading: true };
    case LESSON_DETAILS_SUCCESS_BYID:
      return { loading: false, selectedLesson: action.payload };
    case LESSON_DETAILS_FAIL_BYID:
      return { loading: false, error: action.payload };
    case LESSON_DETAILS_RESET_BYID:
      return { lesson: {} };
    default:
      return state;
  }
};

export const lessonDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case LESSON_DELETE_REQUEST:
      return { loading: true };
    case LESSON_DELETE_SUCCESS:
      return { loading: false, success: true };
    case LESSON_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const lessonUpdateReducer = (state = { lesson: {} }, action) => {
  switch (action.type) {
    case LESSON_UPDATE_REQUEST:
      return { loading: true };
    case LESSON_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case LESSON_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case LESSON_UPDATE_RESET:
      return {
        lesson: {},
      };
    default:
      return state;
  }
};
