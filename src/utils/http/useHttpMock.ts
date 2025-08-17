import { createStorage } from "@/store/createStorage";
import { request } from "./index";
import { PUBLIC_PATH } from "../constants";

function useHttpMock() {
  const storage = createStorage("localStorage");

  const loadData = async (url: string) => {
    const data = storage.storageGet<string>(url);
    if (data) {
      return JSON.parse(data);
    }
    return await request(`${PUBLIC_PATH + "/data" + url}`, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  };

  const updateData = (url: string, data: any) => {
    storage.storageSet(url, data);
  };

  return {
    loadData,
    updateData,
  };
}

export default useHttpMock;
