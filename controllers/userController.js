const fs = require("fs");

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/users.json`)
);

exports.checkId = (req, res, next, val) => {
  console.log(`Tour ID is: ${val}`);
  const user = users.find((el) => el.id === +val);
  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.firstName) {
    return res.status(400).json({
      status: "fail",
      message: "First name is mandatory",
    });
  }
  if (!req.body.userName) {
    return res.status(400).json({
      status: "fail",
      message: "User name is mandatory",
    });
  }
  if (!req.body.password) {
    return res.status(400).json({
      status: "fail",
      message: "Password is mandatory",
    });
  }
  next();
};

exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: users.length,
    data: {
      users,
    },
  });
};

exports.getUser = (req, res) => {
  const user = users.find((el) => el.id === +req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
};

exports.createUser = (req, res) => {
  const newId = +users[users.length - 1].id + 1;
  const newUser = { id: newId, ...req.body };
  console.log({ newUser });

  users.push(newUser);

  fs.writeFile(
    `${__dirname}/../dev-data/users.json`,
    JSON.stringify(users),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          user: newUser,
        },
      });
    }
  );
};

exports.updateUser = (req, res) => {
  res.status(200).json({
    status: "success",
    user: "<Updated user here>",
  });
};

exports.deleteUser = (req, res) => {
  const newUsers = users.filter((user) => {
    return user.id !== id;
  });
  fs.writeFile(
    `${__dirname}/../dev-data/users.json`,
    JSON.stringify(newUsers),
    (err) => {
      if (err) {
        console.log({ err });
        return res.status(500).json({
          status: "faled",
          message: "Internal Server Error",
        });
      }
      res.status(204).json({
        status: "success",
        data: null,
      });
    }
  );
};
