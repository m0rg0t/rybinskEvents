<p align="center">
  <a href="https://www.gatsbyjs.com/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts">
    <img alt="Gatsby" src="https://www.gatsbyjs.com/Gatsby-Monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Gatsby minimal TypeScript starter
</h1>

## 🚀 Quick start

1.  **Create a Gatsby site.**

    Use the Gatsby CLI to create a new site, specifying the minimal TypeScript starter.

    ```shell
    # create a new Gatsby site using the minimal TypeScript starter
    npm init gatsby
    ```

2.  **Start developing.**

    Navigate into your new site’s directory and start it up.

    ```shell
    cd my-gatsby-site/
    npm run develop
    ```

3.  **Open the code and start customizing!**

    Your site is now running at http://localhost:8000!

    Edit `src/pages/index.tsx` to see your site update in real-time!

4.  **Learn more**

    - [Documentation](https://www.gatsbyjs.com/docs/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)

    - [Tutorials](https://www.gatsbyjs.com/tutorial/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)

    - [Guides](https://www.gatsbyjs.com/tutorial/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)

    - [API Reference](https://www.gatsbyjs.com/docs/api-reference/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)

    - [Plugin Library](https://www.gatsbyjs.com/plugins?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)

    - [Cheat Sheet](https://www.gatsbyjs.com/docs/cheat-sheet/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)

## 🚀 Quick start (Gatsby Cloud)

Deploy this starter with one click on [Gatsby Cloud](https://www.gatsbyjs.com/cloud/):

[<img src="https://www.gatsbyjs.com/deploynow.svg" alt="Deploy to Gatsby Cloud">](https://www.gatsbyjs.com/dashboard/deploynow?url=https://github.com/gatsbyjs/gatsby-starter-minimal-ts)


## Maintenance and isolated checks

Use Node.js 24 (Gatsby currently requires Node <26). `npm ci`, `npm test`,
`npm run typecheck` and `npm run build` validate the application.
`npm run build:fixture`, `npx playwright install chromium webkit`, and
`npm run test:browser` run local-only browser checks. PR CI uses read-only
permissions, disables Gatsby telemetry, and collects screenshots.

The framework and plugin family are upgraded together to Gatsby 5, React 19,
date-fns 4 and TypeScript 7. The title uses Gatsby's Head API instead of
react-helmet. The duplicated manifest registration is removed.

Historical event dates, event descriptions and original assets remain unchanged:
this is still the 2022 city-day programme. Current filtering is inclusive of
start/end, future means strictly before start, and editing the date recomputes
immediately. Invalid date/time input does not match timed filters. An end time
earlier than the start explicitly continues into the following day.

### Optional map configuration

No provider request is made by default. The embedded browser key and a commented
copy were removed. A deployment owner may explicitly supply
`GATSBY_YANDEX_MAPS_API_KEY` at build time after reviewing the provider's key and
origin restrictions. Gatsby exposes this value in browser output: never supply
a secret server-side credential. This change does not rotate historical keys
or remove them from Git history; the owner should review existing key validity
and restrictions in the provider account. No key has been created, configured,
validated or sent to the provider as part of this maintenance.

The event list remains available without a map or on provider failure. Script,
timeout and map objects are cleaned up; late load/readiness callbacks after
unmount are ignored. Synthetic tests cover these paths without a live provider.
The HTML in checked-in event descriptions is trusted editorial content, as before.

### Verification scope

Browser tests block every nonlocal request and use synthetic event fixtures for
filtering. The separate production smoke check verifies Gatsby hydration and
retains the historical page title. Map tests use a synthetic API only; live map
rendering is unverified. WebKit is a browser-engine simulation, not native Safari.
Legacy vendored assets are retained without blanket replacement.
