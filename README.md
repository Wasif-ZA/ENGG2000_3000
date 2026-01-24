# BladeRunner — Carriage Control System Prototype

BladeRunner is an end-to-end carriage control prototype that combines ESP32 firmware, Java-based control processors, and a Next.js operations UI.

## Problem / Why

Modern control systems often fail the “demo gap”: the hardware works, but the project is hard to understand, run, and evaluate quickly. BladeRunner aims to close that gap by packaging embedded control logic, processor simulation, and a web interface into a single, reviewable repo.

It is designed for:

* Teams evaluating system-thinking across hardware and software.
* Recruiters and reviewers who need a fast, credible walkthrough.
* Developers who want a clear starting point for extending the project.

## What it does (Features)

* Simulates a carriage control processor (CCP) in Java.
* Encodes and decodes command messages using JSON.
* Models carriage state transitions in a dedicated state manager.
* Provides UDP-based communication handlers for processor messaging.
* Includes ESP32-oriented firmware and hardware integration scaffolding.
* Ships a Next.js UI for a fast, visual project entry point.
* Centralizes architecture notes and engineering decisions in `/docs`.

## Tech Stack

**Frontend**
* Next.js 16
* React 19
* Tailwind CSS

**Backend / Control Layer**
* Java (JDK 11+)
* UDP networking
* `org.json` (via local JAR)

**Embedded / Hardware**
* ESP32 firmware (C/C++ toolchains expected)

**Tools**
* npm / Node.js 20+
* TypeScript
* GitHub Actions (CI for the web UI)

## Architecture Overview

```text
[Operator]
   |
   v
[Next.js UI: website/code]
   |
   v
[Control Processors: CCP / MCP simulations]
   |
   v
[ESP32 Firmware: ESP]
   |
   v
[Physical carriage, doors, sensors]
```

BladeRunner is organized as a multi-layer system:

1. **Operations UI (`website/code/`)** provides a fast, runnable entry point.
2. **Control processors (`CCP/` and related modules)** handle command parsing and state transitions.
3. **ESP32 firmware (`ESP/`)** is responsible for hardware-level execution.

A more detailed write-up is available in [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## How to Run Locally

### Prerequisites

* Node.js 20+ and npm
* Java JDK 11+

### Install

Install the web UI dependencies:

```bash
npm --prefix website/code ci
```

### Run

Start the Next.js operations UI:

```bash
npm --prefix website/code run dev
```

Then open:

* <http://localhost:3000>

### Build / Test Commands

From the repository root:

```bash
npm --prefix website/code run lint
npm --prefix website/code run format
npm --prefix website/code run test
npm --prefix website/code run build
```

To compile the Java control processor locally:

```bash
cd CCP
javac -cp "lib/json-20240303.jar" *.java
```

## Configuration

This repo includes a safe starter env file:

* Copy `.env.example` to `.env` if you need environment variables later.

```bash
cp .env.example .env
```

At the moment, no environment variables are required to run the UI locally.

## Screenshots / Demo

Binary image assets are intentionally not committed in this environment. Use the local dev server for a live demo:

```bash
npm --prefix website/code run dev
```

Then visit <http://localhost:3000>.

## Key Decisions (Engineering)

* Consolidated documentation under `/docs` and moved legacy material to `/docs/legacy`.
* Focused CI on the runnable Next.js surface first to deliver fast feedback.
* Removed generated artifacts like `node_modules/` from version control expectations.
* Standardized root-level hygiene with a repo-wide `.gitignore` and contributor guidance.

See [`docs/DECISIONS.md`](docs/DECISIONS.md) for more detail.

## Roadmap / Next Improvements

* Add CI checks for Java compilation and basic simulation tests.
* Expand the operations UI into a real command console.
* Define a shared message schema between processors and firmware.
* Add real UI screenshots or a demo recording once assets can be hosted externally.
* Add API-level documentation if/when HTTP services are introduced.

## License

This project is licensed under the MIT License. See [`LICENSE`](LICENSE).

## Contact

* GitHub: [@Wasif-ZA](https://github.com/Wasif-ZA)
* LinkedIn: _Add your link here_
* Email: _Add your preferred contact here_
