class StorageKey {
  ARTICLE_DATA: string;
  HOMEPAGE_DATA: string;
}

export const STORAGE_KEY: StorageKey = {
  ARTICLE_DATA: 'ARTICLE_DATA',
  HOMEPAGE_DATA: 'HOMEPAGE_DATA',
};

function save(key: string, value: any): void {
  let sanitizedValue = value;

  if (typeof value === 'object') {
    sanitizedValue = JSON.stringify(value);
  }

  window.localStorage.setItem(key, sanitizedValue);
}

function get(key: string): any {
  let valueToReturn;
  const stringValue = window.localStorage.getItem(key);

  try {
    valueToReturn = JSON.parse(stringValue);
  } catch (error) {
    valueToReturn = stringValue;
  }

  return valueToReturn;
}

function remove(key: string): void {
  window.localStorage.removeItem(key);
}

export default {
  save,
  get,
  remove,
};
