// routes/_middleware.ts
import {
    encode
} from "https://deno.land/std@0.152.0/encoding/base64.ts";
import { MiddlewareHandlerContext } from "$fresh/server.ts";

const USER_NAME = Deno.env.get("USER_NAME");
const PASS_WORD = Deno.env.get("PASS_WORD");

export async function handler(
    req: Request,
    ctx: MiddlewareHandlerContext,

) {
    let resp;

    if (req.headers.get("Authorization") == `Basic ${encode(`${USER_NAME}:${PASS_WORD}`)}`) {
        resp = await ctx.next();
    } else {
        resp = new Response(``, {
            "headers": {
                "WWW-Authenticate":`Basic charset="UTF-8"`
            },
            "status":401
        });
    }
    return resp;
}