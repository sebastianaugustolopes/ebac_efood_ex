
# EBAC eFood

## ✨ Features

* 🏠 **Home Page**: List of restaurants including categories, ratings, and featured tags.
* 🍽️ **Restaurant Page**: Full menu view with detailed item descriptions and images.
* 🛒 **Shopping Cart**: Interactive sidebar for managing added items.
* 📝 **Forms**: Shipping and payment data validation using Zod.
* ✅ **Confirmation**: Success page after order completion.
* 📱 **Responsive Design**: Adaptive interface for both desktop and mobile devices.

## 🛠️ Technologies

### Core

* **React 18.3** - JavaScript library for building user interfaces.
* **Vite 5.4** - High-performance build tool and dev server.
* **React Router DOM 6.30** - Routing and navigation management.

### Styling

* **Tailwind CSS 3.4** - Utility-first CSS framework.
* **Styled Components 6.1** - CSS-in-JS for styled components.
* **shadcn/ui** - Accessible UI components based on Radix UI.

### Forms and Validation

* **React Hook Form 7.61** - Form management.
* **Zod 3.25** - TypeScript-first schema validation.
* **@hookform/resolvers 3.10** - Zod integration for React Hook Form.

### UI Components (Radix UI)

* Dialog, Dropdown Menu, Select, Tabs, Toast, Tooltip, and more.

### Other Libraries

* **Lucide React** - Modern icon set.
* **Sonner** - Toast notification system.
* **TanStack Query** - Server-state management.

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

* **Node.js** (version 18 or higher)
* **npm** or **yarn** or **pnpm**

## 🚀 Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd ebac-efood-ex

```

2. Install dependencies:

```bash
npm install

```

## 💻 Usage

### Development Mode

Start the development server:

```bash
npm run dev

```

The application will be available at `http://localhost:8080`.

### Production Build

Generate an optimized build for production:

```bash
npm run build

```

The files will be generated in the `dist/` folder.

### Build Preview

Preview the production build locally:

```bash
npm run preview

```

### Linting

Run the linter to check the code:

```bash
npm run lint

```

## 📁 Project Structure

```
ebac-efood-ex/
├── src/
│   ├── assets/          # Static assets and images
│   │   └── images/      # Restaurant and dish images
│   ├── components/      # Reusable components
│   │   ├── Cart/        # Cart components
│   │   ├── Footer/      # Site footer
│   │   ├── Header/      # Site header
│   │   ├── Modal/       # Modal windows
│   │   ├── PizzaCard/   # Product card
│   │   ├── RestaurantCard/ # Restaurant summary card
│   │   └── ui/          # UI components (shadcn)
│   ├── data/            # Mocked data
│   │   ├── pizzas.js    # Menu items list
│   │   └── restaurants.js # Restaurants list
│   ├── hooks/           # Custom hooks
│   ├── lib/             # Utility functions and configs
│   ├── pages/           # Application views
│   │   ├── Home/        # Landing page
│   │   ├── Restaurant/  # Menu page
│   │   └── OrderSuccess/ # Success feedback page
│   ├── routes/          # Route configuration
│   ├── schemas/         # Validation schemas (Zod)
│   ├── styles/          # Global styles
│   ├── App.jsx          # Main application component
│   └── main.jsx         # Entry point
├── public/              # Public assets
├── index.html           # Main HTML entry
├── vite.config.ts       # Vite configuration
├── tailwind.config.ts   # Tailwind configuration
└── package.json         # Scripts and dependencies

```

## 📝 Available Scripts

* `npm run dev` - Starts development server.
* `npm run build` - Creates production build.
* `npm run build:dev` - Creates build in development mode.
* `npm run preview` - Previews production build locally.
* `npm run lint` - Runs ESLint to check for code issues.

---
