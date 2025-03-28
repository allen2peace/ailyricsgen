import { MEMBERSHIP_ROLE_VALUE } from "@/lib/constants";
// import prisma from "@/lib/prisma";
import {
  LemonsqueezySubscriptionURLPatch,
  SubScriptionInfo,
} from "@/types/subscribe";
import { UserId } from "@/types/user";
import { client } from "./lemons";

export async function getUserSubscriptionPlan({ userId }: UserId) {
  var user = null;

  if (!user) throw new Error("User not found");
  // if (!user.subscriptionId) return null;

  // const membershipExpire = (user.currentPeriodEnd || 0) * 1000;
  // const subscription = await client.retrieveSubscription({
  //   id: user.subscriptionId,
  // });

  // const attributes = subscription.data.attributes;
  // const urls = attributes.urls as LemonsqueezySubscriptionURLPatch;

  // Check if user is on a pro plan.
  // const isMembership =
  //   user.variantId && membershipExpire > Date.now().valueOf();

  // If user has a pro plan, check cancel status on Stripe.
    // let isCanceled = false;
    // if (isMembership && user.subscriptionId) {
    //   isCanceled = attributes.cancelled;
    // }

  return {
  } as SubScriptionInfo;
}
