import * as getAllAreaServer from "../services/area";

export const getAllArea = async (req, res) => {
  try {
    const response = await getAllAreaServer.getAllAreaServer();

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at auth controller:" + error,
    });
  }
};
