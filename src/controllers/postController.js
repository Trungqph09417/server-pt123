import * as postService from "../services/post";

export const getPosts = async (req, res) => {
  try {
    const response = await postService.getPostsService();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at category controller:" + e,
    });
  }
};

export const getPostsPaginate = async (req, res) => {
  const { page, priceNumber, areaNumber, ...query } = req.query;
  // console.log(req.query);

  try {
    const response = await postService.getPostPaginatesService(page, query, {
      priceNumber,
      areaNumber,
    });
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at category controller:" + e,
    });
  }
};

export const getNewPosts = async (req, res) => {
  try {
    const response = await postService.getNewPostService();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at category controller:" + e,
    });
  }
};
export const createNewPosts = async (req, res) => {
  try {
    const { categoryCode, title, priceNumber, areaNumber, label } = req.body;
    const { id } = req.user;
    if (!categoryCode || !id || !title || !priceNumber || !areaNumber || !label)
      return res.status(400).json({
        err: 1,
        msg: "Missing inputs!",
      });
    const response = await postService.createNewPostsService(req.body, id);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at category controller:" + e,
    });
  }
};

export const getPostsPaginateManage = async (req, res) => {
  const { page, ...query } = req.query;
  const { id } = req.user;
  try {
    if (!id)
      return res.status(400).json({
        err: 1,
        msg: "Missing inputs!",
      });
    const response = await postService.getPostPaginatesManage(page, id, query);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at category controller:" + e,
    });
  }
};

export const updatePost = async (req, res) => {
  const { postId, imagesId, overviewId, attributesId, ...payload } = req.body;
  const { id } = req.user;
  try {
    if (!postId || !imagesId || !overviewId || !attributesId || !id)
      return res.status(400).json({
        err: 1,
        msg: "Missing inputs!",
      });
    const response = await postService.updatePost(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at category controller:" + e,
    });
  }
};

export const deletePost = async (req, res) => {
  const { postId } = req.query;
  const { id } = req.user;

  try {
    if (!postId || !id)
      return res.status(400).json({
        err: 1,
        msg: "Missing inputs!",
      });
    const response = await postService.deletePost(postId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at category controller:" + e,
    });
  }
};
