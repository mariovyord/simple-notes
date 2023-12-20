export abstract class LocalStorageService {
  protected get<T>(key: string): T | null {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (err) {
      console.error("Error getting data from Local Storage", err);
      return null;
    }
  }

  protected set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error("Error saving data to Local Storage", err);
    }
  }

  protected remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.error("Error removing data from Local Storage", err);
    }
  }
}
