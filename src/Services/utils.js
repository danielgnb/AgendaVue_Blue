export function decodeToken(token) {
  if (!token) return null;
  
  const tokenParts = token.split(".");
  if (tokenParts.length !== 3) {
    console.error("Token JWT inválido");
    return null;
  }

  let base64 = tokenParts[1].replace(/-/g, "+").replace(/_/g, "/");

  const padding =
    base64.length % 4 === 0 ? "" : "=".repeat(4 - (base64.length % 4));
  base64 += padding;

  const payload = atob(base64);
  return JSON.parse(payload);
}