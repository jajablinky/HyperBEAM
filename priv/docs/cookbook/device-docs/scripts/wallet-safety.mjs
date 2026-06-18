import path from 'node:path';

const forbiddenWalletNames = ['samx'];

function includesForbiddenWalletName(value) {
  const normalized = String(value || '').toLowerCase();
  return forbiddenWalletNames.find((name) => normalized.includes(name));
}

export function assertDeployWalletAllowed(walletPath, wallet = {}) {
  const pathMatch = includesForbiddenWalletName(walletPath);
  if (pathMatch) {
    throw new Error(`Refusing to deploy with wallet path containing "${pathMatch}". Use a different Arweave wallet.`);
  }

  const walletMetadata = [
    wallet.name,
    wallet.label,
    wallet.nickname,
    wallet.walletName,
    wallet.id,
    wallet.address,
    path.basename(String(walletPath || ''))
  ].filter(Boolean).join(' ');

  const metadataMatch = includesForbiddenWalletName(walletMetadata);
  if (metadataMatch) {
    throw new Error(`Refusing to deploy with wallet metadata containing "${metadataMatch}". Use a different Arweave wallet.`);
  }
}
