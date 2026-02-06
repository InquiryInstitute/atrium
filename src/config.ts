/**
 * Atrium config. Homeserver is fixed for inquiry.institute.
 * SSO uses Supabase OIDC (Inquiry Institute).
 * The idp_id in Synapse config is "supabase", but Synapse exposes it as "oidc-supabase"
 * in the login flows response (prepends "oidc-" for OIDC providers). The SSO redirect
 * URL must use the external-facing id: oidc-supabase.
 */
export const HOMESERVER_URL = 'https://matrix.inquiry.institute'
export const SSO_IDP_ID = 'oidc-supabase'
