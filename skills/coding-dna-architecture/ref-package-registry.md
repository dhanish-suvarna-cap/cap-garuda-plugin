# Package Registry

## Frontend Dependencies (webapp/package.json)

### UI Components & Frameworks

| Package | Version | Purpose |
|---|---|---|
| react | ^18.2.0 | Core UI library |
| react-dom | ^18.2.0 | React DOM renderer |
| antd | 3.23.5 | UI component library (legacy v3) |
| @capillarytech/cap-ui-library | 8.13.2 | Capillary design system components |
| @capillarytech/cap-ui-utils | 3.0.4 | Capillary UI utilities |
| @capillarytech/cap-coupons | 10.0.44 | Coupon management components |
| @capillarytech/cap-audience-manager | 6.0.35 | Audience management components |
| @capillarytech/creatives-library | 8.0.283 | Creative/template editor |
| @capillarytech/vulcan-react-sdk | ^2.2.2 | Capillary platform SDK |
| react-player | ^1.15.2 | Media player component |
| react-intersection-observer | ^9.4.0 | Viewport intersection observer |
| react-window | ^1.8.2 | Virtualized list rendering |
| react-helmet | ^5.2.0 | Document head management |
| react-error-boundary | ^3.1.3 | Error boundary utility |

### State Management

| Package | Version | Purpose |
|---|---|---|
| redux | 4.0.1 | Global state container |
| react-redux | 5.1.0 | React-Redux bindings |
| redux-saga | 0.16.2 | Side effect middleware |
| redux-immutable | ^4.0.0 | Immutable.js Redux combiner |
| reselect | 4.0.0 | Memoized selectors |
| connected-react-router | 4.5.0 | Router-Redux sync |
| redux-auth-wrapper | ^2.0.3 | Auth HOCs for Redux |
| immer | ^8.0.1 | Immutable state helper |
| immutable | ^4.0.0-rc.12 | Immutable data structures |

### Routing

| Package | Version | Purpose |
|---|---|---|
| react-router | ^5.0.0 | Declarative routing |
| react-router-dom | 5.0.0 | DOM routing bindings |
| react-router-redux | ^4.0.8 | Redux-router integration |
| history | 4.7.2 | Session history management |

### Styling

| Package | Version | Purpose |
|---|---|---|
| styled-components | 6.1.2 | CSS-in-JS |
| classnames | ^2.2.6 | Conditional class merging |
| less | 3.9.0 | LESS preprocessor (for antd) |
| less-loader | ^4.1.0 | Webpack LESS loader |
| node-sass | ^4.14.1 | SCSS support (legacy) |
| sass-loader | ^7.1.0 | Webpack SASS loader |
| sanitize.css | 4.1.0 | CSS normalize/reset |

### Data & Utilities

| Package | Version | Purpose |
|---|---|---|
| lodash | 4.17.11 | General utility functions |
| moment | ^2.24.0 | Date/time manipulation |
| moment-timezone | ^0.5.25 | Timezone support |
| uuid | ^8.3.2 | UUID generation |
| pako | 2.1.0 | Zlib compression/decompression |
| ml-matrix | 6.5.0 | Matrix operations |

### Internationalization

| Package | Version | Purpose |
|---|---|---|
| react-intl | 2.7.2 | React i18n components |
| intl | 1.2.5 | Intl polyfill |
| locize | ^3.3.0 | Translation management SaaS |

### Monitoring & Error Tracking

| Package | Version | Purpose |
|---|---|---|
| @bugsnag/js | ^7.2.1 | Error reporting |
| @bugsnag/plugin-react | ^7.2.1 | React error boundary plugin |
| @newrelic/browser-agent | ^1.293.0 | Performance monitoring |
| webpack-bugsnag-plugins | ^1.4.3 | Source map upload to Bugsnag |

### HTTP & Networking

| Package | Version | Purpose |
|---|---|---|
| axios | ^0.18.0 | HTTP client (in deps but NOT the primary client) |
| whatwg-fetch | 3.0.0 | Fetch API polyfill (PRIMARY) |

### Build & Server Utilities

| Package | Version | Purpose |
|---|---|---|
| compression | 1.7.3 | Gzip middleware |
| express | 4.16.4 | Dev server |
| cross-env | 5.2.0 | Cross-platform env vars |
| chalk | ^2.4.2 | Terminal color output |

### Polyfills & Compatibility

| Package | Version | Purpose |
|---|---|---|
| @babel/polyfill | 7.0.0 | Babel polyfills |
| @babel/runtime | ^7.17.2 | Babel runtime helpers |
| regenerator-runtime | ^0.13.9 | Async/await polyfill |
| hoist-non-react-statics | 3.0.1 | HOC static method hoisting |
| prop-types | ^15.6.2 | Runtime type checking |
| invariant | 2.2.4 | Invariant assertions |
| warning | 4.0.2 | Warning assertions |
| fontfaceobserver | 2.0.13 | Font loading detection |

### Misc

| Package | Version | Purpose |
|---|---|---|
| rangy | ^1.3.0 | Text selection library |
| use-deep-compare-effect | ^1.8.1 | Deep comparison useEffect |

---

## Frontend DevDependencies (webapp/package.json)

### Babel Ecosystem

| Package | Version |
|---|---|
| @babel/cli | 7.1.2 |
| @babel/core | ^7.1.2 |
| @babel/node | ^7.16.8 |
| @babel/preset-env | ^7.3.1 |
| @babel/preset-react | 7.0.0 |
| @babel/register | 7.0.0 |
| @babel/plugin-proposal-class-properties | 7.1.0 |
| @babel/plugin-proposal-export-default-from | ^7.2.0 |
| @babel/plugin-syntax-dynamic-import | 7.0.0 |
| @babel/plugin-transform-modules-commonjs | 7.1.0 |
| @babel/plugin-transform-react-constant-elements | 7.0.0 |
| @babel/plugin-transform-react-inline-elements | 7.0.0 |
| @babel/plugin-transform-runtime | ^7.17.0 |
| babel-core | ^7.0.0-bridge.0 |
| babel-eslint | ^10.0.1 |
| babel-loader | ^7.1.5 |
| babel-plugin-dynamic-import-node | 2.2.0 |
| babel-plugin-import | ^1.11.0 |
| babel-plugin-lodash | 3.3.4 |
| babel-plugin-react-intl | 3.0.1 |
| babel-plugin-react-transform | 3.0.0 |
| babel-plugin-require-context-hook | ^1.0.0 |
| babel-plugin-styled-components | 1.8.0 |
| babel-plugin-transform-imports | ^2.0.0 |
| babel-plugin-transform-react-remove-prop-types | 0.4.19 |
| babel-plugin-transform-require-context | ^0.1.1 |

### Webpack Ecosystem

| Package | Version |
|---|---|
| webpack | ^5.91.0 |
| webpack-cli | ^5.1.4 |
| @webpack-cli/serve | ^2.0.5 |
| webpack-dev-middleware | 6.1.1 |
| webpack-hot-middleware | 2.24.3 |
| webpack-pwa-manifest | 3.7.1 |
| webpack-bundle-analyzer | ^3.0.3 |
| @module-federation/utilities | ^3.0.0 |
| esbuild-loader | 2.20.0 |
| thread-loader | ^3.0.4 |
| html-webpack-plugin | 5.3.2 |
| add-asset-html-webpack-plugin | 3.1.1 |
| mini-css-extract-plugin | ^0.9.0 |
| compression-webpack-plugin | 2.0.0 |
| brotli-webpack-plugin | ^1.1.0 |
| circular-dependency-plugin | 5.2.2 |
| speed-measure-webpack-plugin | ^1.5.0 |
| progress-bar-webpack-plugin | ^2.1.0 |

### Loaders

| Package | Version |
|---|---|
| css-loader | 1.0.0 |
| style-loader | 0.23.1 |
| postcss-loader | ^6.2.1 |
| file-loader | 2.0.0 |
| url-loader | 1.1.2 |
| svg-url-loader | 2.3.2 |
| html-loader | 0.5.5 |
| imports-loader | 0.8.0 |
| null-loader | 0.1.1 |
| exports-loader | ^0.7.0 |
| source-map-loader | ^0.2.4 |

### Testing

| Package | Version |
|---|---|
| jest | ^27.5.1 |
| @testing-library/react | ^13.4.0 |
| @testing-library/dom | ^8.20.0 |
| @testing-library/jest-dom | ^5.16.2 |
| @testing-library/user-event | ^13.5.0 |
| enzyme | 3.7.0 |
| enzyme-to-json | 3.3.4 |
| @cfaester/enzyme-adapter-react-18 | ^0.8.0 |
| react-test-renderer | 18.0.0 |
| @redux-saga/testing-utils | ^1.1.3 |
| redux-saga-test-plan | ^3.7.0 |
| redux-mock-store | ^1.5.3 |
| msw | ^0.36.8 |
| jest-styled-components | 6.2.2 |
| jest-date-mock | ^1.0.8 |
| mockdate | ^3.0.5 |
| jest-sonar-reporter | ^2.0.0 |

### Linting & Formatting

| Package | Version |
|---|---|
| eslint | 5.7.0 |
| eslint-config-airbnb | 17.1.0 |
| eslint-config-airbnb-base | 13.1.0 |
| eslint-config-prettier | 3.1.0 |
| eslint-import-resolver-webpack | 0.10.1 |
| eslint-plugin-import | 2.14.0 |
| eslint-plugin-jsx-a11y | 6.1.2 |
| eslint-plugin-prettier | 3.0.0 |
| eslint-plugin-react | 7.11.1 |
| eslint-plugin-react-hooks | ^4.2.0 |
| eslint-plugin-redux-saga | 0.9.0 |
| prettier | 1.14.3 |
| stylelint | ^9.10.1 |
| stylelint-config-recommended | 2.1.0 |
| stylelint-config-styled-components | 0.1.1 |
| stylelint-processor-styled-components | 1.5.0 |
| @adobe/css-tools | 4.2.0 |

### Code Quality

| Package | Version |
|---|---|
| husky | ^8.0.1 |
| lint-staged | 7.3.0 |
| coveralls | 3.0.2 |
| sonarqube-scanner | ^2.7.0 |
| @size-limit/file | ^4.5.4 |
| @size-limit/webpack | ^4.5.4 |
| size-limit | ^4.5.4 |
| lighthouse | ^6.1.1 |

### Scaffolding

| Package | Version |
|---|---|
| plop | 2.1.0 |
| node-plop | 0.16.0 |
| shelljs | ^0.8.2 |

---

## BANNED Packages (DO NOT ADD)

These are common alternatives to what this codebase already uses. Adding them would create inconsistency.

| Banned Package | Reason | Use Instead |
|---|---|---|
| **TypeScript (in JS repos)** | Most repos are JavaScript with PropTypes | PropTypes + JSDoc. If the repo already uses TS or the user requests it, use TypeScript. |
| **@tanstack/react-query** | Not used; state fetched via Redux-Saga | Redux-Saga + `request()` |
| **SWR** | Not used | Redux-Saga |
| **RTK (Redux Toolkit)** | Uses vanilla Redux + Immutable.js | redux + immutable |
| **zustand** | Not used | Redux |
| **jotai / recoil** | Not used | Redux + Context |
| **tailwindcss** | Uses styled-components | styled-components + cap-ui-library tokens |
| **emotion** | Uses styled-components | styled-components |
| **CSS Modules** | Uses styled-components | styled-components |
| **date-fns / dayjs** | Uses Moment.js | moment / moment-timezone |
| **formik / react-hook-form** | Forms are manual (useState + antd Form) | useState + antd Form |
| **next.js** | Uses custom Webpack + Express dev server | webpack 5 |
| **vite** | Uses Webpack 5 | webpack 5 |
| **framer-motion** | No animation library used | CSS transitions |
| **react-query** | Not used | Redux-Saga |
| **MUI / Chakra** | Uses Ant Design 3 + cap-ui-library | antd + cap-ui-library |
| **clsx** | Uses classnames | classnames |
| **twMerge** | No Tailwind | classnames |
| **axios (for frontend)** | Listed as dep but fetch is used | Native fetch via `request()` |
