const Cumulio = require("cumulio");
const { requireAuth } = require("../.netlify/lib/auth");

export const handler = requireAuth(async (event, context) => {
  let ssoResponse;
  var client = new Cumulio({
    api_key: process.env.CUMUL_KEY,
    api_token: process.env.CUMUL_TOKEN,
    host: "https://api.cumul.io",
  });

  client
    .get("theme", {
      attributes: ["id", "name"],
    })
    .then(function (data) {
      console.log("Success!", JSON.stringify(data));
    });
  try {
    const { claims } = context.identityContext;

    const generateSSOcredentials = async () => {
      return await client.create("authorization", {
        integration_id: "3aaf834e-6f97-4204-81aa-e3215811bef8",
        type: "sso",
        expiry: "24 hours",
        inactivity_interval: "10 minutes",
        username: "exampleUser",
        name: "Example User",
        email: "example@app.com",
        suborganization: "exampleUser",
        role: "viewer",
        theme: {
          id: claims.preferences.theme,
          type: "foo",
          itemsBackground: "#fff",
          colors: ["#fff"],
        },
      });
    };
    console.log("CLAIMS ARE!!!! ,", JSON.stringify(claims.preferences.theme));
    ssoResponse = await generateSSOcredentials();
  } catch (err) {
    console.log(err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Something went wrong, please try again later",
      }),
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify({ token: ssoResponse.token, key: ssoResponse.id }),
  };
});
