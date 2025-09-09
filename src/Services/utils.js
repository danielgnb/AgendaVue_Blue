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

export function validateContact(contact) {
  if (!/\S+@\S+\.\S+/.test(contact.email)) {
    return [false, "Por favor, insira um email válido."];
  }

  if (!/^\(\d{2}\) \d{5}-\d{4}$/.test(contact.telefone)) {
    return [false, "Por favor, insira um telefone válido no formato (XX) XXXXX-XXXX."];
  }

  return [true, ""];
}

export function validateRegister(password) {
  if (password.length < 6) {
    return [false, "A senha deve ter pelo menos 6 caracteres."];
  }

  return [true, ""];
}

export function encryptParameter(param) {
  return btoa(encodeURIComponent(param));
}

export function decryptParameter(param) {
  return decodeURIComponent(atob(param));
}