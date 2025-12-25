interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

class Cache {
  private cache = new Map<string, CacheEntry<unknown>>();

  /**
   * Get a value from cache if it exists and hasn't expired
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  /**
   * Set a value in cache with TTL in milliseconds
   */
  set<T>(key: string, value: T, ttlMs: number): void {
    this.cache.set(key, {
      data: value,
      expiresAt: Date.now() + ttlMs,
    });
  }

  /**
   * Delete a specific key from cache
   */
  delete(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Clear all expired entries from cache
   */
  clearExpired(): void {
    const now = Date.now();

    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiresAt) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Clear all cache entries
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Generate a cache key from function name and parameters
   */
  static generateKey(
    functionName: string,
    ...params: readonly unknown[]
  ): string {
    const paramsString = params
      .map(param =>
        param !== null && typeof param === 'object'
          ? JSON.stringify(param)
          : String(param)
      )
      .join('|');

    return `${functionName}:${paramsString}`;
  }
}

// Singleton instance
export const cache = new Cache();
export { Cache };

// Clean up expired entries every 5 minutes
setInterval(() => {
  cache.clearExpired();
}, 5 * 60 * 1000);
  