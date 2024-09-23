const checkToken = (req) => {
  if (!req.headers.authorization) {
    const error = new Error(
      "Unauthorized. Please log in to access this resource."
    );
    error.status = 401;
    throw error;
  }
  const bearerToken = req.headers.authorization.split(" ")[1];
  if (!bearerToken) {
    const error = new Error(
      "Unauthorized. Please log in to access this resource."
    );
    error.status = 401;
    throw error;
  }
  return bearerToken;
};

module.exports = {
  checkToken,
};
