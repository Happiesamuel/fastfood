import { CreateUserParams, SignInParams } from "@/type";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  platform: "com.jsm.foodordering",
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: "6919e88d0010740fe9a3",
  userCollectionId: "user",
};
const client = new Client();
client
  .setEndpoint(appwriteConfig.endpoint!)
  .setProject(appwriteConfig.projectId!)
  .setPlatform(appwriteConfig.platform!);

export const account = new Account(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client);
export async function createUser({ name, email, password }: CreateUserParams) {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name);
    if (!newAccount) throw Error;
    await SignInFun({ email, password });
    const avatarUrl = avatars.getInitialsURL(name);
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      { accountId: newAccount.$id, email, name, avatar: avatarUrl }
    );
    return newUser;
  } catch (error) {
    throw new Error(error as string);
  }
}
export async function SignInFun({ email, password }: SignInParams) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
  } catch (error) {
    throw new Error(error as string);
  }
}
export async function getCurrentUser() {
  try {
    const currentAcc = await account.get();
    if (!currentAcc) throw Error;
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAcc.$id)]
    );
    if (!currentUser) throw Error;
    return currentUser.documents.at(0);
  } catch (error) {
    throw new Error(error as string);
  }
}
