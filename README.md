# Finance App - Personal Finance Management System

<div align="center">
  <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License">
  <img src="https://img.shields.io/badge/Open%20Source-Yes-brightgreen.svg" alt="Open Source">
  <img src="https://img.shields.io/badge/No%20Auth-Required-red.svg" alt="No Authentication">
  <img src="https://img.shields.io/badge/Version-1.0.0-orange.svg" alt="Version">
</div>

## Overview

A comprehensive personal finance management system built for tracking expenses, income, budgets, and financial goals. This open-source application requires no authentication and stores all data locally in your browser, making it completely private and secure.

### Key Features

- **Expense Tracking** - Monitor daily, weekly, and monthly expenses
- **Income Management** - Track multiple income sources
- **Budget Planning** - Set and monitor budget goals
- **Financial Analytics** - Visual charts and financial insights
- **Goal Setting** - Set and track financial objectives
- **Category Management** - Organize transactions by custom categories
- **Transaction History** - Complete transaction logs with search and filter
- **Responsive Design** - Works seamlessly on desktop and mobile
- **No Registration Required** - Start using immediately without signup

---

## Technologies Used

<div align="center">
  
### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)

### Charts & Visualization
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chart.js&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-8884D8?style=for-the-badge&logo=recharts&logoColor=white)

### Development Tools
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)

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
│   │   └── Settings/
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Expenses.js
│   │   ├── Income.js
│   │   └── Reports.js
│   ├── utils/
│   │   ├── calculations.js
│   │   └── storage.js
│   ├── styles/
│   │   ├── global.css
│   │   └── components.css
│   ├── App.js
│   └── index.js
├── package.json
├── README.md
└── .gitignore
```

---

## Quick Start

### Prerequisites

- Node.js (version 14 or higher)
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
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open browser**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
npm run build
```

---

## Features

### Expense Tracking
- Add, edit, and delete expenses with categories
- Set recurring expenses and payment reminders
- Upload and attach receipts to transactions
- Advanced filtering and search capabilities

### Income Management
- Track multiple income sources (salary, freelance, investments)
- Set income categories and recurring payments
- Monthly and yearly income analysis
- Income vs expense comparison

### Budget Planning
- Create custom budget categories
- Set monthly, quarterly, and yearly budget limits
- Real-time budget tracking with spending alerts
- Budget vs actual spending reports

### Analytics and Reports
- Interactive charts showing spending patterns
- Monthly and yearly financial reports
- Category-wise expense breakdowns
- Income trends and financial health metrics
- Export reports in PDF and Excel formats

### Goal Setting
- Set savings goals and debt payoff targets
- Track progress with visual indicators
- Set milestone reminders and achievements
- Goal completion notifications

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

- Follow React best practices and hooks patterns
- Use ES6+ JavaScript features
- Ensure responsive design for all components
- Add proper error handling and validation
- Write clear comments for complex logic
- Test functionality across different browsers

### Areas for Contribution

- **Bug fixes** - Report and fix issues
- **New features** - Enhance existing functionality
- **UI/UX improvements** - Better user experience
- **Performance optimization** - Faster loading and rendering
- **Documentation** - Improve guides and examples
- **Testing** - Add unit and integration tests

---

## Configuration

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
    dateFormat: 'MM/DD/YYYY'
  }
}
```

### Customization Options

- **Theme settings** - Light and dark mode
- **Currency support** - Multiple currency options
- **Date formats** - Various date display formats
- **Category management** - Custom expense and income categories
- **Notification preferences** - Budget alerts and reminders

---

## Known Issues

- Chart rendering may be slow with large datasets (500+ transactions)
- Local storage has browser limitations (typically 5-10MB)
- Some mobile browsers may have display issues in landscape mode

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