export function buildM3U(
  streams: any[],
  server: string,
  username: string,
  password: string
) {
  let output = "#EXTM3U\n";

  for (const stream of streams) {
    output +=
      `#EXTINF:-1 tvg-id="${stream.epg_channel_id || ""}" ` +
      `tvg-logo="${stream.stream_icon || ""}",` +
      `${stream.name}\n`;

    output +=
      `${server}/live/${username}/${password}/${stream.stream_id}.ts\n`;
  }

  return output;
}
