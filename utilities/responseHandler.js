const json2xmlparser = require('js2xmlparser');
const json2html = require('json-to-html');
const json2plainText = require('json-to-plain-text');

const sendResponse = (req, res, contentType, statusCode, data) => {
  res.setHeader('content-type', contentType);

  return res.status(statusCode).send(data);
};

const sendJsonResponse = (req, res, statusCode, data, message, status) => {
  const responseData = { status, message, data };

  return sendResponse(req, res, 'application/json', statusCode, responseData);
};

const sendXmlResponse = (req, res, statusCode, data, message, status) => {
  const responseData = json2xmlparser.parse('data', { status, message, data });

  return sendResponse(req, res, 'application/xml', statusCode, responseData);
};

const sendHTMLResponse = (req, res, statusCode, data, message, status) => {
  const responseData = json2html(JSON.parse(JSON.stringify({ status, message, data })));

  return sendResponse(req, res, 'text/html', statusCode, responseData);
};

const sendTextResponse = (req, res, statusCode, data, message, status) => {
  const responseData = json2plainText.toPlainText(
    JSON.parse(JSON.stringify({ status, message, data }))
  );

  return sendResponse(req, res, 'text/plain', statusCode, responseData);
};

module.exports = (req, res, statusCode, data, message, status) => {
  if (req.headers.accept === 'application/xml')
    sendXmlResponse(req, res, statusCode, data, message, status);
  else if (req.headers.accept === 'text/html')
    sendHTMLResponse(req, res, statusCode, data, message, status);
  else if (req.headers.accept === 'text/plain')
    sendTextResponse(req, res, statusCode, data, message, status);
  else sendJsonResponse(req, res, statusCode, data, message, status);
};
