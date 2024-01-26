const handleValidationError = (err, res) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const errorMessage = errors.length > 1
    ? errors.join(" || ")
    : errors[0];

  res.status(400).send({ message: errorMessage });
};

const handleDuplicateKeyError = (err, res) => {
  if (err.code === 11000) {
    res.status(400).send({ message: "This email address is already registered" });
  } else {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const typeError = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    handleValidationError(err, res);
  } else {
    handleDuplicateKeyError(err, res);
  }
};

module.exports = { typeError };

