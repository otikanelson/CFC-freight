# 🚛 Freight Management App

<div align="center">

![Freight Logo](./assets/icon.png)

**A comprehensive freight and logistics management mobile application built with React Native and Expo**

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/otikanelson/CFC-freight)
[![React Native](https://img.shields.io/badge/React%20Native-0.81.5-61dafb.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-~54.0.34-000020.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-~5.9.2-3178c6.svg)](https://www.typescriptlang.org/)

[🚀 Features](#-features) • [📱 Screenshots](#-screenshots) • [⚡ Getting Started](#-getting-started) • [🏗️ Tech Stack](#️-tech-stack) • [🔧 Installation](#-installation)

</div>

---

## 📱 Screenshots

<div align="center">

### 🎨 **Splash & Authentication**
<img src="./screenshots/splash-screen.png" width="250" alt="Splash Screen" />
<img src="./screenshots/auth-screen.png" width="250" alt="Authentication Screen" />

*Beautiful glassmorphism design with smooth animations*

### 🏠 **Main Dashboard & Navigation**
<img src="./screenshots/home-screen.png" width="250" alt="Home Dashboard" />
<img src="./screenshots/navigation.png" width="250" alt="Bottom Navigation" />

*Modern glass-effect navigation with intuitive user experience*

### 📋 **Core Features**
<img src="./screenshots/clearing-screen.png" width="250" alt="Clearing Process" />
<img src="./screenshots/logistics-screen.png" width="250" alt="Logistics Management" />

*Comprehensive freight management tools at your fingertips*

### 👤 **Profile & Support**
<img src="./screenshots/profile-screen.png" width="250" alt="User Profile" />
<img src="./screenshots/support-screen.png" width="250" alt="Support Center" />

*Complete user management and support system*

</div>

---

## 🚀 Features

### 🎯 **Core Functionality**
- **🔐 Secure Authentication** - JWT-based login/signup with guest mode
- **📦 Clearing Management** - Streamlined customs clearing processes
- **🚚 Logistics Coordination** - Real-time logistics and transportation management
- **📋 Customs Documentation** - Digital customs forms and compliance tracking
- **📞 Integrated Support** - Built-in customer support and communication

### 🎨 **Design Excellence**
- **✨ Glassmorphism UI** - Modern glass-effect design language
- **🌈 Gradient Themes** - Beautiful linear gradients and visual hierarchy
- **📱 Responsive Layout** - Optimized for all screen sizes
- **🔄 Smooth Animations** - Fluid transitions and micro-interactions

### 🔧 **Technical Features**
- **🔒 Secure Storage** - Encrypted local data storage with Expo SecureStore
- **🌐 REST API Integration** - Full-featured backend API connectivity
- **📱 Cross-Platform** - iOS, Android, and Web support
- **⚡ Performance Optimized** - Efficient state management and rendering

---

## 🏗️ Tech Stack

<div align="center">

| Frontend | Backend | Tools & Services |
|----------|---------|------------------|
| ![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) | ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) | ![Expo](https://img.shields.io/badge/Expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37) |
| ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) | ![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge) | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white) |
| ![Expo Blur](https://img.shields.io/badge/Expo_Blur-000020?style=for-the-badge&logo=expo) | ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens) | ![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white) |

</div>

### 📚 **Key Dependencies**
```json
{
  "react-native": "0.81.5",
  "expo": "~54.0.34",
  "expo-blur": "^56.0.3",
  "expo-linear-gradient": "~15.0.8",
  "expo-secure-store": "^57.0.0",
  "@react-native-async-storage/async-storage": "^3.1.1",
  "axios": "^1.18.1"
}
```

---

## ⚡ Getting Started

### 📋 **Prerequisites**
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator or Android Emulator (optional)

### 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/otikanelson/CFC-freight.git
   cd Freight
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Run on your preferred platform**
   ```bash
   # iOS
   npm run ios
   
   # Android
   npm run android
   
   # Web
   npm run web
   ```

### 🔙 **Backend Setup**
1. **Navigate to backend directory**
   ```bash
   cd freight-backend
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Add your database and JWT configurations
   ```

4. **Start the backend server**
   ```bash
   npm run dev
   ```

---

## 🌐 Deployment

### 📱 **Mobile App**
The app is built with Expo and can be deployed to:
- **📱 App Store** - iOS deployment via EAS Build
- **🤖 Google Play Store** - Android deployment via EAS Build
- **🌐 Web** - Hosted on Vercel or Netlify

### 🔙 **Backend API**
The backend is deployed on **Vercel** with serverless functions:
- **🚀 Production**: [https://your-app.vercel.app](https://your-app.vercel.app)
- **📊 Health Check**: `/health`
- **🔐 API Endpoints**: `/api/auth/*`

---

## 📁 Project Structure

```
Freight/
├── 📱 App.tsx                 # Main app component
├── 📁 screens/                # Screen components
│   ├── AuthScreen.tsx
│   ├── HomeScreen.tsx
│   ├── ProfileScreen.tsx
│   └── SupportScreen.tsx
├── 🧩 components/             # Reusable components
│   ├── AppNavigator.tsx
│   ├── GlassCard.tsx
│   ├── LoginForm.tsx
│   └── SignUpForm.tsx
├── 🔧 services/               # API and storage services
│   ├── api.ts
│   ├── authService.ts
│   └── storageService.ts
├── 🎨 assets/                 # Images and icons
├── 🔙 freight-backend/        # Backend API
│   ├── src/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── config/
│   ├── api/                   # Vercel serverless functions
│   └── vercel.json            # Deployment configuration
└── 📄 README.md
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

---

## 📄 License

This project is licensed under the **ISC License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Developer

<div align="center">

**Otika Nelson**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/otikanelson)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/otikanelson)

</div>

---

## 🙏 Acknowledgments

- **Expo Team** - For the amazing development platform
- **React Native Community** - For continuous support and resources
- **Design Inspiration** - Modern glassmorphism and mobile-first design trends

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ by [Otika Nelson](https://github.com/otikanelson)

</div>