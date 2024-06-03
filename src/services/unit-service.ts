import { type IUnit } from "../interfaces";
import { createApiClient } from "./api-client.ts";

interface IUnitService {
  getAll: () => Promise<IUnit[]>;
}

const apiClient = createApiClient("units");
class UnitService implements IUnitService {
  public async getAll(): Promise<IUnit[]> {
    return (await apiClient.get("")).data;
  }
}

export const unitService = new UnitService();
