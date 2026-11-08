/**
 * Kunupa Natural Mineral Water - Electron Secure Preload Script
 * Exposes strictly typed, secure IPC endpoints to the renderer window
 */

const { contextBridge, ipcRenderer } = require('electron');

const invoke = async (channel, ...args) => {
  const response = await ipcRenderer.invoke(channel, ...args);
  if (!response || typeof response !== 'object') {
    return response;
  }
  if (response.success === false) {
    throw new Error(response.error || 'An error occurred during backend execution.');
  }
  return response.data !== undefined ? response.data : response;
};

contextBridge.exposeInMainWorld('kunupaAPI', {
  // 1. Auth & Operators
  checkAdmin: () => invoke('auth:checkAdmin'),
  setupInitialAdmin: (data) => invoke('auth:setupInitialAdmin', data),
  login: (username, password) => invoke('auth:login', { username, password }),
  forgotPassword: (data) => invoke('auth:forgotPassword', data),
  listUsers: () => invoke('auth:listUsers'),
  createUser: (currentUser, userData) => invoke('auth:createUser', { currentUser, userData }),
  updateUser: (currentUser, id, userData) => invoke('auth:updateUser', { currentUser, id, userData }),
  resetPassword: (currentUser, userId, newPassword) => invoke('auth:resetPassword', { currentUser, userId, newPassword }),
  getRoles: () => invoke('auth:getRoles'),

  // 2. Dashboard
  getDashboardMetrics: () => invoke('dashboard:getMetrics'),

  // 3. Products & Categories
  getProducts: (options) => invoke('products:getAll', options),
  getProductById: (id) => invoke('products:getById', id),
  getProductBySku: (sku) => invoke('products:getBySku', sku),
  createProduct: (currentUser, productData) => invoke('products:create', { currentUser, productData }),
  updateProduct: (currentUser, id, productData) => invoke('products:update', { currentUser, id, productData }),
  toggleProductStatus: (currentUser, id) => invoke('products:toggleStatus', { currentUser, id }),
  adjustStock: (currentUser, data) => invoke('products:adjustStock', { currentUser, data }),
  getCategories: () => invoke('products:getCategories'),
  createCategory: (currentUser, data) => invoke('products:createCategory', { currentUser, data }),

  // 4. Workers & Operators Records
  getWorkers: (options) => invoke('workers:getAll', options),
  getWorkerById: (id) => invoke('workers:getById', id),
  createWorker: (currentUser, data) => invoke('workers:create', { currentUser, data }),
  updateWorker: (currentUser, id, data) => invoke('workers:update', { currentUser, id, data }),
  toggleWorkerStatus: (currentUser, id) => invoke('workers:toggleStatus', { currentUser, id }),
  getWorkerHistory: (workerId) => invoke('workers:getHistory', workerId),

  // 5. Stock Allocations & Movements
  getAllocations: (options) => invoke('stock:getAllocations', options),
  allocateStock: (currentUser, data) => invoke('stock:allocate', { currentUser, data }),
  reconcileAllocation: (currentUser, data) => invoke('stock:reconcile', { currentUser, data }),
  getStockMovements: (options) => invoke('stock:getMovements', options),

  // 6. Daily Workers' Sales Spreadsheet
  getDailyRegister: (date) => invoke('dailySales:getRegister', date),
  saveDailyRecords: (currentUser, payload) => invoke('dailySales:save', { currentUser, payload }),
  finaliseDailyRecords: (currentUser, payload) => invoke('dailySales:finalise', { currentUser, payload }),
  getRegistersList: (options) => invoke('dailySales:getRegistersList', options),
  getUnenteredWorkers: (date) => invoke('dailySales:getUnenteredWorkers', date),

  // 7. Point of Sale (POS)
  createSale: (currentUser, saleData) => invoke('pos:createSale', { currentUser, saleData }),
  getSales: (options) => invoke('pos:getSales', options),
  getSaleDetails: (saleId) => invoke('pos:getSaleDetails', saleId),
  reverseSale: (currentUser, saleId, reason) => invoke('pos:reverseSale', { currentUser, saleId, reason }),

  // 8. Suppliers, Purchases & Payments
  getSuppliers: (options) => invoke('suppliers:getAll', options),
  createSupplier: (currentUser, data) => invoke('suppliers:create', { currentUser, data }),
  updateSupplier: (currentUser, id, data) => invoke('suppliers:update', { currentUser, id, data }),
  getPurchases: (options) => invoke('purchases:getAll', options),
  getPurchaseDetails: (purchaseId) => invoke('purchases:getDetails', purchaseId),
  createPurchase: (currentUser, payload) => invoke('purchases:create', { currentUser, payload }),
  receivePurchase: (currentUser, purchaseId) => invoke('purchases:receive', { currentUser, purchaseId }),
  createPayment: (currentUser, data) => invoke('payments:create', { currentUser, data }),
  getPayments: (options) => invoke('payments:getAll', options),

  // 9. Expenses
  getExpenses: (options) => invoke('expenses:getAll', options),
  createExpense: (currentUser, data) => invoke('expenses:create', { currentUser, data }),
  deleteExpense: (currentUser, id) => invoke('expenses:delete', { currentUser, id }),

  // 10. Reports
  getSalesSummaryReport: (options) => invoke('reports:getSalesSummary', options),
  getSalesByWorkerReport: (options) => invoke('reports:getSalesByWorker', options),
  getSalesByProductReport: (options) => invoke('reports:getSalesByProduct', options),
  getProfitLossReport: (options) => invoke('reports:getProfitLoss', options),
  getAuditLogs: (options) => invoke('reports:getAuditLogs', options),

  // 11. ExcelJS Exports & Imports
  exportDailySales: (registerDate) => invoke('excel:exportDailySales', registerDate),
  exportWorkers: () => invoke('excel:exportWorkers'),
  exportInventory: () => invoke('excel:exportInventory'),
  generateWorkerTemplate: () => invoke('excel:generateWorkerTemplate'),
  importWorkers: (currentUser) => invoke('excel:importWorkers', { currentUser }),
  commitWorkerImport: (currentUser, workers) => invoke('excel:commitWorkerImport', { currentUser, workers }),

  // 12. Settings & Database Backup/Restore
  getSettings: () => invoke('settings:get'),
  updateSettings: (currentUser, settings) => invoke('settings:update', { currentUser, settings }),
  backupDatabase: (currentUser) => invoke('settings:backup', { currentUser }),
  restoreDatabase: (currentUser) => invoke('settings:restore', { currentUser }),

  // 13. System Utilities
  printReceipt: () => invoke('window:printReceipt')
});
