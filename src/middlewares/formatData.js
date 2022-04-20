const formatData = async (req, res, next) => {
  // override res.send to send jsonp if needed
  // checking callback is not needed as express does it internally

  switch (req.query.format) {
    case 'jsonp': {
      const oldSend = res.send;
      res.send = function (data) {
        res.send = oldSend; // avoid 'double-send'
        return res.jsonp(data);
      };
      break;
    }

    default:
      break;
  }
  next();
};

export default formatData;
