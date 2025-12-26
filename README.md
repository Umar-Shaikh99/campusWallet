# 💰 CampusWallet

<div align="center">

![React Native](https://img.shields.io/badge/React_Native-0.83-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![NativeWind](https://img.shields.io/badge/NativeWind-4.2-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A smart expense tracking app designed specifically for college students**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Contributing](#-contributing)

</div>

---

## 📱 About

CampusWallet helps college students take control of their finances by providing an intuitive way to track expenses, set budgets, and manage spending categories based on their living situation (hostel/PG or home).

Whether you're managing your mess bills, splitting hostel rent, or tracking your canteen expenses, CampusWallet has you covered.

## ✨ Features

### 🎯 Smart Onboarding
- Personalized setup flow with optional profile details
- Monthly budget configuration with preset options (₹5,000 / ₹8,000 / ₹10,000)
- Living type selection (Hostel/PG or Home) for customized categories
- Auto-populated expense categories based on your living situation

### 📊 Expense Tracking
- Quick expense logging with category icons
- Monthly budget overview
- Category-wise spending breakdown
- Persistent data storage with MMKV

### 🎨 Modern UI/UX
- Beautiful dark theme optimized for mobile
- Smooth animations and transitions
- Responsive design with NativeWind (Tailwind CSS)
- Accessible component library (gluestack-ui)

### 🔧 Developer Experience
- Full TypeScript support
- Modular Zustand stores with MMKV persistence
- Clean project architecture
- Comprehensive navigation setup

---

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React Native CLI 0.83 |
| **Language** | TypeScript 5.8 |
| **Styling** | NativeWind 4.2 (Tailwind CSS) |
| **UI Components** | gluestack-ui v3 |
| **State Management** | Zustand 5.0 |
| **Storage** | react-native-mmkv |
| **Navigation** | React Navigation 7 |
| **Icons** | Lucide React Native |
| **Forms** | React Hook Form + Zod |
| **Animations** | React Native Reanimated |

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 20
- React Native development environment ([Setup Guide](https://reactnative.dev/docs/environment-setup))
- Android Studio / Xcode

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/campuswallet.git
   cd campuswallet
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install iOS pods** (macOS only)
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Start the app**
   ```bash
   # Android
   npm run android

   # iOS
   npm run ios
   ```

---

## 📁 Project Structure

```
src/
├── app/
│   └── stores/            # Zustand stores with MMKV persistence
│       ├── useAppStore.ts
│       ├── useOnboardingStore.ts
│       └── storage.ts
├── assets/                # Images, fonts, icons
├── components/
│   ├── onboarding/        # Onboarding-specific components
│   └── ui/                # gluestack-ui components
├── navigation/            # React Navigation setup
├── screens/               # Screen components
│   └── onboarding/        # Onboarding flow screens
├── types/                 # TypeScript type definitions
└── utils/                 # Utility functions
```

---

## 🤝 Contributing

We welcome contributions from the community! Whether it's bug fixes, new features, or documentation improvements, your help is appreciated.

### How to Contribute

1. **Fork the repository**

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Follow the existing code style
   - Add TypeScript types for new code
   - Test your changes on both Android and iOS

4. **Commit your changes**
   ```bash
   git commit -m "feat: add amazing feature"
   ```
   
   We follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

5. **Push and create a Pull Request**
   ```bash
   git push origin feature/amazing-feature
   ```

### Development Guidelines

- Use TypeScript for all new files
- Follow the existing folder structure
- Use NativeWind for styling (avoid inline styles)
- Keep components small and focused
- Add proper types and interfaces

### Ideas for Contribution

- [ ] Expense analytics dashboard
- [ ] Bill splitting with friends
- [ ] Recurring expense reminders
- [ ] Export data to CSV/PDF
- [ ] Dark/Light theme toggle
- [ ] Multi-currency support
- [ ] Cloud backup integration

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [gluestack-ui](https://gluestack.io/) for the beautiful component library
- [NativeWind](https://www.nativewind.dev/) for Tailwind CSS in React Native
- [Lucide](https://lucide.dev/) for the icon set

---

<div align="center">

**Built with ❤️ for students, by students**

⭐ Star this repo if you find it helpful!

</div>
