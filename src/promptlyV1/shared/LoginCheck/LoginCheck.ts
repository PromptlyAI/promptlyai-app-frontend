export default function LoginCheck() {
  function isJwtExpired(jwt: string) {
    const tokenParts = jwt.split(".");
    if (tokenParts.length !== 3) {
      throw new Error("Invalid JWT format");
    }

    const payloadBase64Url = tokenParts[1];
    const payloadBase64 = payloadBase64Url.replace("-", "+").replace("_", "/");
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);

    const currentTime = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < currentTime) {
      return true; // Token has expired
    }

    return false; // Token has not expired
  }

  let token = localStorage.getItem("token");
  if (!token) {
    return true;
  } else if (isJwtExpired(token)) {
    return true;
  } else {
    return false;
  }
}
