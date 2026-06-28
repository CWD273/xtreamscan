import { NextResponse } from "next/server";

import { fetchLiveStreams } from "@/lib/xtream";
import { buildM3U } from "@/lib/m3u";

export async function POST(req: Request) {
  try {
    const {
      server,
      username,
      password
    } = await req.json();

    const streams =
      await fetchLiveStreams(
        server,
        username,
        password
      );

    const playlist =
      buildM3U(
        streams,
        server,
        username,
        password
      );

    return new Response(
      playlist,
      {
        headers: {
          "Content-Type":
            "application/x-mpegURL",

          "Cache-Control":
            "no-store"
        }
      }
    );
  } catch {
    return NextResponse.json(
      {
        error: "Failed"
      },
      {
        status: 500
      }
    );
  }
}
