/**
 * An array of routes that are accesible to public.
 * These routes do not require authentication.
 * @type {string[]}
 */
export const publicRoutes = [
  "/",
  "/pricing",
  "/mail/email-verification"
]


/**
 * An array of routes that are used for authentication.
 * These routes will redirect loggedin users to /settings.
 * @type {string[]}
 */
export const authRoutes = [
  "/login",
  "/register",
  "/error",
  "/reset/password",
  "/mail/reset-password"
]


/**
 * The prefix for API authentication routes.
 * Routes that start with this prefix are used for API authentication purposes.
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";


/**
 * The default redirect path after logging in.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";