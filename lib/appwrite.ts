import { Account, Client, Databases, ID } from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  platform: "com.jpy.pharmafetch",
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
};

export const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint!)
  .setProject(appwriteConfig.projectId!)
  .setPlatform(appwriteConfig.platform!);

export const account = new Account(client);
export const databases = new Databases(client);

export const createUser = async ({
  email,
  password,
  firstName,
  lastName,
  dateOfBirth,
}: CreateUserParams) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      firstName,
    );

    if (!newAccount) throw Error;

    await signIn({ email, password });

    return await databases.createDocument(
      appwriteConfig.databaseId!,
      "users",
      ID.unique(),
      {
        email,
        password,
        accountId: newAccount.$id,
        firstName,
        lastName,
        dateOfBirth,
      },
    );
  } catch (error) {
    throw new Error("Failed to create user", error as any);
  }
};

export const signIn = async ({ email, password }: SignInParams) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
  } catch (e) {
    throw new Error("Failed to sign in", e as any);
  }
};
