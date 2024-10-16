import Hashids from 'hashids';

const salt = 'aY4mjaG0mak4nANnYAb3b3K';
const minLength = 8;
const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

const hashids = new Hashids(salt, minLength, alphabet);

export function encodeRoomId(roomId: number): string {
  return hashids.encode(roomId);
}

export function decodeRoomId(encodedId: string): number {
  const decoded = hashids.decode(encodedId);
  if (decoded.length === 0) {
    throw new Error('Invalid encoded ID');
  }
  return decoded[0] as number;
}