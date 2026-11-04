# Board & Bytes

Company portfolio featuring the LED Driver and LED Carrier, their front/back 3D designs, and actual assembly and testing photos.

## Structure

- `public/` — website source, styles, JavaScript, and published images.
- `scripts/` — asset checks, static build, and optional standalone export.
- `dist/` — generated Cloudflare Pages deployment output (not committed).
- `wrangler.jsonc` — Cloudflare Pages project configuration.

The site needs Node.js 22 or newer for the build. It has no npm dependencies.

## Build

```sh
npm run build
```

This verifies asset references and navigation links, then copies `public/` to `dist/`.
Open `dist/index.html` locally to preview. To regenerate the optional single-file portfolio, run `npm run standalone` (requires Python 3).

Edit files in `public/`; the previous `dashboard/` directory is retained locally as an archive and is not the deployment source.

## Deploy with Cloudflare Pages and GitHub

1. In Cloudflare, create a **Pages** project and connect `messiderata/Board-Bytes`.
2. Select the following build settings:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Framework preset | None |
| Root directory | Repository root (leave blank) |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Environment variable | `NODE_VERSION=22` |

3. Save and deploy. Future pushes to `main` trigger deployment after the Git integration is connected.

Use the **Pages** flow, not a Workers project expecting `wrangler deploy`.

For manual upload, run `npm run build`, then upload the generated `dist` folder to a Pages Direct Upload project. Choose Git integration initially if you want automatic GitHub deployments.

## Connect your Get.tech domain

After the `pages.dev` URL works, open the Pages project's **Custom domains** and add your domain. Follow Cloudflare's DNS instructions. For the root domain, add the domain to Cloudflare and set the assigned Cloudflare nameservers in Get.tech. Preserve existing email DNS records if applicable. Domain registration and renewal remain with Get.tech.

Official guides:
- https://developers.cloudflare.com/pages/framework-guides/deploy-anything/
- https://developers.cloudflare.com/pages/configuration/custom-domains/

The raw KiCad archives and duplicate original photos remain local; the website includes only its published assets in `public/`.
