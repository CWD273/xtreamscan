import { NextResponse } from "next/server";

export async function POST(req:Request){

    try{

        const{
            server,
            username,
            password
        }=await req.json();

        const url=
            `${server}/player_api.php`+
            `?username=${encodeURIComponent(username)}`+
            `&password=${encodeURIComponent(password)}`+
            `&action=get_live_streams`;

        const response=await fetch(url,{

            cache:"no-store"

        });

        if(!response.ok){

            return NextResponse.json({

                error:"Xtream request failed."

            },{
                status:500
            });

        }

        const json=await response.json();

        return new Response(

            JSON.stringify(json,null,2),

            {

                headers:{

                    "Content-Type":"application/json",

                    "Cache-Control":"no-store"

                }

            }

        );

    }

    catch{

        return NextResponse.json({

            error:"Server error"

        },{
            status:500
        });

    }

}
