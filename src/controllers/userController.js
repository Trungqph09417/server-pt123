import * as UserService from "../services/user";

export const getCurrentUser = async (req, res) => {
  const { id } = req.user;
  try {
    const response = await UserService.getOneUser(id);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at auth controller:" + error,
    });
  }
};
export const updateUser = async (req, res) => {
  const { id } = req.user;
  const payload = req.body;
  try {
    if (!payload)
      return res.status(400).json({
        err: 1,
        msg: "Misng input",
      });
    const response = await UserService.updateUser(payload, id);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at auth controller:" + error,
    });
  }
};
