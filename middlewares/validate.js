

const parseDateMiddleware = (req, res, next) => {
  if (req.body.date) {
    const [year, month, day] = req.body.date.split('-');
    req.body.date = new Date(Date.UTC(year, month - 1, day));
  }
  next();
};

export const mdValidate = {
    parseDateMiddleware
}