const ENCRYPTION_MODE = "AES-GCM";

const Key = await generateKey();
const encoder = new TextEncoder(); 
const decoder = new TextDecoder(); 

const seed:Uint8Array = window.crypto.getRandomValues(new Uint8Array(12));

async function generateKey():Promise<CryptoKey> {
  let key = await window.crypto.subtle.generateKey(
    {
      name: ENCRYPTION_MODE,
      length: 256,
    },
    true,
    ["encrypt", "decrypt"]
  );
  return key;
}

export function useEncryption() {
  async function encrypt(value: string) {
    var buffer:ArrayBuffer = await window.crypto.subtle.encrypt(
      {
        name: ENCRYPTION_MODE,
        iv: seed,
        length: 64
      },
      Key,
      encoder.encode(value)
    );
    return decoder.decode(buffer)
  }

  async function decrypt(value: string) {
    var buffer:ArrayBuffer = await window.crypto.subtle.decrypt(
      {
        name: ENCRYPTION_MODE,
        iv: seed,
        length: 64
      },
      Key,
      encoder.encode(value)
    );
    return decoder.decode(buffer) 
  }

  return { encrypt, decrypt };
}
