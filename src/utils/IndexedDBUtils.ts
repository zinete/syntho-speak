/**
 * @ Author: ZhengHui
 * @ Create Time: 2024-02-21 10:35:33
 * @ Modified by: ZhengHui
 * @ Modified time: 2024-02-21 14:01:18
 * @ Description: IndexedDBUtils.ts
 */

class IndexedDBUtils {
  private dbName: string;
  private dbVersion: number;
  private storeName: string;

  constructor(dbName: string, dbVersion: number, storeName: string) {
    this.dbName = dbName;
    this.dbVersion = dbVersion;
    this.storeName = storeName;
  }
  public async getItemById(itemId: number): Promise<any | undefined> {
    const db = await this.openDatabase();
    const transaction = db.transaction(this.storeName, "readonly");
    const store = transaction.objectStore(this.storeName);

    return new Promise((resolve, reject) => {
      const request = store.get(IDBKeyRange.only(itemId));

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = (event: any) => {
        reject(`Error getting item by ID: ${event.target.error}`);
      };
    });
  }

  public async openDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onerror = (event: any) => {
        reject(`Error opening database: ${event.target.error}`);
      };

      request.onsuccess = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        resolve(db);
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, {
            keyPath: "id",
            autoIncrement: true,
          });
        }
      };
    });
  }

  public async addItem(item: any): Promise<void> {
    const db = await this.openDatabase();
    const transaction = db.transaction(this.storeName, "readwrite");
    const store = transaction.objectStore(this.storeName);

    const existingItem = await this.getItemById(item.id);

    if (existingItem) {
      console.log("Item already exists in the database. Skipped adding.");
      return;
    }
    return new Promise((resolve, reject) => {
      const request = store.add(item);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = (event: any) => {
        reject(`Error adding item: ${event.target.error}`);
      };
    });
  }

  public async getAllItems(): Promise<any[]> {
    const db = await this.openDatabase();
    const transaction = db.transaction(this.storeName, "readonly");
    const store = transaction.objectStore(this.storeName);

    return new Promise((resolve, reject) => {
      const request = store.getAll();

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = (event: any) => {
        reject(`Error getting items: ${event.target.error}`);
      };
    });
  }

  // Add more methods as needed (e.g., updateItem, deleteItem)
}

export default IndexedDBUtils;
