import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_NOTICES,
  GET_NOTICE,
  CREATE_NOTICE,
  NOTICE_ERROR,
  DELETE_NOTICE,
} from './types';

// Get all notices of user using project id

export const getNotices = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/notice/${id}`);
    dispatch({
      type: GET_NOTICES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: NOTICE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get specific notice by notice id
export const getNotice = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/notice/single/${id}`);
    dispatch({
      type: GET_NOTICE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: NOTICE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create Notice
export const createNotice = ({ id, formData }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post(`/api/notice/${id}`, formData, config);

    dispatch({
      type: CREATE_NOTICE,
      payload: res.data,
    });
    dispatch(setAlert('Notice Created', 'success'));
  } catch (err) {
    dispatch({
      type: NOTICE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete Project By project Id
export const deleteProject = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/notice/${id}`);

    dispatch({
      type: DELETE_NOTICE,
      payload: id,
    });

    dispatch(setAlert('Project Deleted', 'success'));
  } catch (err) {
    dispatch({
      type: NOTICE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
