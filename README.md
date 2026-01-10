# NaN IDLE

> An incremental (idle game) for developers. Start by fixing bugs, end by refactoring the universe.

![Game Cover](todo) ---

## 🎮 About The Game

`NaN IDLE` is an idle/incremental game inspired by the classic _NGU Idle_, but with a theme 100% focused on the programming universe and the life of a developer.

Start as an noob and train your _skills_ (like `Attack` and `Defence`), fight _bosses_, earn _gold_, and watch your numbers go up to infinity!

## ✨ Planned Features

Based on the original diagram, the game plans to include:

- **🏋️ Training:** Train your basic stats (Attack, Defence, etc.) using Energy.
- **👹 Fight Boss:** Battle bosses to earn XP, Gold, and Items.
- **🗺️ Adventure:** An AFK game mode to automatically farm items and gold.
- **⛏️ Miners:** Buy bitcoin miners to passively generate gold.
- **🎓 Online Course:** Train "knowledge" stats like `attack` and `defence`.
- **... and much more!** (Pit, Sr. Training, Sass, Virtual Box, etc.)

## 💻 Tech Stack & Architecture

This project follows **Clean Architecture** principles to ensure a decoupled, testable, and maintainable codebase. The project is organized into layers:

- **Domain:** Pure business logic (Entities, Interfaces).
- **Application:** Orchestration logic (Use Cases, Services).
- **Infrastructure:** External implementations (Repositories, Data Sources, External Services).
- **Presentation:** UI and State Management (Vue Components, Pinia Stores).

### Technologies Used

- **[Vue.js 3](https://vuejs.org/):** Main reactive framework (Composition API).
- **[TypeScript](https://www.typescriptlang.org/):** For static typing and better DX.
- **[Vite](https://vitejs.dev/):** High-performance build tool.
- **[Pinia](https://pinia.vuejs.org/):** State management.
- **[Vue Router](https://router.vuejs.org/):** Page navigation.
- **[Break_infinity.js](https://github.com/Patashu/BreakInfinity.js):** Handling extremely large numbers.
- **[Vitest](https://vitest.dev/):** Unit testing framework.
- **[ESLint](https://eslint.org/) & [Prettier](https://prettier.io/):** Code quality and formatting.
- **[Husky](https://typicode.github.io/husky/):** Git hooks for automated checks.

---

## 🚀 Running the Project Locally

You must have [Node.js](https://nodejs.org/en/) (v18+ or higher) installed.

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/FelipeBockMagagnin/nan_idle.git](https://github.com/FelipeBockMagagnin/nan_idle.git)
    cd nan_idle
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Start the development server:**

    ```bash
    npm run dev
    ```

4.  Open `http://localhost:5173` (or the port shown in your terminal) in your browser.

### Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Compiles the project for production (in the `/dist` folder).
- `npm run lint`: Runs the linter (ESLint) to check code quality.

---
