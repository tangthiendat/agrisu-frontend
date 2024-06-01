import axios from "axios";
import { IUnit } from "../interfaces";

const API_URL = import.meta.env.VITE_API_URL;

interface IUnitService {
  getAll: () => Promise<IUnit[]>;
}

class UnitService implements IUnitService {
  public async getAll(): Promise<IUnit[]> {
    return (await axios.get(`${API_URL}/units`)).data;
  }
}

export const unitService = new UnitService();
