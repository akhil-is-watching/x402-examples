import SolanaPayment from "@/components/SolanaPayment";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-purple-50 to-blue-50 dark:from-zinc-950 dark:via-purple-950 dark:to-blue-950">
      <main className="container mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            X402 Payment Demo
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Experience seamless blockchain payments with Phantom wallet integration
          </p>
        </div>

        {/* Main Component */}
        <SolanaPayment />

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-zinc-500 dark:text-zinc-500">
            Powered by{" "}
            <span className="font-semibold text-purple-600 dark:text-purple-400">
              Faremeter
            </span>{" "}
            and{" "}
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              Solana
            </span>
          </p>
        </div>
      </main>
    </div>
  );
}
