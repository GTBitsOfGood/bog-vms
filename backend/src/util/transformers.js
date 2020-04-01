function cleanUser(user) {
  // Remove authentication metadata from user before serializing
  const { login, ...rest } = user;
  return rest;
}

module.exports = { cleanUser };
