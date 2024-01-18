import apiClient from "./apiClient";

class HTTPservice {
  enpoint = "";

  constructor(enpoint: string) {
    this.enpoint = enpoint;
  }

  getAll<T>() {
    const controller = new AbortController();

    const req = apiClient.get<T[]>(this.enpoint, {
      signal: controller.signal,
    });

    return { req, cancel: () => controller.abort() };
  }

  detele(id: number) {
    return apiClient.delete(`${this.enpoint}/${id}`);
  }

  update<T>(id: number, updatedData: T) {
    return apiClient.patch(`${this.enpoint}/${id}`, updatedData);
  }

  add<T>(data: T) {
    return apiClient.post(this.enpoint, data);
  }
}

const createHTTP = (endpoint: string) => {
  return new HTTPservice(endpoint);
};

export default createHTTP;
