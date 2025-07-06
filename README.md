# Finance App - Personal Finance Management App 

<div align="center">
  <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License">
  <img src="https://img.shields.io/badge/Open%20Source-Yes-brightgreen.svg" alt="Open Source">
  <img src="https://img.shields.io/badge/No%20Auth-Required-red.svg" alt="No Authentication">
  <img src="https://img.shields.io/badge/Version-1.0.0-orange.svg" alt="Version">
</div>

## Overview

A modern, animated personal finance management system built with Next.js for tracking expenses, income, budgets, and financial goals. This open-source application features smooth animations, requires no authentication, and stores all data locally in your browser, making it completely private and secure.

### Key Features

- **Expense Tracking** - Monitor daily, weekly, and monthly expenses
- **Income Management** - Track multiple income sources
- **Budget Planning** - Set and monitor budget goals
- **Financial Analytics** - Visual charts and financial insights
- **Goal Setting** - Set and track financial objectives
- **Category Management** - Organize transactions by custom categories
- **Transaction History** - Complete transaction logs with search and filter
- **Smooth Animations** - Fluid transitions and micro-interactions
- **Interactive UI** - Engaging user interface with hover effects
- **Responsive Design** - Works seamlessly on desktop and mobile with animated layouts
- **No Registration Required** - Start using immediately without signup

---

## Technologies Used

<div align="center">
  
### 🚀 Frontend & Framework
<div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
  
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

</div>

### 🎨 Styling & Animation
<div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
  
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)

</div>

### 📊 Charts & Visualization
<div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
  
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chart.js&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-8884D8?style=for-the-badge&logo=recharts&logoColor=white)
![D3.js](https://img.shields.io/badge/D3.js-F9A03C?style=for-the-badge&logo=d3.js&logoColor=white)

</div>

### 🛠️ Development Tools
<div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
  
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

</div>

### ⚡ Performance & Optimization
<div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
  
![Webpack](https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=webpack&logoColor=black)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)

</div>

</div>

---

## Project Structure

```
Finance-app/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Dashboard/
│   │   ├── Transactions/
│   │   ├── Budget/
│   │   ├── Analytics/
│   │   ├── Animations/
│   │   └── Settings/
│   ├── pages/
│   │   ├── index.js
│   │   ├── expenses.js
│   │   ├── income.js
│   │   └── reports.js
│   ├── utils/
│   │   ├── calculations.js
│   │   ├── storage.js
│   │   └── animations.js
│   ├── styles/
│   │   ├── globals.css
│   │   └── components.css
│   ├── hooks/
│   │   ├── useAnimation.js
│   │   └── useLocalStorage.js
│   └── lib/
│       └── constants.js
├── package.json
├── next.config.js
├── tailwind.config.js
├── README.md
└── .gitignore
```

---

## Quick Start

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Aryanwadhwa14/Finance-app.git
   cd Finance-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open browser**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
npm run build
npm run start
# or
yarn build
yarn start
```

---

## Features

### Expense Tracking
- Add, edit, and delete expenses with smooth animated transitions
- Custom categories with color-coded animations
- Set recurring expenses with visual progress indicators
- Upload and attach receipts with drag-and-drop animations
- Advanced filtering with animated search results

### Income Management  
- Track multiple income sources with animated charts
- Set income categories with interactive hover effects
- Real-time income analysis with smooth graph transitions
- Animated income vs expense comparison widgets

### Budget Planning
- Create custom budget categories with animated progress bars
- Set budget limits with real-time animated updates
- Interactive budget tracking with color-coded alerts
- Animated budget vs actual spending comparisons
- Smart budget recommendations with motion graphics

### Analytics and Reports
- Interactive animated charts showing spending patterns
- Smooth transitions between different time periods
- Animated category breakdowns and trend analysis
- Real-time financial health metrics with progress animations
- Export reports with loading animations and success feedback

### Goal Setting
- Set savings goals with animated progress tracking
- Visual milestone celebrations with micro-animations
- Animated achievement badges and progress rings
- Goal completion animations and notifications

---

## No Authentication Required

This finance app is designed as a **privacy-first, open-source application**:

- **No signup required** - Start using immediately
- **Local data storage** - All data stays in your browser
- **Complete privacy** - No data sent to external servers
- **Offline functionality** - Works without internet connection
- **Open source** - Fully transparent and auditable code

---

## Contributing

We welcome contributions from developers worldwide. Here's how you can help:

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/new-feature`)
3. **Make your changes** and test thoroughly
4. **Commit your changes** (`git commit -m 'Add new feature'`)
5. **Push to branch** (`git push origin feature/new-feature`)
6. **Create Pull Request**

### Development Guidelines

- Follow Next.js 13+ App Router patterns and React Server Components
- Use TypeScript for type safety and better development experience
- Implement Tailwind CSS utility classes for consistent styling
- Create reusable animated components with Framer Motion
- Ensure responsive design with Tailwind's responsive utilities
- Add proper error boundaries and loading states with animations
- Use Next.js Image component for optimized image loading
- Implement proper SEO with Next.js Head component
- Follow accessibility guidelines with proper ARIA labels
- Test animations across different devices and browsers

### Areas for Contribution

- **Bug fixes** - Report and fix issues with animations and functionality
- **New features** - Enhance existing functionality with smooth animations
- **UI/UX improvements** - Better user experience with micro-interactions
- **Performance optimization** - Optimize animations and Next.js performance
- **Accessibility** - Improve accessibility with proper motion preferences
- **Documentation** - Improve guides and animation examples
- **Testing** - Add unit tests and animation testing
- **Mobile optimization** - Enhance mobile animations and responsiveness

---

## Configuration

### Configuration

```javascript
// next.config.js
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  experimental: {
    appDir: true,
  },
}

// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-in': 'bounceIn 0.6s ease-out',
      },
    },
  },
  plugins: [],
}
```

### Local Storage Structure

```javascript
{
  transactions: [],
  budgets: [],
  goals: [],
  categories: [],
  settings: {
    currency: 'USD',
    theme: 'light',
    dateFormat: 'MM/DD/YYYY',
    animations: true,
    reducedMotion: false
  }
}
```

### Customization Options

- **Theme settings** - Light and dark mode with smooth transitions
- **Animation preferences** - Enable/disable animations and respect reduced motion
- **Currency support** - Multiple currency options with animated switching
- **Date formats** - Various date display formats
- **Category management** - Custom expense and income categories with color animations
- **Chart preferences** - Different chart types with animated transitions
- **Notification settings** - Budget alerts and reminders with animation effects

---

## Known Issues

- Animation performance may be slower on older devices
- Some animations may not work properly in Safari with motion preferences
- Chart animations may lag with datasets over 1000+ transactions
- Local storage limitations in some browsers (typically 5-10MB)
- Framer Motion animations may cause layout shifts on initial load

---

## Support

### Getting Help

- **GitHub Issues** - Report bugs and request features
- **Discussions** - Community questions and ideas
- **Wiki** - Detailed documentation and tutorials

### Bug Reports

When reporting bugs, please include:
- Browser version and operating system
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots if applicable

---

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  
**Star this repository if you find it helpful!**

[Report Bug](https://github.com/Aryanwadhwa14/Finance-app/issues) · [Request Feature](https://github.com/Aryanwadhwa14/Finance-app/issues) · [Contribute](https://github.com/Aryanwadhwa14/Finance-app/pulls)

**Made with ❤️ by [Aryan Wadhwa](https://github.com/Aryanwadhwa14)**

</div>