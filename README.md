# # Meting API
**Modified by [@HiPeach](https://github.com/HiPeach)**  
**Forked from [imsyy/Meting-API](https://github.com/imsyy/Meting-API)**

## ## 前言
本项目**成分极其复杂**，嵌套了四级Fork  
**感谢 @imsyy @xizeyoupan @metowolf 以及 @HiPeach 为本项目做出的努力**  
**我仅对本项目Docker私有化部署做适配、修改，其他部署方式请参考源仓库**

## ## Q&A
**`Q1`** 为什么要Fork这个项目？  
**`A1`** 为了方便 [imsyy/home](https://github.com/imsyy/home) 项目中音乐API的部署与维护  
**`Q2`** 对项目做了什么修改？  
**`A2`** 将请求https化，使其不再因为不安全的请求而报错；修改README使其更易理解

## ## 进度
|               | 参数名称/server | 单曲/song | 歌单/playlist |
| ------------- | -------------- | --------- | ------------- |
| 网易云        | netease        | ✓         | ✓             |
| QQ音乐        | tencent        | ✓         | ✓             |
| Youtube Music | ytmusic        | ✓         | ✓             |

## ## 地区限制

### ### 部署在国外

| 客户端/浏览器访问地区 | 国内 | 国外 |
| --------------------- | ---- | ---- |
| 网易云                | ✓    | ✓    |
| QQ音乐                | ✓¹   | ✕    |
| Youtube Music         | ✓²   | ✓    |

### ### 部署在国内

| 客户端/浏览器访问地区 | 国内 | 国外 |
| --------------------- | ---- | ---- |
| 网易云                | ✓    | ✓    |
| QQ音乐                | ✓    | ✕    |
| Youtube Music         | ✓²   | ✓    |

¹ 使用`jsonp`时，**需要替换前端插件**

`https://cdn.jsdelivr.net/npm/meting@2.0.1/dist/Meting.min.js` => `https://cdn.jsdelivr.net/npm/@xizeyoupan/meting@latest/dist/Meting.min.js`

`https://unpkg.com/meting@2.0.1/dist/Meting.min.js` => `https://unpkg.com/@xizeyoupan/meting@latest/dist/Meting.min.js`

更多信息见 https://github.com/xizeyoupan/MetingJS

² 见下方参数配置

## ## 参数配置
**请按需配置以下环境变量**
- `YT_API`
  Youtube Music API地址  
  Youtube Music的可用性取决于YT_API的连通性，已经内置了一个  
  如果你需要自己部署，请查看[此仓库](https://github.com/xizeyoupan/ytmusic-api-server)  
  注：Youtube Music API必须部署在国外！
- `OVERSEAS`
  用于判断是否部署于国外  
  设为1会启用QQ音乐的jsonp返回，同时需替换[前端插件](https://github.com/xizeyoupan/MetingJS)，能实现国内访问国外API服务解析QQ音乐  
  部署在国内不用设置这个选项，当部署到Vercel上时，此选项自动设为1
- `PORT`
  api监听端口，也是Docker需要映射的端口，默认3000
- `UID`
  用于Docker，默认1010
- `GID`
  用于Docker，默认1010

## ## 部署到Docker
运行下面的命令拉取镜像
```
docker pull intemd/meting-api:latest
```
然后启动 Meting-API 服务 `[环境变量]`请参考上文配置
```
docker run -d --name meting-api -p 3000:3000 hipeach/meting-api:latest [-e YT_API=https://example.com] [-e OVERSEAS=1]
```
**部署成功后访问`/test`测试，`/api`为API地址**  
**:D | 祝你顺利**

## ## 相关项目
- https://github.com/Binaryify/NeteaseCloudMusicApi
- https://github.com/camsong/fetch-jsonp
- https://github.com/honojs/hono
- https://github.com/honojs/node-server
- https://github.com/imsyy/Meting-API
- https://github.com/jsososo/QQMusicApi
- https://github.com/metowolf/Meting-API
- https://github.com/metowolf/MetingJS
- https://github.com/xizeyoupan/Meting-API
