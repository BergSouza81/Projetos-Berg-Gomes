# Restructuring Plan for Investment Platform

## Backend Changes
- [x] Rename backend/investimentos/ to backend/investment/
- [x] Create backend/investment/celery.py (basic Celery setup)
- [x] Create backend/.env (empty file)
- [x] Add missing files to backend/portfolio/: admin.py, apps.py, services.py, and migrations/__init__.py (all empty)
- [x] Create backend/users/ with __init__.py, apps.py, and urls.py (empty)

## Frontend Changes
- [x] Rename frontend/src/contexts/ to frontend/src/context/
- [x] Move frontend/src/components/dashboard/Dashboard.js to frontend/src/components/Dashboard/Dashboard.js
- [x] Create frontend/src/components/Dashboard/PortfolioSummary.js, AllocationChart.js, PerformanceChart.js (empty)
- [x] Move frontend/src/components/transactions/Transactions.js to frontend/src/components/Transactions/TransactionForm.js
- [x] Rename frontend/src/components/auth/ to frontend/src/components/Auth/
- [x] Create frontend/public/index.html (basic HTML template)

## Verification
- [x] Verify the new structure matches the provided tree
- [ ] Run the project to ensure it works
