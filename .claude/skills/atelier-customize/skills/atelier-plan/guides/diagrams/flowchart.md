# Flowchart Diagram Guide

## When to Use

Use flowcharts when the plan involves:
- **Decision trees** — branching logic based on conditions
- **Process flows** — multi-step workflows with a clear start and end
- **State machines** — transitions between discrete states
- **Error handling paths** — happy path vs failure scenarios
- **User flows** — step-by-step navigation through an interface

## Mermaid Syntax

### Basic Structure

````markdown
```mermaid
flowchart TD
    A[Start] --> B{Decision?}
    B -->|Yes| C[Action 1]
    B -->|No| D[Action 2]
    C --> E[End]
    D --> E
```
````

### Direction

- `TD` or `TB` — top to bottom (default, best for most flows)
- `LR` — left to right (good for pipelines or timelines)

### Node Shapes

| Syntax | Shape | Use for |
|--------|-------|---------|
| `A[text]` | Rectangle | Actions, steps |
| `A{text}` | Diamond | Decisions, conditions |
| `A([text])` | Stadium | Start/end points |
| `A[(text)]` | Cylinder | Databases, storage |
| `A[[text]]` | Subroutine | Sub-processes |

### Edge Labels

```
A -->|label| B     %% labeled arrow
A -.->|label| B    %% dotted arrow (optional paths)
A ==>|label| B     %% thick arrow (primary path)
```

### Subgraphs

Use subgraphs to group related steps:

````markdown
```mermaid
flowchart TD
    subgraph auth[Authentication]
        A[Request] --> B{Valid token?}
        B -->|Yes| C[Authorize]
        B -->|No| D[Reject]
    end
    subgraph process[Processing]
        C --> E[Handle request]
        E --> F[Return response]
    end
```
````

## Examples

### Feature Toggle Flow

````markdown
```mermaid
flowchart TD
    A([User action]) --> B{Feature flag enabled?}
    B -->|Yes| C[Load new experience]
    B -->|No| D[Load legacy experience]
    C --> E{A/B test variant?}
    E -->|Control| F[Show default]
    E -->|Treatment| G[Show variant]
    D --> H([Render page])
    F --> H
    G --> H
```
````

### Error Handling Flow

````markdown
```mermaid
flowchart TD
    A[API Request] --> B{Validate input}
    B -->|Invalid| C[Return 400]
    B -->|Valid| D[Process request]
    D --> E{Success?}
    E -->|Yes| F[Return 200]
    E -->|No| G{Retryable?}
    G -->|Yes| H[Queue retry]
    G -->|No| I[Return 500]
    H -.-> D
```
````

## Tips

- Keep flowcharts under 15 nodes — split into multiple diagrams if larger
- Use subgraphs to visually group phases or bounded contexts
- Label edges on decision nodes to make the logic self-documenting
- Use dotted arrows (`-.->`) for optional or retry paths
- Prefer top-down layout for sequential flows, left-right for pipelines
