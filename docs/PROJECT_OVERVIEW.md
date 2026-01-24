# BladeRunner — Project Overview

BladeRunner is a carriage control system prototype that combines embedded firmware, command processors, and a web interface. It is designed to demonstrate end-to-end thinking across hardware integration, network messaging, and operator-facing tooling.

## One-line Pitch

A multi-layer carriage control prototype that bridges ESP32 firmware, Java-based control processors, and a Next.js operations UI.

## What Makes It Portfolio-Ready

* Multiple system layers in one repo.
* Clear command-processing flow (`MCP` → `CCP` → `ESP32`).
* A runnable UI (`website/code`) for fast evaluation.
* Documentation that explains the system quickly.

## Suggested Demo Flow (5 minutes)

1. Start the UI locally.
2. Walk through the architecture diagram in the README.
3. Open the Java control processor code and highlight command handling.
4. Point to firmware responsibilities in `ESP/`.
