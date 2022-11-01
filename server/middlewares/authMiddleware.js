const { verify } = require("jsonwebtoken");

const verifyAccessToken = async (req, res, next) => {
  const access_token = req?.cookies?.access_token;
  if (!access_token)
    throw { statusCode: 403, message: "no token no Authorisation" };

  //verifing access_token

  const decode = verify(access_token, process.env.JWT_SECRET);

  // console.log(decode);
  req.userId = decode?.userId;
  next();
};

const verifyAdmin = (req, res, next) => {
  console.log(req.cookies);

  const token = req?.cookies?.adminAccessToken;

  if (!token) throw { statusCode: 403, message: "no token no authorization" };

  const decode = verify(token, process.env.ADMIN_JWT_KEY);

  console.log(decode, "admin decoded");

  req.adminId = decode?.adminId;

  next();
};

module.exports = { verifyAccessToken, verifyAdmin };
