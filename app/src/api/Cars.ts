import { Base } from "./Base";

export default class Quiz extends Base {
  async getCars() {
    const response = await this.request.get(`${this.baseUrl}/cars/`);
    return response.data;
  }
}
