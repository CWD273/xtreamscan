import { NextResponse } from "next/server";
import { fetchLiveStreams } from "@/lib/xtream";

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

    return NextResponse.json(
      streams,
      {
        headers: {
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
