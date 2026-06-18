# Mobile Demo Workflow Configuration

Fill out the options below before running the `mobile-demo-workflow`. This replaces interactive prompts so the workflow runs end-to-end without interruption.

---

## Design Source

```
design_source: tokens-figma
```

---

## Figma URL (required only if design_source is `tokens-figma`)

```
figma_url: https://www.figma.com/design/hX81g0SnkZ0Hzk7qG5PqBd/I-ON-UI?node-id=48-627&p=f&m=dev
```

## WBS CSV File Path

```
wbs_csv: docs/I-ON - WBS Vibe Coding(WBS for Vibe Coding).csv
```

---

## Technical Configuration

### Mobile

| Category | Technology |
| --- | --- |
| TechStack | React Native Expo + TypeScript |
| User Roles | Follow roles defined in features |
| UI Framework | Gluestack UI |
| State Management | Redux Toolkit |
| Form Control | React Hook Form + Zod |
| Networking | TanStack Query + Axios |
| Middleware | Axios interceptors + request/response logging |
| Navigation | Expo Router |
| Push Notifications | Expo Notifications |
| Design Style | Follow market trends |
| Code Quality | ESLint, Prettier, Husky |
| Testing | Jest + React Testing Library |

---

## Firebase Hosting Deploy

```
firebase_deploy: yes
```

---

## Firebase Domain (required only if firebase_deploy is `yes`)

```
firebase_domain: i-on-app
firebase_project_id: 1453a23b-a0de-491b-b6c2-cc548c0147a3
```
