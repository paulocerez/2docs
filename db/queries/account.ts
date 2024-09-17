import { db } from "../db";
import { accounts, InsertAccount} from "../schema";

export async function createAccount(data: InsertAccount) {
	await db.insert(accounts).values(data);
  }