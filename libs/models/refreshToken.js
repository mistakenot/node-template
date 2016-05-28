var RefreshTokenModel;

module.exports = (mongoose) => {
  if(!RefreshToken) {
    var RefreshTokenSchema = new mongoose.Schema({
        userId: {
            type: String,
            required: true
        },
        clientId: {
            type: String,
            required: true
        },
        token: {
            type: String,
            unique: true,
            required: true
        },
        created: {
            type: Date,
            default: Date.now
        }
    });

    RefreshTokenModel = mongoose.model('RefreshToken', RefreshTokenSchema);
  }

  return RefreshTokenModel;
}
