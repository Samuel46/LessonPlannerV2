import axios from "axios";
import {
  TEACHER_DELETE_FAIL,
  TEACHER_DELETE_REQUEST,
  TEACHER_DELETE_SUCCESS,
  TEACHER_DETAILS_FAIL,
  TEACHER_DETAILS_FAIL_BYID,
  TEACHER_DETAILS_REQUEST,
  TEACHER_DETAILS_REQUEST_BYID,
  TEACHER_DETAILS_RESET,
  TEACHER_DETAILS_SUCCESS,
  TEACHER_DETAILS_SUCCESS_BYID,
  TEACHER_REGISTER_FAIL,
  TEACHER_REGISTER_REQUEST,
  TEACHER_REGISTER_SUCCESS,
  TEACHER_UPDATE_FAIL,
  TEACHER_UPDATE_REQUEST,
  TEACHER_UPDATE_SUCCESS,
} from "../../../constants/userConstants";
import { logout } from "../userActions";

export const registerTeacher =
  (name, email, password, role) => async (dispatch, getState) => {
    try {
      dispatch({
        type: TEACHER_REGISTER_REQUEST,
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
        "/api/v1/users",
        { name, email, password, role },
        config
      );

      dispatch({
        type: TEACHER_REGISTER_SUCCESS,
        payload: data,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch(getTeacherDetails());
    } catch (error) {
      dispatch({
        type: TEACHER_REGISTER_FAIL,
        payload:
          error && error && error && error.response.data.error.split(",")
            ? error.response.data.error.split(",")
            : null,
      });
    }
  };

export const getTeacherDetails = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: TEACHER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/v1/users", config);

    dispatch({
      type: TEACHER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message = error.response ? error.response.data.error : error.message;

    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: TEACHER_DETAILS_FAIL,
      payload: message,
    });
    // dispatch(logout());
  }
};

export const getTeacherDetail = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TEACHER_DETAILS_REQUEST_BYID,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/v1/users/${id}`, config);

    dispatch({
      type: TEACHER_DETAILS_SUCCESS_BYID,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: TEACHER_DETAILS_FAIL_BYID,
      payload: message,
    });
  }
};

export const updateTeacher =
  (id, name, email, password, role) => async (dispatch, getState) => {
    try {
      dispatch({
        type: TEACHER_UPDATE_REQUEST,
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
        `/api/v1/users/${id}`,
        { name, email, password, role },
        config
      );

      dispatch({ type: TEACHER_UPDATE_SUCCESS });
      dispatch(getTeacherDetail(id));

      dispatch({ type: TEACHER_DETAILS_SUCCESS, payload: data });

      dispatch({ type: TEACHER_DETAILS_RESET });
    } catch (error) {
      const message = error.response.data.error;

      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: TEACHER_UPDATE_FAIL,
        payload: message,
      });
    }
  };

export const deleteTeacher = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TEACHER_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/v1/users/${id}`, config);

    dispatch({ type: TEACHER_DELETE_SUCCESS });
    dispatch(getTeacherDetails());
  } catch (error) {
    const message = error.response.data.error
      ? error.response.data.error
      : error.message;

    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: TEACHER_DELETE_FAIL,
      payload: message,
    });
  }
};
