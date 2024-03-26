import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
class UnitService {
  async getAll() {
    return (await axios.get(`${API_BASE_URL}/api/units/`)).data;
  }
}

export const unitService = new UnitService();
