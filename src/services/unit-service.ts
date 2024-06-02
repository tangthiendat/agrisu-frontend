import { type AxiosInstance } from "axios";
import { type IUnit } from "../interfaces";
import { createApiClient } from "./api";

interface IUnitService {
  apiClient: AxiosInstance;
  getAll: () => Promise<IUnit[]>;
}

class UnitService implements IUnitService {
  public apiClient: AxiosInstance;

  constructor() {
    this.apiClient = createApiClient("units");
  }

  public async getAll(): Promise<IUnit[]> {
    return (await this.apiClient.get("")).data;
  }
}

export const unitService = new UnitService();
