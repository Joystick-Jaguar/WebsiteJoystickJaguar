export async function fetchShader(url) {
  const response = await fetch(url);
  const shaderSource = await response.text();
  return shaderSource;
}
