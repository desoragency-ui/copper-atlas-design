/**
 * The owner's /setup page password, stored only as a salted SHA-256 hash.
 *
 * The password itself is never in the code or the repository - it was
 * generated once (24 random characters, about 139 bits) and handed to the
 * owner in a private file. At that strength a plain salted hash cannot be
 * brute-forced even though this repository is public, and a cheap hash keeps
 * the check fast enough for Cloudflare Workers' CPU limit if the site moves.
 *
 * To change it: generate a new password, compute
 *   sha256(`${SALT}:${password}`) as hex
 * and replace both values below. A SETUP_PASSWORD environment variable on the
 * host is also accepted, so the owner can override it without a code change.
 */
export const OWNER_SALT = 'b36aa990b7cdc2d23677d5a8fb60f38d';
export const OWNER_HASH = '3da8062a53860975f951794e63b171b67c43b2b208881d1c5542a9ccd6cab92d';
