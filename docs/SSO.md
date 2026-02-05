# SSO login (Inquiry Institute)

Atrium uses **SSO only**: no password field. Sign-in goes through the Inquiry Institute identity provider (Supabase OIDC) via Matrix Synapse.

## Flow

1. User clicks **Sign in with Inquiry Institute** in Atrium.
2. Browser is redirected to `https://matrix.inquiry.institute/_matrix/client/v3/login/sso/redirect/oidc-supabase?redirectUrl=<atrium-url>`.
3. Synapse redirects to Supabase (Inquiry Institute login).
4. User signs in at the IdP.
5. Supabase redirects back to Synapse; Synapse redirects to Atrium’s `redirectUrl` with `loginToken` in the URL (query or fragment).
6. Atrium exchanges `loginToken` for an access token and stores the session.

## Configuration

- **Homeserver**: `https://matrix.inquiry.institute` (see `src/config.ts`).
- **IdP id on Synapse**: `oidc-supabase` (path segment in SSO redirect URL; must match Synapse’s `idp_id`).
- **Redirect URL**: The origin + path where Atrium is served (e.g. `https://inquiryinstitute.github.io/atrium/`). No need to register this in Supabase; only the Matrix callback URL is registered there.

## Synapse

- Password login is disabled; only OIDC (Supabase) is used for human users.
- Faculty bots use the Application Service (AS), not SSO.
