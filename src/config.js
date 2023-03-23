import { get_runtime } from "./util.js"

let OVERSEAS = globalThis?.Deno?.env?.get("OVERSEAS") || globalThis?.process?.env?.OVERSEAS
const YT_API = globalThis?.Deno?.env?.get("YT_API") || globalThis?.process?.env?.YT_API || 'https://yt-ra.2333332.xyz/api'
const runtime = get_runtime()

if (['cloudflare', 'vercel'].includes(runtime)) OVERSEAS = true

const PORT = globalThis?.Deno?.env?.get("PORT") || globalThis?.process?.env?.PORT || 3000

OVERSEAS = Boolean(OVERSEAS)

export default {
    YT_API,
    OVERSEAS,
    PORT
}
