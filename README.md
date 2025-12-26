# SIMS PPOB - Eric Wiyanto

## Project Structure
Micro-frontend pattern with react-router.
```
app
├─ app.css
├─ root.tsx
├─ routes.ts
├─ services
│  └─ apiService.ts
├─ src
│  ├─ components
│  │  ├─ Button.tsx
│  │  ├─ ChipButton.tsx
│  │  ├─ GuestNavbar.tsx
│  │  └─ Navbar.tsx
│  ├─ features
│  │  ├─ HomePage.tsx
│  │  ├─ app
│  │  │  ├─ HomePage.tsx
│  │  │  ├─ components
│  │  │  │  ├─ PromotionList.tsx
│  │  │  │  ├─ ServiceContainer.tsx
│  │  │  │  └─ ServiceList.tsx
│  │  │  └─ services
│  │  │     ├─ bannerService.ts
│  │  │     └─ serviceService.ts
│  │  ├─ auth
│  │  │  ├─ AccountPage.tsx
│  │  │  ├─ LoginPage.tsx
│  │  │  ├─ RegisterPage.tsx
│  │  │  ├─ components
│  │  │  │  ├─ AccountContainer.tsx
│  │  │  │  ├─ AccountDetail.tsx
│  │  │  │  ├─ AccountForm.tsx
│  │  │  │  ├─ Banner.tsx
│  │  │  │  ├─ LoginCard.tsx
│  │  │  │  ├─ ProfileCard.tsx
│  │  │  │  └─ RegisterCard.tsx
│  │  │  └─ services
│  │  │     ├─ authService.ts
│  │  │     └─ userService.ts
│  │  ├─ transaction
│  │  │  ├─ ServicePage.tsx
│  │  │  ├─ TransactionPage.tsx
│  │  │  ├─ components
│  │  │  │  └─ TransactionHistoryList.tsx
│  │  │  └─ services
│  │  │     └─ transactionService.ts
│  │  └─ wallet
│  │     ├─ TopUpPage.tsx
│  │     ├─ components
│  │     │  ├─ BalanceCard.tsx
│  │     │  └─ TopupContainer.tsx
│  │     └─ services
│  │        └─ balanceService.ts
│  ├─ layouts
│  │  ├─ ErrorLayout.tsx
│  │  ├─ authLayout.tsx
│  │  └─ guestLayout.tsx
│  ├─ slices
│  │  ├─ accountSlice.ts
│  │  ├─ authSlice.ts
│  │  ├─ servicesSlice.ts
│  │  └─ walletSlice.ts
│  └─ utils
│     └─ formatCurrency.ts
└─ store.ts
```