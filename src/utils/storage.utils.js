import {customAlphabet} from 'nanoid/non-secure'
import dictionary from 'nanoid-dictionary'

export const KEY_SIZE = 6

/**
 * Returns a 6 characters long unique id.
 *
 * @type {() => string}
 */
export const uniqueId = customAlphabet(dictionary.alphanumeric, KEY_SIZE)

/**
 * Method to fetch a value from the KV store.
 *
 * @param {string} key Key to fetch value from the KV store.
 * @returns {Promise<string | null>} Promise that resolves with the stored value
 */
export function getValue(key) {
  return KV.get(key)
}

/**
 * Method to fetch a value along with its metadata info from the KV store.
 *
 * @param {string} key Key to fetch value from the KV store.
 * @returns {Promise<KVWithMetadata>} Promise that resolves with the stored value & metadata
 */
export function getValueWithMetadata(key) {
  return KV.getWithMetadata(key)
}

/**
 * Method to store a value in the KV store.
 *
 * @param {string} value Value to store
 * @param {any} [metadata] Any metadata info to store
 * @returns {Promise<string>} Promise that resolves with the key of the stored value
 */
export async function setValue(value, metadata) {
  const key = await getUniqueKey()
  await KV.put(key, value, {metadata})
  return key
}

/**
 * Returns a short unique key without collision.
 * The method keeps generating a key until a unique non-colliding key is found.
 *
 * @returns {Promise<string>} Promise that resolves with a unique key
 */
export async function getUniqueKey() {
  let key = uniqueId()
  while (await getValue(key)) {
    key = uniqueId()
  }
  return key
}

/**
 * @typedef {object} KVWithMetadata The value along with its metadata info
 * @property {string | null} value The value
 * @property {any} metadata The metadata information
 */
