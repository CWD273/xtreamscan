"use client";

import { useState } from "react";

export default function Home() {
  const [server, setServer] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [output, setOutput] = useState("");

  async function generateM3U() {
    const res = await fetch("/api/generate-m3u", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        server,
        username,
        password,
      }),
    });

    const text = await res.text();
    setOutput(text);
  }

  return (
    <main>
      <h1>Xtream Playlist Generator</h1>

      <input
        placeholder="Server URL"
        value={server}
        onChange={(e) => setServer(e.target.value)}
      />

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={generateM3U}>
        Generate M3U
      </button>

      <textarea
        value={output}
        readOnly
        rows={20}
      />
    </main>
  );
}
