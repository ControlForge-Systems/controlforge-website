# ControlForge Website

Marketing website for ControlForge Structured Text VS Code extension.

Built with SvelteKit, TypeScript, and Tailwind CSS.

## About ControlForge

ControlForge is a VS Code extension for IEC 61131-3 Structured Text PLC programming. Provides syntax highlighting, IntelliSense, diagnostics, and code completion for industrial automation development.

**Extension Repository:** https://github.com/ControlForge-Systems/controlforge

## Development

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
pnpm preview
```

## Deployment

The site is a static build hosted on **Cloudflare Pages** (project
`controlforge-website`), served at https://controlforge.dev.

```bash
pnpm validate      # optional: pre-deployment checks against ./build
pnpm prod:deploy   # production build + deploy to controlforge.dev
```

Other targets:

- `pnpm deploy:pages` - deploy the existing `build/` output to production
- `pnpm deploy:preview` - deploy to a preview URL instead of production

Deploys use the local `cf` wrapper (`~/.local/bin/cf`), which supplies the
Cloudflare API token and account id to Wrangler.

### Configuration

- `static/_headers` - security headers and cache-control (previously nginx)
- `static/_redirects` - path-level redirects only; domain-level redirects such
  as www -> apex live in the zone's Redirect Rules on the Cloudflare dashboard
- Compression (brotli/gzip) is applied automatically by Cloudflare - there is
  no pre-compression step

## Documentation

- `docs/STYLING_GUIDE.md` - UI/styling patterns and Tailwind v4 usage
- `docs/IEC61131_SPECIFICATION.md` - IEC 61131-3 Structured Text language specification
