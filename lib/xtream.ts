export async function fetchLiveStreams(
  server: string,
  username: string,
  password: string
) {
  const url =
    `${server}/player_api.php` +
    `?username=${encodeURIComponent(username)}` +
    `&password=${encodeURIComponent(password)}` +
    `&action=get_live_streams`;

  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch streams");
  }

  return response.json();
}
