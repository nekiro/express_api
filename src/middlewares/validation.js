import { ValidationError } from './errorHandler';

const options = {
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true,
};

const getSchemaPath = async (req) => {
  const { pathname } = req._parsedUrl;
  const parts = pathname.split('/');
  // v1/anything, 2 parameters is a must
  if (parts.length < 2) {
    return null;
  }

  // match v[x] to find schema
  const found = parts[1].match(/v[0-9]+/);
  if (!found) {
    return null;
  }

  try {
    const schemas = (await import(`../api/${found[0]}/schemas`)).default;
    console.log('schema', `${req.method} ${pathname}`);
    return schemas[`${req.method} ${pathname}`];
  } catch (err) {
    console.log(err);
    return null;
  }
};

const validateRequest = async (req, _res, next) => {
  const schema = await getSchemaPath(req);
  if (!schema) {
    return next();
  }

  const { error, value } = schema.validate(
    { body: req.body, query: req.query },
    options
  );

  if (error) {
    next(new ValidationError(error));
  } else {
    req.body = value.body;
    next();
  }
};

export default validateRequest;
