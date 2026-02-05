# Deploy and verify

## 1. After pushing: verify SSO

1. **GitHub Pages**: Wait for the [Deploy to GitHub Pages](https://github.com/InquiryInstitute/atrium/actions) workflow to complete after a push to `main`.
2. **Hard-refresh** the app: https://inquiryinstitute.github.io/atrium/
3. Click **Sign in with Inquiry Institute** and complete the SSO flow (redirect to Supabase → sign in → back to Atrium).

## 2. Matrix (Synapse) on Fly

To pick up config changes (e.g. `idp_id: oidc-supabase`), redeploy:

```bash
cd path/to/Inquiry.Institute/fly/matrix
fly deploy -a inquiry-matrix
```

## 3. Chat UI

Once logged in, you see the **room list** and can select a room to view **messages**. Audio toggle remains in the sidebar. Spaces-aware filtering can be added next.
