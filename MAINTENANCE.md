# Maintenance verification (2026-10-03)

## Dependency migration

Gatsby 5.16.1 and its matching current plugin family, React/React DOM 19.3.0,
date-fns 4.4.0, TypeScript 7.0.2 and Playwright 1.63.0 are pinned in the lockfile.
The old react-helmet integration is replaced by Gatsby Head, and the duplicate
manifest plugin is removed. Node 24 is used because Gatsby requires Node <26.

Gatsby advertises React 19 support, but some of its nested reach-router and
experimental server-component peers still declare React 18/experimental ranges.
Normal npm installation reports those upstream warnings. No force or
legacy-peer-deps is used. Production build and isolated browser hydration tests
are the compatibility checks for the actual application paths.

## Security limitations

The first current-dependency audit reported 70 affected packages (49 high,
13 moderate, 8 low). Tested overrides update lodash, webpack, legacy
path-to-regexp 0.1.x, immutable 3.x, tmp, serialize-javascript, sharp, and cookie.
The final audit reports 43 affected packages (38 high, 5 moderate, 0 critical).
These counts include dependent packages inheriting the same advisory; they are
not 43 independent root vulnerabilities. This PR does not claim a clean audit.

Remaining root advisories are recorded with exact installed paths, versions and
advisory URLs in `dependency-advisories.json`:

- braces 3.0.3 (`node_modules/braces`), GHSA-vfj7-8cjw-p6xm: latest npm
  release is still affected. Used by micromatch/chokidar/globby in file discovery
  and watch/build pipelines, reached from Gatsby and Parcel. No patched release
  was available at the check time.
- http-cache-semantics 4.2.0 (`node_modules/http-cache-semantics`),
  GHSA-ch52-4w7c-c8xp: latest npm release remains affected. Reached through
  cacheable-request/got in Gatsby build tooling and remote-file helpers. Remote
  request/cache behavior is not exercised against live services in this PR.
- file-type 16.5.4 (`node_modules/file-type`), GHSA-5v7r-6r5c-r473:
  Gatsby's `gatsby-core-utils/dist/fetch-remote-file.js` calls `.fromFile`, and
  `gatsby-source-filesystem/create-file-node-from-buffer.js` calls `.fromBuffer`.
  An isolated official file-type 22.1.1 candidate probe reproduced both methods
  missing and `file.fromBuffer is not a function`. It exports the renamed
  `fileTypeFromBuffer` API instead. A blind override is incompatible; updating
  these upstream call sites requires a separately maintained adaptation.

Further tested overrides include uuid 14.0.2 (synthetic Gatsby node identifiers
are unchanged), webpack-dev-middleware 8.3.0 (actual Gatsby development build
and localhost GET / succeeded), Parcel reporter 2.16.4, and query-string 9.5.1
(the Gatsby dev-404 parse/stringify contract is covered by a regression test).
The old decoder's CJS function contract failed with a direct 0.5.0 override;
upgrading its query-string caller removed that finding instead.

An opt-in `BUNDLE_AUDIT=1` compiler hook records the actual build-javascript
module resources in `.cache/browser-modules.json`. The final local compilation
contained 404 resource paths, and none matched the three remaining root packages.
This is evidence about this generated browser build, not proof that all
production/runtime use is safe: the dependencies still execute in build/dev
or remote-file processing paths, and vendored assets are outside this npm audit.
CI includes the module report for exact-head comparison. Source maps were also
inspected, but module enumeration is the stronger provenance check.

The audit's proposed framework downgrades and incompatible API substitutions
were not applied. Eliminating every inherited finding would need upstream fixes
or a separately scoped framework/toolchain replacement.

Only trusted checked-in assets are processed here. Do not expose development
servers to untrusted networks or feed untrusted content to Gatsby's build/image
pipeline. The static site's old vendored assets were preserved, not comprehensively
security-audited or replaced.

## Test scope

Twelve Node tests cover event time boundaries, date changes, invalid values,
midnight, map script failure, timeout, delayed readiness and idempotent cleanup.
Two scenarios run in Chromium and WebKit: synthetic event filtering and the
production Gatsby page. All nonlocal browser requests are blocked. No real map
key, location permission, provider validation or external account is used.
WebKit testing is not native Safari validation. Read-only PR CI stores screenshots.

The programme remains the historical 2022 event. Existing event data and assets
are unchanged. Maps now need explicit optional build-time browser-key
configuration, documented in README; the event list works without it.
