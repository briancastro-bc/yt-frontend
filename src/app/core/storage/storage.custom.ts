export class CustomStorage {

  private readonly storage: Storage;

  constructor(storage: Storage) {
    this.storage = storage;
  }

  getItem(key: string): { value: any, timestamp: number } {
    const item = this.storage.getItem(key);
    return item ? JSON.parse(item) : '';
  }

  setItem(key: string, value: any): void {
    this.storage.setItem(key, JSON.stringify({ value, timestamp: new Date().getTime() }));
  }

  removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  clear(): void {
    this.storage.clear();
  }
}
