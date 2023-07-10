import * as getAllProvinceSever from "../services/province";

export const getAllProvince = async (req, res) => {
  try {
    const response = await getAllProvinceSever.getAllProvince();

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at auth controller:" + error,
    });
  }
};
