# 🏪 Wi Stall — Market Stall Allocation System

A web-based digital public good designed to bring transparency, efficiency, and accountability to market stall management across Sierra Leone — starting with markets like Big Market, Lumley Market, and Congo Market in Freetown.

Built as the final project for **PROG102 — Principles of Software Engineering**, Limkokwing University of Creative Technology, Sierra Leone.

**🔗 Live Design Preview:** [wi-stall demo (Netlify)](https://6a44e75f07d6570c268f56a3--spiffy-empanada-350f99.netlify.app/)
**🎨 Figma Prototype:** [View on Figma](https://www.figma.com/design/tF2ZlZ04pvzfQUHGLljhYR/Software-Engineering-Project?node-id=0-1&t=rnXX3Hzhw9dQkKZt-1)

> Note: The Netlify link is a static design preview of the UI/UX. The functional system runs on a PHP + MySQL backend (see [Tech Stack](#-tech-stack) below).

---

## 📋 Table of Contents

- [Problem Statement](#-problem-statement)
- [Proposed Solution](#-proposed-solution)
- [Core Modules](#-core-modules)
- [Tech Stack](#-tech-stack)
- [Prototype Screens](#-prototype-screens)
- [System Architecture](#-system-architecture)
- [SDLC Methodology](#-sdlc-methodology)
- [Project Management](#-project-management)
- [Getting Started](#-getting-started)
- [Default Login (Demo)](#-default-login-demo)
- [SDG Relevance](#-sdg-relevance)
- [License](#-license)
- [Project Team](#-project-team)
- [References](#-references)

---

## 🎯 Problem Statement

Market traders in Sierra Leone face a persistent challenge in the fair and transparent allocation of market stalls. Stall allocation is typically managed manually using paper registers, creating opportunities for favoritism, loss of records, and a general lack of accountability. Traders have no formal way to register or track their allocation history, and administrators lack a centralised way to manage registrations, payments, and reports.

## 💡 Proposed Solution

**Wi Stall** is a web-based platform that lets traders register, view available stalls, and apply for allocations — while giving administrators the tools to manage registrations, allocate stalls, track payment status, and generate reports, all from one central system.

## 🧩 Core Modules

The system is built around five core modules identified during requirements analysis:

| Module | Function |
|---|---|
| **Trader Registration** | Sign-up and profile management for traders |
| **Stall Management** | View, search, and filter available stalls by market, size, and status |
| **Allocation Management** | Assign stalls to registered traders and track allocation history |
| **Payment Recording** | Log and track stall-related payments |
| **Report Generation** | Compile trader activity, occupancy, and revenue reports |

## 🛠 Tech Stack

- **Backend:** PHP
- **Database:** MySQL
- **Frontend:** HTML, CSS, JavaScript (vanilla JS, `fetch`-based API calls)
- **Design & Prototyping:** Figma (mobile-first, iPhone 14 Pro Max frame)
- **Version Control:** Git & GitHub

**Design system:**
| Element | Value |
|---|---|
| Primary green | `#1B5E20` |
| Active/success green | `#4CAF50` |
| Occupied/inactive red | `#F44336` |
| Background grey | `#F5F5F5` |
| Border grey | `#E0E0E0` |
| Placeholder text | `#9E9E9E` |
| Font | Poppins / Inter |

## 📱 Prototype Screens

The Figma prototype consists of 10 screens covering the full user journey:

1. Splash / Welcome Screen
2. Login Screen
3. Register Screen
4. Dashboard
5. Trader List
6. Stall List
7. Stall Allocation
8. Allocation History
9. Report Screen
10. Profile / Settings

👉 View the full interactive flow on [Figma](https://www.figma.com/design/tF2ZlZ04pvzfQUHGLljhYR/Software-Engineering-Project?node-id=0-1&t=rnXX3Hzhw9dQkKZt-1) or the [live demo](https://6a44e75f07d6570c268f56a3--spiffy-empanada-350f99.netlify.app/).

## 🏗 System Architecture

Wi Stall follows a **layered web application architecture**:

- Users (traders and administrators) access the system through a web browser.
- The **Web Application layer** routes requests to the appropriate module — Registration, Allocation, or Payment.
- The **Registration Module** handles trader sign-up and profile data.
- The **Allocation Module** manages stall assignment and updates allocation records.
- The **Payment Module** records and links payments to traders and allocations.
- The **Report Generation Module** queries the database to produce activity, occupancy, and revenue reports.
- A central **Database** stores all trader, stall, allocation, and payment records, ensuring consistency across modules.

![System Architecture Diagram](./docs/architecture-diagram.png)
*Figure 1: System Architecture Diagram — Market Stall Allocation System*
<img width="582" height="782" alt="image" src="https://github.com/user-attachments/assets/3469e464-e9df-4e69-af92-62f58b6d5932" />

## 🔄 SDLC Methodology

This project follows the **Waterfall Model**, chosen because the system's requirements were clearly defined and well-understood from the outset — an environment where Waterfall's structured, sequential phases fit better than Agile's iterative, feedback-driven cycles under a fixed academic deadline.

| Phase | Description |
|---|---|
| 1. Requirement Analysis | Gathered needs from traders, administrators, and market authorities |
| 2. System Design | Defined architecture, database structure, and UI (Figma prototype) |
| 3. Implementation | Built Login, Registration, Allocation, Payment, and Report modules |
| 4. Testing | Verified login, allocation workflow, payments, and report generation |
| 5. Deployment | Server configuration, database setup, and documentation |
| 6. Maintenance | Ongoing monitoring, bug fixes, and feature updates |

## 📊 Project Management

### Gantt Chart

The project timeline was planned across six weeks, sequencing each SDLC phase from requirements analysis through deployment.

![Gantt Chart](./docs/gantt-chart.png)
*Figure 2: Project Gantt Chart showing development timeline across six weeks*
<img width="900" height="406" alt="image" src="https://github.com/user-attachments/assets/7ee2d943-f06a-4855-bb4f-671de005e337" />

### Network Diagram

The Network Diagram maps the sequential dependencies between project activities, showing which tasks had to be completed before the next phase could begin.

![Network Diagram](./docs/network-diagram.png)
*Figure 3: Network Diagram showing sequential task dependencies*
<img width="940" height="635" alt="image" src="https://github.com/user-attachments/assets/64f2fad7-2fc8-4558-b46b-26ab7ecff18e" />


### Risk Management

Key risks identified for the project — along with their likelihood, impact, and mitigation strategies — are documented below.

![Risk Management Plan](./docs/risk-management.png)
*Figure 4: Risk Management Plan*
<img width="940" height="910" alt="image" src="https://github.com/user-attachments/assets/26a4e860-8b2d-48df-beaf-fe6a1aa04787" />

## 🚀 Getting Started

### Prerequisites
- PHP 7.4+ and a local server (e.g. XAMPP, WAMP, or `php -S`)
- MySQL/MariaDB
- A modern web browser

### Setup
```bash
# Clone the repository
git clone https://github.com/successor006-png/PROG102_FinalProject.git
cd PROG102_FinalProject

# Import the database schema (see /database folder, if applicable)
# Configure your database credentials in includes/config.php

# Start a local PHP server
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## 🔑 Default Login (Demo)

For grading and demo purposes, a default administrator account is seeded:

```
Email:    admin@marketstall.sl
Password: Admin@1234
```

> ⚠️ For any real deployment, change these credentials immediately and remove them from production builds.

## 🌍 SDG Relevance

Wi Stall aligns directly with **SDG 8: Decent Work and Economic Growth**, supporting:

- Greater transparency and reduced favoritism in stall allocation
- Formalisation of the informal economy through digital trader records
- Improved market revenue collection for local government
- Reduced administrative burden on market management staff

## 📄 License

This project is licensed under the **MIT License** — permitting free use, modification, and distribution, provided the original copyright and license notice are retained. This was chosen to keep the system open and adaptable for other developers, market authorities, or NGOs working in Sierra Leone.

See [`LICENSE`](./LICENSE) for full terms.

## 👥 Project Team

| Name | Student ID |
|---|---|
| Arsiekeh Mansaray | 905005947 |
| Saran Janneh | 905005796 |

**Course:** PROG102 — Principles of Software Engineering
**Class:** BBIT1202 · Semester 2/1
**Lecturer:** Mr. Hassan Mansaray
**Institution:** Limkokwing University of Creative Technology, Sierra Leone

## 📚 References

- Sommerville, I. (2016). *Software Engineering* (10th ed.). Pearson.
- Pressman, R. S., & Maxim, B. R. (2014). *Software Engineering: A Practitioner's Approach* (8th ed.). McGraw-Hill.
- United Nations. (2015). *Sustainable Development Goals: SDG 8 — Decent Work and Economic Growth.* https://sdgs.un.org/goals/goal8
- PROG102 — Principles of Software Engineering Lecture Notes, Limkokwing University of Creative Technology, Sierra Leone, 2026.
-
