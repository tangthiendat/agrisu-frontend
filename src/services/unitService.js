import axios from "axios";
const BASE_API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1";
class UnitService {
  async getAll() {
    return (await axios.get(`${BASE_API_URL}/units`)).data;
  }
}

export const unitService = new UnitService();