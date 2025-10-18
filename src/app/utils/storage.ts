// src/utils/storage.ts

const DRAFTS_PREFIX = "serviceDrafts/";

export function saveDraftToStorage<T>(draftId: string, data: T): void {
  try {
    localStorage.setItem(`${DRAFTS_PREFIX}${draftId}`, JSON.stringify(data));
  } catch {
    console.warn(`Failed to save draft ${draftId} to storage`);
  }
}

export function loadAllDraftsFromStorage<T>(): T[] {
  const drafts: T[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(DRAFTS_PREFIX)) {
      const raw = localStorage.getItem(key);
      if (raw) drafts.push(JSON.parse(raw));
    }
  }
  return drafts;
}

export function deleteDraftFromStorage(draftId: string): void {
  localStorage.removeItem(`${DRAFTS_PREFIX}${draftId}`);
}

export function clearAllDraftsFromStorage(): void {
  const keysToRemove: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(DRAFTS_PREFIX)) keysToRemove.push(key);
  }
  keysToRemove.forEach((key) => localStorage.removeItem(key));
}


// --- LOG STORAGE HELPERS ---

const LOGS_PREFIX = "serviceLogs/";

export function saveLogToStorage<T>(logId: string, data: T): void {
  try {
    localStorage.setItem(`${LOGS_PREFIX}${logId}`, JSON.stringify(data));
  } catch {
    console.warn(`Failed to save log ${logId} to storage`);
  }
}

export function loadAllLogsFromStorage<T>(): T[] {
  const logs: T[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(LOGS_PREFIX)) {
      const raw = localStorage.getItem(key);
      if (raw) logs.push(JSON.parse(raw));
    }
  }
  return logs;
}

export function deleteLogFromStorage(logId: string): void {
  localStorage.removeItem(`${LOGS_PREFIX}${logId}`);
}

export function clearAllLogsFromStorage(): void {
  const keysToRemove: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(LOGS_PREFIX)) keysToRemove.push(key);
  }
  keysToRemove.forEach((key) => localStorage.removeItem(key));
}

