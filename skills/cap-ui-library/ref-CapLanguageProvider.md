# CapLanguageProvider

**Import**: `import CapLanguageProvider from '@capillarytech/cap-ui-library/CapLanguageProvider';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapLanguageProvider/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Wrapping the app for i18n support
```jsx
import CapLanguageProvider from '@capillarytech/cap-ui-library/CapLanguageProvider';

const App = ({ locale, messages }) => (
  <CapLanguageProvider locale={locale} messages={messages}>
    <Router>
      <AppRoutes />
    </Router>
  </CapLanguageProvider>
);
```

### With Redux-connected locale state
```jsx
import CapLanguageProvider from '@capillarytech/cap-ui-library/CapLanguageProvider';
import { translationMessages } from './i18n';

// In the root render:
<Provider store={store}>
  <CapLanguageProvider locale={currentLocale} messages={translationMessages}>
    <App />
  </CapLanguageProvider>
</Provider>
```

### With initial reducer setup
```jsx
import CapLanguageProvider from '@capillarytech/cap-ui-library/CapLanguageProvider';

// CapLanguageProvider's reducer is included in the initial root reducer:
// initialReducer.js
export const initialReducer = {
  language: CapLanguageProviderReducer,
  // ...other reducers
};
```
