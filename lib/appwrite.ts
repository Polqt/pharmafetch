import { Account, Client, Databases, ID, Query } from "react-native-appwrite";
import Constants from "expo-constants";

export const appConfig = {
  appwrite: {
    endpoint: Constants.expoConfig?.extra?.appwriteEndpoint,
    projectId: Constants.expoConfig?.extra?.appwriteProjectId,
    databaseId: Constants.expoConfig?.extra?.appwriteDatabaseId,
  },
};

export const client = new Client();

client
  .setEndpoint(appConfig.appwrite.endpoint!)
  .setProject(appConfig.appwrite.projectId!);

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
      `${firstName} ${lastName}`,
    );

    if (!newAccount) throw new Error("Account creation failed");

    await signIn({ email, password });

    return await databases.createDocument(
      appConfig.appwrite.databaseId!,
      "users",
      ID.unique(),
      {
        email,
        accountId: newAccount.$id,
        firstName,
        lastName,
        dateOfBirth,
      },
    );
  } catch (e) {
    console.error(e);
    throw new Error("Failed to create user");
  }
};

export const signIn = async ({ email, password }: SignInParams) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (e) {
    console.log(e);
    throw new Error("Failed to sign in");
  }
};

export const signOut = async () => {
  try {
    await account.deleteSession("current");
  } catch (e) {
    console.log(e);
    throw new Error("Failed to sign out");
  }
};

export const getCurrentUser = async () => {
  try {
    const user = await account.get();
    if (!user) throw Error;

    const currentUser = await databases.listDocuments(
      appConfig.appwrite.databaseId!,
      "users",
      [Query.equal("accountId", user.$id)],
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (e) {
    console.log(e);
    throw new Error("Failed to get current user");
  }
};
