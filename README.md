# Kunupa Natural Mineral Water - Inventory Management System & POS

An enterprise-grade, offline-first Windows desktop application built for **Kunupa Natural Mineral Water** using HTML5, CSS3, JavaScript, Electron, Node.js, SQLite, and ExcelJS.

---

## 💧 Core Business Features

1. **Brand Identity & Executive Dashboard:**
   - Prominent Kunupa Natural Mineral Water branding with logo integration.
   - Real-time live metrics: Today's sales, today's collected money, outstanding field balances, total warehouse stock, low stock warnings, monthly sales, factory expenses, and estimated net profit.
   - Top-performing distribution workers leaderboard.
   - Active alert list of workers whose daily sales have not been entered today.

2. **Excel-Style Daily Workers' Sales Form:**
   - Multi-worker interactive spreadsheet grid with keyboard navigation.
   - Pre-populates all active workers and carries forward yesterday's closing stock as today's opening stock.
   - Automatic real-time financial math:
     $$\text{Total Stock} = \text{Opening} + \text{Received}$$
     $$\text{Units Sold} = \text{Total Stock} - \text{Closing}$$
     $$\text{Total Sales} = \text{Units Sold} \times \text{Unit Price}$$
     $$\text{Balance} = \text{Total Sales} - \text{Amount Collected}$$
   - Reactive bottom summary row calculating daily register totals.
   - **Save Daily Records** (draft) and **Finalise Daily Records** (locks finalised rows and updates worker cumulative balances).
   - Export genuine `.xlsx` and `.csv` files using ExcelJS.

3. **Workers & Distribution Operators Directory:**
   - Worker ID, Full Name, Phone, Role (Driver/Sales Rep, Tricycle Operator, Storekeeper), Location/Route, and Status.
   - Cumulative sales, money collected, and outstanding balance tracking per worker.
   - Excel template generator and bulk worker import with validation preview.

4. **Direct Point of Sale (POS) Counter:**
   - Product catalog grid with instant stock level badges and category filtering.
   - Cart management, discount adjustment, customer info capture.
   - Multi-payment support: Cash, Mobile Money (MTN, Telecel, AT), Bank Transfer, Credit.
   - Instant change calculation and printable thermal/standard receipt.
   - Automatically deducts warehouse stock and logs audited stock movements.

5. **Stock Allocation & Shift Reconciliation:**
   - Issue warehouse goods to individual delivery drivers and tricycle operators.
   - Reconcile shift returns: unsold units returned to warehouse, damaged items logged, net units sold calculated.

6. **Audited Stock Movements Ledger:**
   - Full historical ledger of all stock changes (`direct_sale`, `worker_allocation`, `worker_return`, `purchase_receipt`, `damage`, `adjustment`, `reversal`).

7. **Purchases, Suppliers & Expenses:**
   - Vendor directory, purchase orders, receiving confirmation (stock increases only upon receiving).
   - Operational expense tracker (fuel, power, water chemicals, sachet rolls, maintenance, wages).

8. **Business Analytics & Reports:**
   - Daily/weekly/monthly sales summaries, sales by worker, sales by product, and Profit & Loss statement.
   - Audited operator activity logs.

9. **Security, User Roles & Offline SQLite Database:**
   - Roles: **Administrator**, **Manager**, and **Sales Operator**.
   - Secure salted password hashing (`bcryptjs`).
   - All financial amounts stored in **integer pesewas** to eliminate rounding errors.
   - Database persisted in Electron's `app.getPath('userData')` so application updates never erase business records.
   - One-click SQLite backup and safe restore with verification.

---

## 🚀 Running the Application Locally

In PowerShell or Command Prompt:

```powershell
# 1. Navigate to the project directory
cd "c:\Users\HomePC\Desktop\kunupa inventory"

# 2. Start the desktop application
npm.cmd start
```

---

## 📦 Building the Windows Installer (`.exe`)

To build the standalone Windows installer and portable executable:

```powershell
# Build the NSIS installer (Kunupa-Inventory-Setup.exe) and portable executable
npm.cmd run build:win
```

The resulting binaries will be located in:
* Installer: `c:\Users\HomePC\Desktop\kunupa inventory\dist\Kunupa-Inventory-Setup.exe`
* Portable: `c:\Users\HomePC\Desktop\kunupa inventory\dist\Kunupa-Inventory-Setup.exe` (or unpackaged in `dist\win-unpacked\`)

---

## 🖼️ Logo Placement

Per branding requirements, copy your logo file into:
```
assets/kunupa-logo.jpeg
```
The application will automatically detect the logo and display it in the header, sidebar, dashboard, and printed receipts. If absent, the interface will display an elegant fallback without throwing errors.

---

## 🔑 Initial Administrator Setup

When running the application for the first time on an empty database:
1. The terminal will automatically prompt for the **Master Administrator Setup**.
2. Enter your Full Name (e.g. Kwame Mensah), Username (e.g. `admin`), Phone, and a password (min. 6 characters).
3. Click **Create Administrator Account** to log in immediately.

---

© 2026 Kunupa Natural Mineral Water. Purity & Health in every drop.
