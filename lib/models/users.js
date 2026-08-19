// Data-access layer for users. Dummy, single source of truth for user reads.
// Components and API routes go through these functions, never the store.

import { demoUser } from "@/constants";

const users = {
  [demoUser.id]: demoUser,
};

export function getUser(id) {
  return users[id] || null;
}

export function getCurrentUser() {
  return demoUser;
}
