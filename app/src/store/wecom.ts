import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./index.ts";
import { getWecomConfig } from "@/api/wecom.ts";

// 企业微信配置类型
interface WecomConfig {
  appid: string;
  agentid: string;
  requestUrl: string;
  state: string;
}

export const wecomSlice = createSlice({
  name: "wecom",
  initialState: {
    config: null as WecomConfig | null,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    setConfig: (state, action) => {
      state.config = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// 异步获取企业微信配置
export const fetchWecomConfig = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await getWecomConfig();
    dispatch(setConfig(response.data));
  } catch (error: any) {
    dispatch(setError(error.message || "获取企业微信配置失败"));
  }
};

export const { setConfig, setLoading, setError } = wecomSlice.actions;

// 选择器
export const selectWecomConfig = (state: RootState) => state.wecom.config;
export const selectWecomLoading = (state: RootState) => state.wecom.loading;
export const selectWecomError = (state: RootState) => state.wecom.error;

export default wecomSlice.reducer; 