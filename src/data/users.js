const USERS_KEY = "ne_users_v1";

export const mockUsers = [
  {
    id: "u_1",
    email: "manu@example.com",
    password: "pass123", // dev only
    username: "manu",
  },
  {
    id: "u_2",
    email: "matt@example.com",
    password: "matt123",
    username: "matt",
  },
  {
    id: "u_3",
    email: "eli@example.com",
    password: "eli123",
    username: "elivivas",
  },
];

// to use users in this file
function loadUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (raw) return JSON.parse(raw);
    localStorage.setItem(USERS_KEY, JSON.stringify(mockUsers));
    return mockUsers;
  } catch {
    return mockUsers;
  }
}

function saveUsers(list) {
  localStorage.setItem(USERS_KEY, JSON.stringify(list));
}

// Find user by email */
export function getUserByEmail(email) {
  const users = loadUsers();
  return (
    users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null
  );
}

export function registerUser({ email, password, username }) {
  const users = loadUsers();
  const exists = users.some(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );
  if (exists) return { ok: false, error: "Email already exists" };

  const user = {
    id: "u_" + Date.now().toString(36),
    email,
    password,
    username: username?.trim() || "user",
  };

  users.push(user);
  saveUsers(users);

  const { password: _pw, ...publicUser } = user;
  return { ok: true, user: publicUser };
}

// authentication */
export function authenticateUser(email, password) {
  const users = loadUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) return { ok: false, error: "User not found" };
  if (user.password !== password)
    return { ok: false, error: "Invalid password" };
  const { password: _pw, ...publicUser } = user;
  return { ok: true, user: publicUser };
}
