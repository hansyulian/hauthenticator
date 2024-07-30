import { isDuplicatedAuthenticator } from "@utils/isDuplicatedAuthenticator";

export function extractDuplicatedEntries(authenticators: AuthenticatorExtended[]) {
  const groups: AuthenticatorExtended[][] = [];
  for (const authenticator of authenticators) {
    if (authenticator.status !== "ACTIVE") {
      continue;
    }
    let isDuplicated = false;
    for (let i = 0; i < groups.length && !isDuplicated; i += 1) {
      const group = groups[i];
      for (let j = 0; j < group.length && !isDuplicated; j += 1) {
        const groupMember = group[j];
        isDuplicated = isDuplicatedAuthenticator(groupMember, authenticator);
        if (isDuplicated) {
          group.push(authenticator);
        }
      }
    }
    if (!isDuplicated) {
      groups.push([authenticator]);
    }
  }
  return groups.filter((group) => group.length > 1);
}
