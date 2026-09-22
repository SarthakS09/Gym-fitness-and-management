# Titanium Fitness - Gym & Fitness Management System

A static HTML prototype for the CB Group 13 gym-management synopsis. It includes a public landing page, registration and login flow, plus Member, Trainer and Administrator portals.

## Run locally

Open `public/html_templates/index.html` in a browser. No build process or server is required.

## Pages

- `index.html` - plans and system overview
- `register.html`, `login.html` - member onboarding
- `dashboard.html` - member records, workout and membership
- `trainer.html` - trainer schedule and member plans
- `admin.html` - management overview and payments
- `classes.html` - class discovery and booking

## Four-member GitHub workflow

1. Create an issue before beginning a feature.
2. Each person branches from `main` using `feature/<area>` (for example `feature/member-dashboard`).
3. Commit focused changes using clear messages, push the branch, then open a pull request to `main`.
4. At least one teammate reviews the pull request before merging. Resolve conflicts in your branch, not directly on `main`.

Suggested ownership: Member 1: landing/authentication; Member 2: member portal; Member 3: trainer/classes; Member 4: admin/docs.
