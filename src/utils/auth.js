const TOKEN_KEY = "jwt";

export function authorize(email, password) {
  return new Promise((resolve) => {
    resolve({ token: "fake-dev-token" });
  });
}

export function checkToken(token) {
  return new Promise((resolve, reject) => {
    if (!token) {
       reject(new Error("No token"));
       return;
    }
    resolve({
      data: { _id: "fake-id", username: "DemoUser", email: "demo@example.com" },
    });
  });
}

export function saveToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}
export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}
