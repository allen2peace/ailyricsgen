/**
 * Retrieve the user's role and membership expiration date from the database.
 */
import { MEMBERSHIP_ROLE_VALUE } from "@/lib/constants";
// import prisma from "@/lib/prisma";
import { SubScriptionInfo } from "@/types/subscribe";
import { PrismaUser } from "@/types/user";

export async function getUserSubscriptionStatus({ userId, defaultUser }: { userId: string; defaultUser?: PrismaUser }) {
  let user = null
  if (defaultUser) {
    user = defaultUser
  } else {
  //   user = await prisma.user.findUnique({
  //     where: { userId },
  //     select: {
  //       subscriptionId: true,
  //       currentPeriodEnd: true,
  //       customerId: true,
  //       variantId: true,
  //     },
  //   });
  }

  // if (!user) throw new Error("User not found");

  const membershipExpire = 1233445567678
  const isMembership = true

  return {
    subscriptionId: "",
    membershipExpire: isMembership ? membershipExpire : 0,
    customerId: "",
    variantId: 0,
    role: isMembership ? MEMBERSHIP_ROLE_VALUE : 0, // 2 : 0
  } as SubScriptionInfo;
}