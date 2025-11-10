# Solana Payment Integration Setup

This project demonstrates a Solana payment integration using Phantom wallet and the Faremeter payment SDK.

## Prerequisites

1. **Phantom Wallet**: Install the [Phantom Browser Extension](https://phantom.app/)
2. **Node.js**: Ensure you have Node.js 18+ installed
3. **Solana Wallet**: Your Phantom wallet should have some SOL and USDC on mainnet

## Installation

Install all dependencies:

```bash
npm install
```

Or if you're using bun:

```bash
bun install
```

## Running the Application

Start the development server:

```bash
npm run dev
```

Or with bun:

```bash
bun dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
.
├── app/
│   ├── page.tsx           # Main page with SolanaPayment component
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/
│   └── SolanaPayment.tsx  # Main payment component with UI
├── types/
│   └── phantom.d.ts       # TypeScript definitions for Phantom wallet
└── package.json           # Dependencies and scripts
```

## How It Works

1. **Connect Wallet**: Click the "Connect & Pay with Phantom" button
2. **Phantom Approval**: Approve the connection in your Phantom wallet popup
3. **Payment Setup**: The app configures USDC payment on Solana mainnet
4. **API Call**: Makes a test API call to the Triton RPC endpoint
5. **Response**: Displays the blockchain response

## Key Components

### SolanaPayment Component

The main component (`components/SolanaPayment.tsx`) handles:
- Phantom wallet connection
- USDC token setup on Solana mainnet
- Payment handler creation using Faremeter SDK
- API requests with payment integration
- Beautiful UI with loading states and error handling

### Features

- ✅ Modern, responsive UI with Tailwind CSS
- ✅ Dark mode support
- ✅ Loading states and error handling
- ✅ Wallet address display
- ✅ JSON response formatting
- ✅ Helpful information tooltips

## Dependencies

### Core Dependencies
- `@solana/web3.js` - Solana blockchain interaction
- `@faremeter/payment-solana` - Payment handler for Solana
- `@faremeter/fetch` - Fetch wrapper with payment integration
- `@faremeter/info` - Token information lookup

### Framework
- `next` - React framework
- `react` - UI library
- `tailwindcss` - Styling

## Troubleshooting

### Phantom wallet not detected
- Ensure Phantom extension is installed and enabled
- Refresh the page after installing Phantom
- Check browser console for errors

### Connection fails
- Make sure you approve the connection in Phantom
- Check if your wallet is unlocked
- Verify you're on the correct network (mainnet-beta)

### Payment errors
- Ensure you have SOL in your wallet for transaction fees
- Verify you have USDC tokens if payment is required
- Check network connectivity

## Network Configuration

Currently configured for:
- **Network**: Solana Mainnet Beta
- **RPC Endpoint**: https://api.mainnet-beta.solana.com
- **Payment Token**: USDC

To use a different network, modify the `network` variable in `SolanaPayment.tsx`.

## Next Steps

- Customize the UI to match your brand
- Add more payment options (different tokens)
- Implement additional API endpoints
- Add transaction history
- Integrate with your backend services

## Support

For issues related to:
- **Faremeter SDK**: Check [Faremeter documentation](https://faremeter.com)
- **Phantom Wallet**: Visit [Phantom support](https://help.phantom.app)
- **Solana**: See [Solana docs](https://docs.solana.com)

## License

This is an example project for demonstration purposes.

