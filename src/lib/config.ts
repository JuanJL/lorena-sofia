/**
 * Site feature flags.
 *
 * SHOW_AFTERPARTY — controls the "Tiempo Extra / Extra Time" afterparty
 * section (Colombia vs Portugal @ Napols) on the homepage AND the afterparty
 * nudge shown in the RSVP success view.
 *
 * Turned OFF while the Napols venue is still unconfirmed. To bring it back,
 * flip this to `true` and push to main (auto-deploys). Everything else —
 * the AfterpartySection component, the /api/afterparty route, the KV/file
 * store, and the admin dashboard — stays in place and ready, so re-enabling
 * is a one-line change.
 */
export const SHOW_AFTERPARTY = false;
