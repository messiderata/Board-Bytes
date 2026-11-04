# Board & Bytes

Company portfolio featuring LED Driver and LED Carrier designs, front/back 3D renders, and actual assembly and testing photos.

## Structure

- `public/` — editable website, styles, JavaScript, and published images.
- `scripts/` — asset checks, build, and optional standalone export.
- `dist/` — generated deployment output, ignored by Git.
- `wrangler.jsonc` — Cloudflare Workers Static Assets configuration.

Requires Node.js 22 or newer. There are no npm dependencies for building the website.

## Local build

```sh
npm run build
```

The build validates image references and navigation links, then copies `public/` to `dist/`. Open `dist/index.html` to preview. Run `npm run standalone` to regenerate `Board-and-Bytes.html` (requires Python 3).

Edit `public/`; the old `dashboard/` directory is a local archive, not the deployment source.

## Deploy using the existing Cloudflare Workers project

Connect the GitHub repository `messiderata/Board-Bytes` and use:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Root directory | Repository root |
| Build command | Leave blank; Wrangler invokes the configured build |
| Deploy command | `npx wrangler deploy` |
| Node version | 22 or newer |

The Wrangler `build.command` runs `npm run build` before deployment, so `dist/` exists even when the dashboard has no separate build command. `assets.directory` tells Workers to serve that directory. A Worker JavaScript entry point is not required for this static website.

The configured Worker name is `board-and-bytes`; it must match the project name selected in Cloudflare. If you created a different name, update `name` in `wrangler.jsonc` to match it before deploying.

The previous `pages_build_output_dir` configuration was for Pages and is no longer used. This repository now supports the existing **Workers** deployment command shown in the build logs.

For a local authenticated deployment:

```sh
npx wrangler deploy
```

## Domain

After the generated Workers URL works, add your domain under the Worker's Settings → Domains & Routes → Add → Custom Domain. Add your domain to Cloudflare DNS first, using Cloudflare's assigned nameservers at Get.tech. Preserve existing email DNS records if applicable. Registration and renewal remain with Get.tech.

Official guides:
- https://developers.cloudflare.com/workers/static-assets/get-started/
- https://developers.cloudflare.com/workers/configuration/routing/custom-domains/

Raw KiCad archives and duplicate source photos remain local. Only published assets in `public/` are deployed.
