import { createApiClient } from "./api";

class UnitService {
  constructor() {
    this.api = createApiClient("/api/units");
  }
  async getAll() {
    return this.api.get("");
  }
}

export const unitService = new UnitService();
