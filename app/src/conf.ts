import axios from "axios";
import { Model } from "./conversation/types.ts";
import {
  getDev,
  getRestApi,
  getTokenField,
  getWebsocketApi,
} from "@/utils/env.ts";
import { getMemory } from "@/utils/memory.ts";

export const version = "3.6.2";
export const dev: boolean = getDev();
export const deploy: boolean = true;
export let rest_api: string = getRestApi(deploy);
export let ws_api: string = getWebsocketApi(deploy);
export const tokenField = getTokenField(deploy);

export const supportModels: Model[] = [
  // openai models
  { id: "gpt-3.5-turbo-0613", name: "GPT-3.5", free: true, auth: false },
  { id: "gpt-3.5-turbo-16k-0613", name: "GPT-3.5-16k", free: true, auth: true },
  { id: "gpt-4", name: "GPT-4", free: false, auth: true },
  { id: "gpt-4-32k", name: "GPT-4-32k", free: false, auth: true },

  // anthropic models
  { id: "claude-1", name: "Claude-2", free: true, auth: false },
  { id: "claude-2", name: "Claude-2-100k", free: false, auth: true }, // not claude-2-100k

  // spark desk
  { id: "spark-desk", name: "SparkDesk 讯飞星火", free: false, auth: true },

  // google palm2
  { id: "chat-bison-001", name: "Palm2", free: true, auth: true },

  // new bing
  { id: "bing-creative", name: "New Bing", free: true, auth: true },

  // zhipu models
  {
    id: "zhipu-chatglm-pro",
    name: "智谱 ChatGLM Pro",
    free: false,
    auth: true,
  },
  {
    id: "zhipu-chatglm-std",
    name: "智谱 ChatGLM Std",
    free: false,
    auth: true,
  },
  {
    id: "zhipu-chatglm-lite",
    name: "智谱 ChatGLM Lite",
    free: true,
    auth: true,
  },
];

export function login() {
  location.href = `https://deeptrain.net/login?app=${dev ? "dev" : "chatnio"}`;
}

axios.defaults.baseURL = rest_api;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.common["Authorization"] = getMemory(tokenField);
