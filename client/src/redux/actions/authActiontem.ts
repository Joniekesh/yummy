import { toast } from "sonner";
import makeRequest from "../../utils/makeRequest";
import type { AppDispatch } from "../store";
import { logoutUser } from "../reducers/authReducers";

export const logout = () => async (dispatch: AppDispatch) => {
  try {
    const res: any = await makeRequest.post("/auth/logout");

    if (res.status === 200) {
      toast.success(res.data);
      dispatch(logoutUser());
    }
  } catch (error: any) {
    toast.error(error?.response?.data);
    console.log(error);
  }
};
