import { Authority } from "./types";

export const VILLIFE_AUTHORITY: Authority = {
    RENTER: 1,
    OWNER: 2,
    ADMIN: 3,
    SITE_ADMIN: 777,
} as const;
