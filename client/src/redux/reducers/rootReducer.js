// ** Redux Imports
import { combineReducers } from "redux";
// ** Reducers Imports
import navbar from "./navbar";
import layout from "./layout";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
  userForgotEmailReducer,
  userResetPasswordReducer,
  userUpdatePasswordReducer,
} from "./userReducers";
import {
  teacherRegisterReducer,
  teacherDetailsReducer,
  teacherDeleteReducer,
  teacherDetailReducer,
  teacherUpdateReducer,
} from "./teacherReducers";
import {
  lessonRegisterReducer,
  lessonDetailsReducer,
  lessonDeleteReducer,
  lessonDetailReducer,
  lessonUpdateReducer,
} from "./lessonReducers";

const rootReducer = combineReducers({
  navbar,
  layout,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userUpdatePassword: userUpdatePasswordReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userForgotEmail: userForgotEmailReducer,
  userResetPassword: userResetPasswordReducer,
  //
  teacherRegister: teacherRegisterReducer,
  teacherDetails: teacherDetailsReducer,
  teacherDelete: teacherDeleteReducer,
  teacherDetail: teacherDetailReducer,
  teacherUpdate: teacherUpdateReducer,
  //
  lessonRegister: lessonRegisterReducer,
  lessonDetails: lessonDetailsReducer,
  lessonDelete: lessonDeleteReducer,
  lessonDetail: lessonDetailReducer,
  lessonUpdate: lessonUpdateReducer,
});

export default rootReducer;
