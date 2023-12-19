/**
 * TODO: Add notification on error
 */
export abstract class LocalStorageService {
  protected get<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  protected set<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  protected remove(key: string): void {
    localStorage.removeItem(key);
  }
}
