import { PublicKey, Transaction, VersionedTransaction } from "@solana/web3.js";

export interface PhantomProvider {
  publicKey: PublicKey | null;
  isConnected: boolean;
  signTransaction<T extends Transaction | VersionedTransaction>(
    transaction: T
  ): Promise<T>;
  signAllTransactions<T extends Transaction | VersionedTransaction>(
    transactions: T[]
  ): Promise<T[]>;
  signMessage(message: Uint8Array, display?: string): Promise<{ signature: Uint8Array }>;
  connect(opts?: { onlyIfTrusted?: boolean }): Promise<{ publicKey: PublicKey }>;
  disconnect(): Promise<void>;
  on(event: string, callback: (args: any) => void): void;
  request(args: { method: string; params?: any }): Promise<any>;
}

declare global {
  interface Window {
    phantom?: {
      solana?: PhantomProvider;
    };
  }
}

export {};

