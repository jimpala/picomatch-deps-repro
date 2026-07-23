# Picomatch dependency optimizer repro

This repo reproduces a Cloudflare dev server failure when Astro and
`@astrojs/internal-helpers` resolve different physical copies of picomatch.

## Steps

Install and run:

```sh
pnpm install
pnpm dev --force # force Vite to rebuild cache
```

Expected result:

```text
require is not defined
  Stack trace:
    at runInRunnerObject (workers/runner-worker/index.js:107:3)
    at null.<anonymous> (workers/runner-worker/index.js:350:37)
```

`pnpm build` works - so the failure is specific to development dependency
optimization.

The targeted pnpm overrides preserve the dependency split:

```text
astro > picomatch
→ picomatch@4.0.4

@astrojs/react > @astrojs/internal-helpers > picomatch
→ picomatch@4.0.5
```

Adding the following Vite configuration makes the development server start fine:

```js
vite: {
  ssr: {
    optimizeDeps: {
      include: ['astro > @astrojs/internal-helpers > picomatch'],
    },
  },
},
```
