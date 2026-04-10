# CapLogin

**Import**: `import CapLogin from '@capillarytech/cap-ui-library/CapLogin';`

## Description

Cap UI Library component. See source code at `cap-ui-library/components/CapLogin/` for full details.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS class |
| style | object | - | Inline styles |

> **Note**: This is a stub spec. Run the spec generator against the source code to populate full props.

## Usage Examples

### Basic login page
```jsx
import CapLogin from '@capillarytech/cap-ui-library/CapLogin';

<CapLogin
  onLogin={(credentials) => dispatch(loginRequest(credentials))}
  loading={loginStatus === REQUEST}
/>
```

### With custom branding and SSO
```jsx
import CapLogin from '@capillarytech/cap-ui-library/CapLogin';

<CapLogin
  onLogin={handleLogin}
  loading={isLoggingIn}
  logoUrl="/assets/company-logo.png"
  title="Capillary Loyalty Platform"
  enableSSO
  ssoProviders={['google', 'okta']}
  onSSOLogin={(provider) => dispatch(ssoLoginRequest(provider))}
/>
```
