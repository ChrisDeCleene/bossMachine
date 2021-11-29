const checkMillionDollarIdea = (req, res, next) => {
  const { numWeeks, weeklyRevenue } = req.body;
  if (!numWeeks || !weeklyRevenue) {
    res.status(400).send("Did not provide proper values");
  }
  if (numWeeks * weeklyRevenue >= 1000000) {
    next();
  } else {
    res.status(400).send("Not a million dollar idea");
  }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
