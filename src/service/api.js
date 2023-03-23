import Providers from "../providers/index.js"
import { get_runtime } from "../util.js"
import { format as lyricFormat, getPathFromURL } from "../util.js"

export default async (ctx) => {

    const p = new Providers()

    const query = ctx.req.query()
    const server = query.server || 'tencent'
    const type = query.type || 'playlist'
    const id = query.id || '7326220405'

    if (!p.get_provider_list().includes(server)) {
        ctx.status(400)
        return ctx.json({ status: 400, message: 'server 参数不合法' })
    }
    if (!p.get(server).support_type.includes(type)) {
        ctx.status(400)
        return ctx.json({ status: 400, message: 'type 参数不合法' })
    }

    let data = await p.get(server).handle(type, id)

    if (type === 'url') {
        let url = data

        if (!url) {
            ctx.status(403)
            return ctx.json({ error: 'no url' })
        }
        if (url.startsWith('@'))
            return ctx.text(url)

        return ctx.redirect(url)
    }

    if (type === 'pic') {
        return ctx.redirect(data)
    }

    if (type === 'lrc') {
        return ctx.text(lyricFormat(data.lyric, data.tlyric || ''))
    }

    const runtime = get_runtime()
    const perfix = ctx.req.header('X-Forwarded-Url')
    let req_url = perfix ? perfix + getPathFromURL(ctx.req.url.split('?')[0]) : ctx.req.url.split('?')[0]
    if (runtime === 'vercel') req_url = req_url.replace('http://', 'https://')

    // json 类型数据填充api
    return ctx.json(data.map(x => {
        for (let i of ['url', 'pic', 'lrc']) {
            const _ = String(x[i])
            // 正常对象_均为id，以下例外不用填充：1.@开头/size为0=>qq音乐jsonp 2.已存在完整链接
            if (!_.startsWith('@') && !_.startsWith('http') && _.length > 0) {
                x[i] = `${req_url}?server=${server}&type=${i}&id=${_}`
            }
        }
        return x
    }))
}
