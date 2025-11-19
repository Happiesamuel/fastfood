import {
  CreateUserParams,
  GetMenuParams,
  MenuItem,
  SignInParams,
} from "@/type";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "appwrite";

export const appwriteConfig = {
  endpoint: "https://fra.cloud.appwrite.io/v1",
  platform: "com.jsm.foodordering",
  projectId: "687799690009f922b7de",
  databaseId: "6919e88d0010740fe9a3",
  userCollectionId: "user",
  categoriesCollectionId: "categories",
  menuCollectionId: "menu",
  customizationsCollectionId: "customizations",
  menuCustomizationsCollectionId: "menu_customizations",
  bucketId: "691ab8ec001bf72467af",
};
const client = new Client();
client
  .setEndpoint(appwriteConfig.endpoint!)
  .setProject(appwriteConfig.projectId!);
// .setPlatform(appwriteConfig.platform!);

export const account = new Account(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client);
export const storage = new Storage(client);
export async function createUser({ name, email, password }: CreateUserParams) {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name);
    if (!newAccount) throw Error;
    await SignInFun({ email, password });
    const avatarUrl = avatars.getInitials("John Doe");

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
export async function getMenu({ category, query }: GetMenuParams) {
  try {
    const queries: string[] = [];
    if (category) queries.push(Query.equal("categories", category));
    if (query) queries.push(Query.search("name", query));
    const menues = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.menuCollectionId,
      queries
    );
    return menues.documents;
  } catch (error) {
    throw new Error(error as string);
  }
}
export async function getCategories() {
  try {
    const categories = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.categoriesCollectionId
    );
    return categories.documents;
  } catch (error) {
    throw new Error(error as string);
  }
}
export async function getMenuById({ id }: { id: string }) {
  try {
    const menu = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.menuCollectionId,
      id
    );

    return menu as unknown as MenuItem;
  } catch (err: any) {
    console.log("❌ ERROR:", err.message);
    return null;
  }
}
