import axios from "axios";

import { GET_COURSE, COURSE_ERROR } from "./Types";

export const getCourse = (courseID) => async (dispatch) => {
  try {
    const res = await axios.get("/courses/" + courseID);
    dispatch({
      type: GET_COURSE,
    });
  } catch (error) {}
};
