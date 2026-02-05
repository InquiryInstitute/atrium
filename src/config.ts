/**
 * Atrium config. Homeserver is fixed for inquiry.institute.
 * SSO uses Supabase OIDC (Inquiry Institute). Idp path must match Synapse (often "oidc-supabase").
 */
export const HOMESERVER_URL = 'https://matrix.inquiry.institute'
export const SSO_IDP_ID = 'oidc-supabase'
