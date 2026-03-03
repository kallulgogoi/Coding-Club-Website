const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  subscription: {
    type: Object,
    required: true,
  },
});

module.exports = mongoose.model("PushSubscription", subscriptionSchema);
