const BASE_URL = "https://eclipse-api.meeplehq.com";

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
  if (!response.ok) throw new Error("Failed to start session");
  return response.json();
};

//TILES
export const drawTiles = async (code) => {
  const response = await fetch(`${BASE_URL}/sessions/${code}/draw`, {
    method: "POST",
  });
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