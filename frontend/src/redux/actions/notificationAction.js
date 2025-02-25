import axios from "axios";
import { GET_NOTIFICATION } from "../contants/notificationContants.js";
import domain from "../../config/domain";

export const getNotificationByUserID = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://${domain}:4000/notification/get-notification-by-user-id/`,
        {
          params: { id },
        },
        { withCredentials: true }
      );
      dispatch({
        type: GET_NOTIFICATION,
        payload: response.data.notification,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
