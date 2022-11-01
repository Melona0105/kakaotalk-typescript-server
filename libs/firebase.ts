import { initializeApp } from "firebase-admin/app";
import { auth, credential, ServiceAccount } from "firebase-admin";
import serviceAccountKey from "./serviceAccountKey.json";

initializeApp({
  credential: credential.cert(serviceAccountKey as ServiceAccount),
});

export async function verifyIdToken(token: any) {
  const { uid } = await auth().verifyIdToken(token);

  return uid;
}
