export async function storageAccessHelper() {
  if (document.requestStorageAccess) {
    try {
      await document.requestStorageAccess();
      //   console.log("Storage access granted.");
    } catch (error) {
      console.error("Storage access denied:", error);
    }
  } else {
    console.log("requestStorageAccess API is not supported.");
  }
}
