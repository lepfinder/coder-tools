# 部署指南

本项目的技术栈为 Next.js + Tailwind CSS，非常适合部署在 Vercel 或 Cloudflare Pages 上。以下是针对这两个平台的详细部署建议和步骤。

## 推荐方案：Vercel

**理由**：Vercel 是 Next.js 的开发团队，提供对 Next.js 的原生支持，零配置即可部署，体验最流畅。对于此类工具型网站，Vercel 的免费额度完全足够。

### 部署步骤

1.  **推送到 GitHub/GitLab/Bitbucket**
    *   确保你的代码已经提交并推送到远程仓库。

2.  **登录 Vercel**
    *   访问 [vercel.com](https://vercel.com) 并使用你的 Git 账号登录。

3.  **导入项目**
    *   点击 "Add New..." -> "Project"。
    *   在列表中找到你的 `coder-tools-g` 仓库，点击 "Import"。

4.  **配置构建设置 (通常无需修改)**
    *   **Framework Preset**: Next.js
    *   **Root Directory**: `./`
    *   **Build Command**: `next build` (默认)
    *   **Output Directory**: `.next` (默认)
    *   **Install Command**: `npm install` (默认)

5.  **点击 Deploy**
    *   等待几分钟，构建完成后，Vercel 会分配一个 `.vercel.app` 的域名供你访问。

---

## 备选方案：Cloudflare Pages

**理由**：如果你已经在使用 Cloudflare 的 DNS 服务，或者对全球 CDN 速度有极致要求，Cloudflare Pages 也是很好的选择。它使用 Edge Network，速度非常快。

### 部署步骤

1.  **登录 Cloudflare Dashboard**
    *   访问 [dash.cloudflare.com](https://dash.cloudflare.com)。

2.  **进入 Workers & Pages**
    *   点击左侧菜单的 "Workers & Pages"。
    *   点击 "Create Application" -> "Pages" -> "Connect to Git"。

3.  **选择仓库**
    *   授权 Cloudflare 访问你的 GitHub 账号，并选择 `coder-tools-g` 仓库。

4.  **配置构建设置**
    *   **Project name**: coder-tools-g
    *   **Production branch**: main
    *   **Framework preset**: Next.js (Static HTML Export) 或者 Next.js
        *   *注意*：由于本项目使用了 App Router 和一些动态特性（如 `suppressHydrationWarning`），建议使用 Cloudflare 的 `next-on-pages` 适配器以获得最佳兼容性，或者如果全是纯静态页面，可以使用 Static Export。
    *   **Build command**: `npx @cloudflare/next-on-pages@1` (推荐用于动态功能) 或 `npm run build`
    *   **Build output directory**: `.vercel/output/static` (如果使用 next-on-pages) 或 `out` (如果使用静态导出)

    **推荐配置 (使用 Edge Runtime):**
    1. 在项目中安装适配器: `npm install -D @cloudflare/next-on-pages`
    2. 修改 `package.json` 的 build 命令: `"build": "next-on-pages"`
    3. 在 Cloudflare 设置中，Build command 填 `npm run build`，Output directory 填 `.vercel/output/static`。

5.  **点击 Save and Deploy**

## 总结

*   **省心首选**: **Vercel**。无需任何额外配置，完美支持 Next.js 所有特性。
*   **极客/性能首选**: **Cloudflare Pages**。全球边缘节点响应极快，但可能需要少量配置（`next-on-pages`）来完美支持 SSR。
