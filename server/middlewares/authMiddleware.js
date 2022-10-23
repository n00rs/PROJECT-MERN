const { verify } = require("jsonwebtoken");

const verifyAccessToken = async (req, res, next) => {
  try {
    // console.log(req?.cookies);
    //access_token from cookies
    const access_token = req?.cookies?.access_token;
    if (!access_token)
      throw { status: 403, message: "no token no Authorisation" };

    //verifing access_token

    const decode = await verify(access_token, process.env.JWT_SECRET);

    // console.log(decode);
    req.userId = decode?.userId;
    next();
  } catch (err) {
    const statusCode = err.status ? err.status : 500;
    console.log(err, "err in middleware");
    res.status(statusCode).json(err.message);
  }
};

module.exports = verifyAccessToken;
