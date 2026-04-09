const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? "https://eclipse-api.meeplehq.com";
console.log("API BASE_URL:", BASE_URL);

// SESSIONS
export const createSession = async (playerCount) => {
  const response = await fetch(`${BASE_URL}/sessions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ playerCount }),
  });
  if (!response.ok) throw new Error("Failed to create session");
  return response.json();
};

export const getSession = async (code) => {
  const response = await fetch(`${BASE_URL}/sessions/${code}`);
  if (!response.ok) throw new Error("Failed to get session");
  return response.json();
};

export const startSession = async (code, playerCount) => {
  const response = await fetch(`${BASE_URL}/sessions/${code}/start`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ playerCount }),
  });
  console.log("start response status:", response.status);
  const body = await response.text();
  console.log("start response body:", body);
  if (response.status === 409 || response.ok) {
    return response.status === 409 ? null : JSON.parse(body);
  }
  throw new Error("Failed to start session");
};

//TILES
export const drawTiles = async (code) => {
  console.log("calling draw for code:", code);
  const response = await fetch(`${BASE_URL}/sessions/${code}/draw`, {
    method: "POST",
  });
  console.log("draw response status:", response.status);
  if (!response.ok) throw new Error("Failed to draw tiles");
  return response.json();
};

export const purchaseTile = async (code, poolId) => {
  const response = await fetch(`${BASE_URL}/sessions/${code}/tiles/${poolId}/purchase`, {
    method: "PATCH",
  });
  if (!response.ok) throw new Error("Failed to purchase tile");
  return response.json();
};

//BOARD
export const getBoard = async (code) => {
  const response = await fetch(`${BASE_URL}/sessions/${code}/board`);
  if (!response.ok) throw new Error("Failed to get board");
  return response.json();
};