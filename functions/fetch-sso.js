const Cumulio = require("cumulio");
const { requireAuth } = require("../.netlify/lib/auth");

export const handler = requireAuth(async (event, context) => {
  let ssoResponse;
  var client = new Cumulio({
    api_key: process.env.CUMUL_KEY,
    api_token: process.env.CUMUL_TOKEN,
    host: "https://api.cumul.io",
  });

  try {
    const { claims } = context.identityContext;
    console.log(" MY CLAIS ", claims);
    const generateSSOcredentials = async () => {
      return await client.create("authorization", {
        integration_id: "da65ca62-fd24-4a54-8a00-6434dea90d7b",
        type: "sso",
        expiry: "24 hours",
        inactivity_interval: "10 minutes",
        username: "exampleUser",
        name: "Example User",
        email: "example@app.com",
        suborganization: claims.brand,
        role: "viewer",
        metadata: {
          brand: [claims.brand],
        },
        theme: {
          id: claims.theme,
          type: "foo",
          itemsBackground: "#fff",
          colors: ["#fff"],
        },
      });
    };
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
