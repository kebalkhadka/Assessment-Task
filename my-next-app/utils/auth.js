let users = {}; // In-memory user storage

export const registerUser = (username, password) => {
  if (users[username]) {
    return false; // User already exists
  }
  users[username] = password;
  return true; // Registration successful
};

export const loginUser = (username, password) => {
  return users[username] === password; // Check credentials
};
