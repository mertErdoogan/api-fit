const crypto = require("crypto");

const RANDOM_STRING_SIZE = 8;
const RANDOM_HEADER_NAME = "x-iyzi-rnd";
const CLIENT_VERSION = "x-iyzi-client-version";
const AUTHORIZATION = "Authorization";
const IYZI_WS_HEADER_NAME = "IYZWS";
const IYZI_WS_HEADER_NAME_V2 = "IYZWSv2";
const SEPARATOR = ":";

const requestSample = {
  locale: "tr",
  conversationId: "123456789",
  binNumber: "554960",
};
const reqUrl = "/payment/bin/check";

const IYZIPAY_URI = process.env.IYZIPAY_URI;
const IYZIPAY_API_KEY = process.env.IYZIPAY_API_KEY;
const IYZIPAY_SECRET_KEY = process.env.IYZIPAY_SECRET_KEY;

module.exports = function getHttpHeaders() {
  let headers = {};
  const randomString =
    process.hrtime()[0] + Math.random().toString(RANDOM_STRING_SIZE).slice(2);
  const v2AuthUrlRegex = RegExp(/\/v2\//);
  headers[RANDOM_HEADER_NAME] = randomString;
  headers[CLIENT_VERSION] = "iyzipay-node-2.0.61";
  if (v2AuthUrlRegex.test(reqUrl)) {
    headers[AUTHORIZATION] =
      IYZI_WS_HEADER_NAME_V2 +
      " " +
      IYZIPAY_API_KEY +
      SEPARATOR +
      generateHashV2(
        IYZIPAY_API_KEY,
        randomString,
        IYZIPAY_SECRET_KEY,
        requestSample.toString()
      ); // hata alırsan toString i sil dene.
  } else {
    headers[AUTHORIZATION] =
      IYZI_WS_HEADER_NAME +
      " " +
      IYZIPAY_API_KEY +
      SEPARATOR +
      generateHash(
        IYZIPAY_API_KEY,
        randomString,
        IYZIPAY_SECRET_KEY,
        generateRequestString(requestSample)
      );
  }
  return headers;
}

function generateHash(apiKey, randomString, secretKey, body) {
  var shaSum = crypto.createHash("sha1");
  shaSum.update(apiKey + randomString + secretKey + body, "utf8");
  return shaSum.digest("base64");
}

function generateHashV2(apiKey, separator, uri, randomString, secretKey, body) {
  var signature = crypto
    .createHmac("sha256", secretKey)
    .update(randomString + uri + JSON.stringify(body))
    .digest("hex");

  var authorizationParams = [
    "apiKey" + separator + apiKey,
    "randomKey" + separator + randomString,
    "signature" + separator + signature,
  ];
  return new Buffer(authorizationParams.join("&")).toString("base64");
}

function generateRequestString(request) {
  var isArray = Array.isArray(request);
  var requestString = "[";
  for (var i in request) {
    var val = request[i];
    if (typeof val !== "undefined" && typeof val !== "function") {
      // Eliminate number keys of array elements
      if (!isArray) {
        requestString += i + "=";
      }
      if (typeof val === "object") {
        requestString += generateRequestString(val);
      } else {
        requestString += val;
      }
      requestString += isArray ? ", " : ",";
    }
  }
  requestString = requestString.slice(0, isArray ? -2 : -1);
  requestString += "]";
  return requestString;
}
