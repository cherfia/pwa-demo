This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Scheduled Notifications

This app supports scheduling push notifications that will be sent even if the app is closed. Notifications are scheduled using [Upstash QStash](https://upstash.com/docs/qstash/overall/getstarted), a serverless message queue with built-in scheduling.

### Setup

1. **Get QStash credentials:**

   - Sign up at [Upstash](https://upstash.com/) (free tier available)
   - Create a QStash project
   - Copy your QStash token

2. **Configure environment variables:**

   ```bash
   QSTASH_TOKEN=your_qstash_token_here
   ```

   Optional (for production security):

   ```bash
   QSTASH_CURRENT_SIGNING_KEY=your_signing_key
   QSTASH_NEXT_SIGNING_KEY=your_next_signing_key
   ```

3. **Set your base URL** (for production):
   ```bash
   NEXT_PUBLIC_BASE_URL=https://your-domain.com
   ```

### How It Works

- When you schedule a notification, it's sent to QStash with a delay
- QStash calls your API endpoint at the scheduled time
- No cron jobs needed - QStash handles all scheduling
- Works on any hosting platform (Vercel, Netlify, etc.)
- Free tier includes 10,000 requests/month

### Local Development

For local development, you can use QStash's webhook forwarding or test with a public URL using a tool like [ngrok](https://ngrok.com/):

```bash
# Start your dev server
pnpm dev

# In another terminal, expose it with ngrok
ngrok http 3000

# Use the ngrok URL as NEXT_PUBLIC_BASE_URL
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
