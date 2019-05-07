const joi = require("joi");

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Subscription = sequelize.define('Subscription', {
    planId: DataTypes.INTEGER,
    coupons: DataTypes.STRING,
    cardNumber: DataTypes.STRING,
    holderName: DataTypes.STRING,
    expirationDate: DataTypes.STRING,
    cvv: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Subscription.associate = function(models) {
    // associations can be defined here
  };
  return Subscription;
};

module.exports.SubscriptionValidationSchema = joi.object().keys({
  planId: joi.number().positive().required(),
  coupons : joi.string().min(0).max(100).optional().allow(null),
  cardNumber : joi.string().creditCard().required(),
  holderName : joi.string().alphanum().required(),
  expirationDate : joi.string().required(),
  cvv : joi.string().min(3).max(3).required()
});
