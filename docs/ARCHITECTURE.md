# Architecture Overview

BladeRunner is organized as a multi-part system that pairs embedded control logic with supporting simulation and a web-based interface.

## System Context

The repository contains three major areas:

1. **Embedded / hardware-facing logic** in `ESP/`.
2. **Control processors and simulation** in `CCP/`, `Carriage/`, `MVP/`, and `enggg/`.
3. **A Next.js operations UI** in `website/code/`.

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

## Key Modules

### `website/code/` — Operations UI

* Presents project information and control flows.
* Built with Next.js, React, and Tailwind CSS.

### `CCP/` — Carriage Control Processor

* Java-based controller that interprets MCP commands.
* Encodes/decodes messages and manages carriage state.

### `ESP/` — Firmware and device integration

* Contains embedded code intended for the ESP32.
* Responsible for real-time hardware coordination.

## Data Flow (High-Level)

1. The control processor receives a command (e.g., `FSLOWC`, `STOPC`).
2. The processor validates and updates carriage state.
3. Commands are forwarded to the ESP32 for hardware execution.
4. Status updates are sent back upstream to the control layer and UI.

## Operational Notes

* The Java components currently act as the primary integration point for command handling.
* The Next.js UI is a presentation layer and can evolve into a richer operations console over time.
