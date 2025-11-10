"use client";

import { useState } from "react";
import { PublicKey, VersionedTransaction, Connection } from "@solana/web3.js";
import { createPaymentHandler } from "@faremeter/payment-solana/exact";
import { wrap as wrapFetch } from "@faremeter/fetch";
import { lookupKnownSPLToken } from "@faremeter/info/solana";

export default function SolanaPayment() {
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>("");

  async function connectAndPay() {
    setLoading(true);
    setResult("");
    
    try {
      if (!window.phantom?.solana) {
        throw new Error("Phantom wallet not installed. Please install it from phantom.app");
      }

      const phantom = window.phantom.solana;
      await phantom.connect();

      if (!phantom.publicKey) {
        throw new Error("Failed to connect to Phantom wallet");
      }

      setWalletAddress(phantom.publicKey.toString());

      const network = "mainnet-beta";
      const connection = new Connection("https://api.devnet.solana.com");

      const usdcInfo = lookupKnownSPLToken(network, "USDC");
      if (!usdcInfo) {
        throw new Error(`Couldn't look up USDC on ${network}`);
      }

      const usdcMint = new PublicKey(usdcInfo.address);

      const wallet = {
        network,
        publicKey: phantom.publicKey,
        updateTransaction: async (tx: VersionedTransaction) => {
          const signedTx = await phantom.signTransaction(tx);
          return signedTx;
        },
      };

      const handler = createPaymentHandler(wallet, usdcMint, connection);

      const fetchWithPayer = wrapFetch(fetch, {
        handlers: [handler],
      });

      const response = await fetchWithPayer("/api/helius", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult(`Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Solana Payment Demo</h1>
          <p className="text-purple-100 opacity-90">
            Connect your Phantom wallet and make a payment using USDC
          </p>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Wallet Status */}
          {walletAddress && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-sm font-medium text-green-800 dark:text-green-400 mb-1">
                Connected Wallet
              </p>
              <p className="text-xs font-mono text-green-600 dark:text-green-500 break-all">
                {walletAddress}
              </p>
            </div>
          )}

          {/* Action Button */}
          <button
            onClick={connectAndPay}
            disabled={loading}
            className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 ${
              loading
                ? "bg-zinc-300 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Processing...
              </span>
            ) : (
              "Connect & Pay with Phantom"
            )}
          </button>

          {/* Result Display */}
          {result && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-3 text-zinc-900 dark:text-zinc-100">
                Response:
              </h2>
              <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700">
                <pre className="text-xs font-mono overflow-x-auto text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap break-words">
                  {result}
                </pre>
              </div>
            </div>
          )}

          {/* Info Box */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
              ℹ️ What happens when you click?
            </h3>
            <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1 list-disc list-inside">
              <li>Connects to your Phantom wallet</li>
              <li>Sets up USDC payment on Solana mainnet</li>
              <li>Makes an API call to Triton RPC endpoint</li>
              <li>Displays the blockchain response</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

