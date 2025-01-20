# Khata Sabaiko - व्यापार व्यवस्थापन प्रणाली

A modern financial management system built with Astro, Svelte, and PostgreSQL.

## Features

- 🏪 Complete inventory management
- 💰 Sales and purchase tracking
- 👥 Customer and dealer management
- 📊 Financial reports and statements
- 🌐 Bilingual support (Nepali/English)
- 📱 Responsive design
- 🔒 Secure authentication

## Tech Stack

- **Frontend**: Astro + Svelte
- **Styling**: TailwindCSS
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT + bcrypt

## Prerequisites

- Node.js 18+
- PostgreSQL database

## Environment Variables

Create a `.env` file in the root directory with:

```env
DATABASE_URL="your-postgresql-connection-string"
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/khata-sabaiko.git
cd khata-sabaiko
```

2. Install dependencies:
```bash
npm install
```

3. Generate Prisma client and push schema:
```bash
npx prisma generate
npx prisma db push
```

4. Start the development server:
```bash
npm run dev
```

## Project Structure

```
/
├── prisma/
│   └── schema.prisma    # Database schema
├── src/
│   ├── components/      # Reusable components
│   ├── layouts/         # Page layouts
│   ├── lib/            # Utilities and database client
│   ├── pages/          # Application routes
│   └── i18n/           # Translations
└── public/             # Static assets
```

## Database Schema

The application uses the following main tables:
- Users
- Customers
- Dealers
- Stocks
- Sales
- Purchases

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

