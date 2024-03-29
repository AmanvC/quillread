"use server";
// TODO Update return types for all actions
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { db } from "@/lib/db";

export const emailVerification = async(token: string) => {
  const existingToken = await getVerificationTokenByToken(token);
  if(!existingToken){
    return { error: "Invalid link!" }
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if(hasExpired){
    return { error: "Verification token has expired." };
  }

  const existingUser = await getUserByEmail(existingToken.email);
  if(!existingUser){
    return { error: "Email is not registered with us!" }
  }

  await db.user.update({
    where: {
      id: existingUser.id
    },
    data: {
      emailVerified: new Date()
    }
  })

  await db.verificationToken.delete({
    where: { id: existingToken.id }
  });

  return { success: "Email is verified now." }
}