<!--
Short, focused instructions for AI code assistants working in this repository.
Keep this file concise (20–50 lines) and reference concrete files/locations.
-->
# Copilot instructions for this repository

Quick context
- Full-stack personal investments app: Django REST backend in `backend/` and React frontend in `frontend/`.
- Backend provides JWT auth (Simple JWT) and REST endpoints under `/api/`.

What to prioritize
- Preserve authentication flow: backend uses `rest_framework_simplejwt` configured in `backend/investment/settings.py`. Token endpoints: `/api/token/` and `/api/token/refresh/`.
- Ensure DRF ViewSets keep user scoping: see `backend/portfolio/views.py` — `TransactionViewSet.get_queryset()` filters by `request.user` and `PortfolioViewSet.summary()` computes weighted avg cost and must only use the logged-in user's transactions.
- External price fetching is stubbed in `AssetViewSet.get_latest_price()` — replace with real API calls carefully and maintain the current fallback behavior for tests.

Project-specific patterns and conventions
- Models: `Asset` and `Transaction` live in `backend/portfolio/models.py`. Numeric fields use `DecimalField`; preserve Decimal math in back-end calculations (avoid floating-point rounding errors).
- Serializers: DRF serializers expose read-only aggregated fields (e.g., `total_value`, `asset_ticker`) — match these when extending endpoints (`backend/portfolio/serializers.py`).
- Frontend services: `frontend/src/services/api.js` centralizes API base URL (`http://localhost:8000`) and axios interceptors for access + refresh tokens. Update interceptors here when changing auth behavior.
- Auth context: `frontend/src/context/AuthContext.js` manages localStorage tokens and must stay compatible with token keys `token` and `refreshToken` used across the app.
- UI uses simulated/mock data in many components (e.g., `frontend/src/components/Dashboard/Portfolio.js`) — verify whether mock data should be kept or removed when connecting to live endpoints.

Build / run / debug notes
- Backend (Windows PowerShell):
  cd backend; python -m venv venv; venv\Scripts\activate; pip install -r requirements.txt; python manage.py migrate; python manage.py runserver
- Frontend (Windows PowerShell):
  cd frontend; npm install; npm start
- Backend DB: sqlite by default (see `DATABASES` in `backend/investment/settings.py`). Use `python manage.py createsuperuser` to create admin.

Testing and checks
- There are no automated tests present in the repo. When adding tests:
  - Backend: use Django's TestCase and create users with `django.contrib.auth.models.User` to test permission scoping (see `TransactionViewSet.get_queryset`).
  - Frontend: rely on existing React Testing Library devDependencies in `frontend/package.json`.

Quick examples (copyable patterns)
- Ensure transaction queries are user-scoped (backend):
  Transaction.objects.filter(user=self.request.user).order_by('-date')
- Axios token-refresh pattern (frontend):
  api.post('/api/token/refresh/', { refresh: refreshToken }) then update `localStorage.token` and retry original request.

Common pitfalls to avoid
- Do not assume floats for money calculations in backend — use Decimal and keep conversions explicit before serializing.
- When adding endpoints that return portfolio metrics, reuse `PortfolioSerializer` pattern that validates aggregated JSON shape.
- CORS is open (`CORS_ALLOW_ALL_ORIGINS = True`) in settings for development — do not keep this in production.

Where to look first
- backend/portfolio/views.py — business logic for portfolio summary and transaction scoping
- backend/portfolio/serializers.py — output shapes expected by the frontend
- frontend/src/services/api.js and frontend/src/context/AuthContext.js — API integration and auth token lifecycle
- README.md — project-level dev/run commands and high-level endpoints

If anything is unclear
- Ask for the intended environment (prod vs dev), the real data source for prices, or whether mock data in React should be removed.
