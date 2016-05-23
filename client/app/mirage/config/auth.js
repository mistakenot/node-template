import Mirage from 'ember-cli-mirage';

export default function(config) {

  const formEncodedToJson = (encoded) => {
    var result = {};
    encoded.split("&").forEach(function(part) {
      var item = part.split("=");
      result[item[0]] = decodeURIComponent(item[1]);
    });
    return result;
  };

  config.post('/token', (db, request) => {
    var params = formEncodedToJson(request.requestBody);

    var user = db.users.where({
      email: params.username,
      password: params.password
    })[0];

    if(user) {
      return {
        "access_token": user.id,
        "token_type":"bearer",
        "user": user
      };
    } else {
      return new Mirage.Response(401, {}, { message: 'Auth failure'});
    }
  });

  config.post('/revoke', (db, request) => {
    return {};
  });

}
