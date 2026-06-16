# User Management Frontend — AdminHub Dashboard

A responsive admin dashboard built with Next.js 15, Material UI v6, and Zustand for managing users and their addresses. Pairs with the backend in the `user-management-backend` repo — that needs to be running for this to do anything useful.

## Prerequisites

- Node.js 18 or later
- npm 9 or later (comes with Node)
- The backend up and reachable (see its README for setup)

## Clone the Project

```bash
git clone https://github.com/OMONDI123/user-management-frontend.git
cd user-management-frontend
```

Same command on Linux, macOS, and Windows.

## Setup & Running — Linux / macOS

```bash
# Copy the environment file
cp .env.local.example .env.local
# Open .env.local and set NEXT_PUBLIC_API_BASE_URL if your backend isn't on port 8080

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app runs at http://localhost:3000

For a production build:
```bash
npm run build
npm start
```

## Setup & Running — Windows

Use PowerShell or Command Prompt — Git Bash sometimes causes path issues with npm scripts here.

```cmd
:: Copy the environment file
copy .env.local.example .env.local
:: Open .env.local in Notepad and set NEXT_PUBLIC_API_BASE_URL if needed

:: Install dependencies
npm install

:: Start the dev server
npm run dev
```

The app runs at http://localhost:3000

If `npm` isn't recognized, Node wasn't added to your PATH during install. Reinstall Node with "Add to PATH" checked, then open a fresh terminal window.

## Environment Configuration

Create `.env.local` in the project root, or copy `.env.local.example`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
```

Change the port to match wherever the backend is actually running.

## Running the Backend Alongside This

From the backend project directory:
```bash
./mvnw spring-boot:run       # Linux/macOS
mvnw.cmd spring-boot:run     # Windows
```

CORS is already open on the backend side (`@CrossOrigin(origins = "*")`), so there's nothing extra to configure for that.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (fonts, ThemeRegistry)
│   ├── ThemeRegistry.tsx       # MUI theme provider (client)
│   ├── page.tsx                # Dashboard home page
│   └── users/
│       ├── page.tsx            # User list page
│       └── [userId]/
│           └── page.tsx        # User detail + address management
├── components/
│   ├── layout/                 # DashboardLayout, Sidebar, TopBar
│   ├── users/                  # UsersTable, UserFiltersBar, UserDialog
│   ├── addresses/               # AddressCard, AddressDialog
│   └── ui/                     # StatusChip, RoleChip
├── hooks/
│   └── useUsers.ts             # Bootstrap enums + filter-driven fetch
├── lib/
│   └── theme.ts                # MUI theme configuration
├── services/
│   └── userService.ts          # All API calls (typed)
├── store/
│   └── userStore.ts            # Zustand global store
└── types/
    └── index.ts                # TypeScript interfaces matching backend DTOs
```

## How the User → Address Flow Works

Navigation is two levels: `/users` shows a paginated table of everyone, and clicking the eye icon on a row takes you to `/users/[userId]` — a profile page with that user's addresses laid out as cards.

Each card has edit/delete actions, and the primary address gets a small marker and sorts to the top. Edits update local state right away, then get pushed to the backend via `POST /users/createOrUpdateUser` with the complete address array — the backend treats whatever array it receives as the full, current set of addresses, so there's no partial-update endpoint by design.

State lives in one Zustand store (`userStore.ts`): the current page of users, the active filters, the role/status enum lists fetched once on mount, and loading/error flags. The `useUsers` hook wires filter changes to refetches automatically, so components just read from the store.

## API Endpoints Used

- `POST /users/createOrUpdateUser` — create or update a user, including addresses
- `GET /users/getUsersByStatus` — paginated users filtered by status
- `GET /users/getUsersByStatusAndRole` — paginated users filtered by status and role
- `GET /users/getRoleEnum` — available roles
- `GET /users/getStatus` — available statuses

## Tech Stack

Next.js 15 (App Router), Material UI v6, Zustand v5, TypeScript 5, MUI's `sx` prop with Emotion for styling, `@mui/icons-material` for icons, Inter font from Google Fonts.

## Notes

- The `phoneNumer` field (single "b") is intentional — it matches a typo already in the backend's DTO, not a bug here.
- If the backend is briefly unreachable, the role/status dropdowns fall back to a small hardcoded list so the UI doesn't just break.
- API calls are typed end-to-end, from `types/index.ts` through `services/userService.ts`, the store, and into the components.