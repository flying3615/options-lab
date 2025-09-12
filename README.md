# Options Lab

A laboratory for experimenting with and visualizing financial options strategies.

This project is a web-based tool designed to help users understand, analyze, and visualize various options trading strategies. It provides interactive charts and detailed breakdowns of strategies, making it an excellent resource for both beginners and experienced traders.

## Features

- **Strategy Library:** Explore a comprehensive library of pre-defined options strategies, categorized by market outlook (bullish, bearish, neutral).
- **Interactive Payoff Charts:** Visualize the profit/loss profile of each strategy with interactive charts powered by ECharts.
- **Strategy Comparison:** Compare two strategies side-by-side to understand their differences in risk and reward.
- **Strategy Builder:** Create and save your own custom options strategies by combining different legs (long/short calls, puts, and stock).
- **Strategy Wizard:** Get strategy suggestions based on your market outlook and risk tolerance.
- **Educational Content:** Learn the basics of options trading with a dedicated "Basics" section and a glossary of terms.
- **Composition Steps:** See how a complex strategy is built up from its individual legs.

## Tech Stack

- **Frontend:** React, TypeScript
- **Charting:** ECharts
- **Routing:** React Router
- **State Management:** Zustand
- **Build Tool:** Vite

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm, pnpm, or yarn

### Installation

1.  Clone the repository.
2.  Navigate to the project directory.
3.  Install dependencies:
    ```bash
    npm install
    ```

### Running the Development Server

To start the development server, run:

```bash
npm run dev
```

Open your browser and navigate to the URL provided in the terminal to see the application.

## Available Scripts

-   `dev`: Runs the app in development mode.
-   `build`: Builds the app for production.
-   `lint`: Lints the source code.
-   `preview`: Serves the production build locally for preview.