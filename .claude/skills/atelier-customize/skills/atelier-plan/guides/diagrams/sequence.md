# Sequence Diagram Guide

## When to Use

Use sequence diagrams when the plan involves:
- **API interactions** — request/response flows between client and server
- **Multi-service communication** — microservice choreography or orchestration
- **User-system interactions** — step-by-step user actions and system responses
- **Authentication/authorization flows** — token exchanges, OAuth handshakes
- **Event-driven workflows** — publish/subscribe or message queue interactions

## Mermaid Syntax

### Basic Structure

````markdown
```mermaid
sequenceDiagram
    participant A as Client
    participant B as Server
    A->>B: Request
    B-->>A: Response
```
````

### Arrow Types

| Syntax | Meaning | Use for |
|--------|---------|---------|
| `->>` | Solid with arrowhead | Synchronous call |
| `-->>` | Dotted with arrowhead | Response / return |
| `--)` | Solid with open arrow | Async message (fire & forget) |
| `--)`  | Dotted with open arrow | Async response / callback |

### Activation Bars

Show when a participant is actively processing:

```
A->>+B: Request      %% activate B
B-->>-A: Response     %% deactivate B
```

### Conditionals and Loops

````markdown
```mermaid
sequenceDiagram
    participant U as User
    participant S as Server
    participant DB as Database

    U->>S: Login request
    alt valid credentials
        S->>DB: Query user
        DB-->>S: User record
        S-->>U: 200 OK + token
    else invalid credentials
        S-->>U: 401 Unauthorized
    end
```
````

````markdown
```mermaid
sequenceDiagram
    participant W as Worker
    participant Q as Queue

    loop Every 5 seconds
        W->>Q: Poll for messages
        Q-->>W: Message batch
        W->>W: Process batch
    end
```
````

### Notes

```
Note over A,B: Shared context
Note right of A: Implementation detail
```

## Examples

### REST API with Auth

````markdown
```mermaid
sequenceDiagram
    participant C as Client
    participant G as API Gateway
    participant A as Auth Service
    participant S as Service

    C->>G: POST /resource (+ JWT)
    G->>A: Validate token
    alt token valid
        A-->>G: User claims
        G->>+S: Forward request
        S-->>-G: 201 Created
        G-->>C: 201 Created
    else token expired
        A-->>G: 401
        G-->>C: 401 Unauthorized
    end
```
````

### WebSocket Handshake

````markdown
```mermaid
sequenceDiagram
    participant C as Client
    participant S as Server

    C->>S: HTTP Upgrade request
    S-->>C: 101 Switching Protocols
    Note over C,S: WebSocket connection established

    loop While connected
        C->>S: Send message
        S--)C: Broadcast to others
    end

    C->>S: Close frame
    S-->>C: Close acknowledgement
```
````

## Tips

- Name participants with short aliases (`participant C as Client`) for readability
- Use activation bars (`+`/`-`) to show processing duration on complex flows
- Keep diagrams to 5-6 participants max — split into multiple diagrams if more
- Use `alt`/`else` for branching, `loop` for repeated interactions, `opt` for optional steps
- Add `Note over` annotations for context that doesn't fit in message labels
