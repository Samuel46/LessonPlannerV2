import axios from "axios";
import {
  LESSON_DELETE_FAIL,
  LESSON_DELETE_REQUEST,
  LESSON_DELETE_SUCCESS,
  LESSON_DETAILS_FAIL,
  LESSON_DETAILS_FAIL_BYID,
  LESSON_DETAILS_REQUEST,
  LESSON_DETAILS_REQUEST_BYID,
  LESSON_DETAILS_RESET,
  LESSON_DETAILS_SUCCESS,
  LESSON_DETAILS_SUCCESS_BYID,
  LESSON_REGISTER_FAIL,
  LESSON_REGISTER_REQUEST,
  LESSON_REGISTER_SUCCESS,
  LESSON_UPDATE_FAIL,
  LESSON_UPDATE_REQUEST,
  LESSON_UPDATE_SUCCESS,
} from "../../../constants/lessonConstants";
import { logout } from "../userActions";

export const addLesson =
  (
    title,
    week,
    description,
    objective,
    procedures,
    homework,
    accommodations,
    dueDate
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: LESSON_REGISTER_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/v1/lesson`,
        {
          title,
          week,
          description,
          objective,
          procedures,
          homework,
          accommodations,
          dueDate,
        },
        config
      );
      dispatch({
        type: LESSON_REGISTER_SUCCESS,
        payload: data,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch(getLessonDetails());
    } catch (error) {
      dispatch({
        type: LESSON_REGISTER_FAIL,
        payload:
          error && error.response.data.error.split(",")
            ? error && error.response.data.error.split(",")
            : error && error.message,
      });
    }
  };

export const getLessonDetails = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: LESSON_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/v1/lesson", config);

    dispatch({
      type: LESSON_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message = error.response ? error.response.data.error : error.message;

    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: LESSON_DETAILS_FAIL,
      payload: message,
    });
    dispatch(logout());
  }
};

export const getLessonDetail = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LESSON_DETAILS_REQUEST_BYID,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/v1/lesson/${id}`, config);

    dispatch({
      type: LESSON_DETAILS_SUCCESS_BYID,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.error
        ? error.response.data.error
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: LESSON_DETAILS_FAIL_BYID,
      payload: message,
    });
  }
};

export const updateLesson =
  (
    id,
    title,
    week,
    description,
    objective,
    procedures,
    homework,
    accommodations,
    dueDate
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: LESSON_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/v1/lesson/${id}`,
        {
          title,
          week,
          description,
          objective,
          procedures,
          homework,
          accommodations,
          dueDate,
        },
        config
      );

      dispatch({ type: LESSON_UPDATE_SUCCESS });

      dispatch({ type: LESSON_DETAILS_SUCCESS_BYID, payload: data });

      dispatch(getLessonDetails());
    } catch (error) {
      const message = error && error.response.data.error;

      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: LESSON_UPDATE_FAIL,
        payload: message,
      });
    }
  };

export const deleteLesson = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LESSON_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/v1/lesson/${id}`, config);

    dispatch({ type: LESSON_DELETE_SUCCESS });
    dispatch(getLessonDetails());
  } catch (error) {
    const message = error.response.data.error
      ? error.response.data.error
      : error.message;

    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: LESSON_DELETE_FAIL,
      payload: message,
    });
  }
};
