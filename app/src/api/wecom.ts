import axios from "axios";

// 企业微信配置API
export async function getWecomConfig() {
  return axios.get('/wecom-config');
}

// 企业微信登录API
export async function loginWithWecom(data: {
  code: string;
  agentid: string;
  state: string;
}) {
  return axios.get('/wecom-callback', { params: data });
}

// 根据企业微信授权码获取Token
export async function getWecomToken(code: string) {
  return axios.get(`/wecom-token?code=${code}`);
} 