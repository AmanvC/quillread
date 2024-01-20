"use server";

import { RegisterSchema } from "@/lib/schemas";
import * as z from "zod";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if(!validatedFields.success){
    return {error: "Invalid fields!"};
  }
  const { name, email, password } = validatedFields.data;
  const existingUser = await getUserByEmail(email);
  if(existingUser){
    return { error: "Email already in use!" }
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(name, verificationToken.email, verificationToken.token);

  return { success: "A confirmation email has been sent to the registered mail ID." }
}