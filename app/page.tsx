"use client";

import { useState } from "react";

export default function Home() {

    const [server,setServer]=useState("");
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [json,setJson]=useState("");

    async function fetchStreams(){

        const res=await fetch("/api/streams",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                server,
                username,
                password
            })

        });

        const text=await res.text();

        setJson(text);

    }

    function download(){

        const blob=new Blob([json],{
            type:"application/json"
        });

        const a=document.createElement("a");

        a.href=URL.createObjectURL(blob);

        a.download="streams.json";

        a.click();

    }

    return(

        <main>

            <h1>Xtream JSON Downloader</h1>

            <input
                placeholder="Server URL"
                value={server}
                onChange={e=>setServer(e.target.value)}
            />

            <input
                placeholder="Username"
                value={username}
                onChange={e=>setUsername(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e=>setPassword(e.target.value)}
            />

            <button onClick={fetchStreams}>
                Fetch Streams
            </button>

            <button
                onClick={download}
                style={{marginLeft:20}}
            >
                Download JSON
            </button>

            <pre>{json}</pre>

        </main>

    );

}
