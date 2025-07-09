import apiClient from "./api-client";
interface LoginResponse {
  token: string | null;
}

interface TokenVerifyPayload {
  token: string | null;
}
class AuthService {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }
  login(email: string, password: string) {
    return apiClient.post<LoginResponse>(this.endpoint + "/login", {
      email,
      password,
    });
  }

  token({ token }: TokenVerifyPayload) {
    return apiClient.post<TokenVerifyPayload>(this.endpoint + "/session", {
      token,
    });
  }

  me() {
    const controller = new AbortController();
    const request = apiClient.get(this.endpoint + "/me", {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }
}

const create = (endpoint: string) => new AuthService(endpoint);

export default create("/auth");
