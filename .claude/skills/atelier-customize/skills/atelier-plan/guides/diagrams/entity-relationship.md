# Entity-Relationship Diagram Guide

## When to Use

Use ER diagrams when the plan involves:
- **Data models** — defining entities and their attributes
- **Database schemas** — tables, columns, and relationships
- **Domain modeling** — mapping business concepts and associations
- **API resource design** — structuring related resources
- **File format design** — defining structured document schemas

## Mermaid Syntax

### Basic Structure

````markdown
```mermaid
erDiagram
    USER ||--o{ ORDER : places
    ORDER ||--|{ LINE_ITEM : contains
    PRODUCT ||--o{ LINE_ITEM : "appears in"
```
````

### Relationship Cardinality

| Left | Right | Meaning |
|------|-------|---------|
| `\|\|` | `\|\|` | Exactly one to exactly one |
| `\|\|` | `o{` | One to zero or more |
| `\|\|` | `\|{` | One to one or more |
| `o\|` | `o{` | Zero or one to zero or more |

Read left-to-right: `USER ||--o{ ORDER` means "one user places zero or more orders."

### Entity Attributes

````markdown
```mermaid
erDiagram
    USER {
        string id PK
        string email UK
        string name
        datetime created_at
    }
    ORDER {
        string id PK
        string user_id FK
        decimal total
        string status
        datetime placed_at
    }
    USER ||--o{ ORDER : places
```
````

### Attribute Markers

| Marker | Meaning |
|--------|---------|
| `PK` | Primary key |
| `FK` | Foreign key |
| `UK` | Unique key |

## Examples

### Content Management System

````markdown
```mermaid
erDiagram
    WORKSPACE {
        string id PK
        string name
        string owner_id FK
    }
    PROJECT {
        string id PK
        string workspace_id FK
        string name
        string status
    }
    TASK {
        string id PK
        string project_id FK
        string title
        string description
        string status
        int priority
    }
    COMMENT {
        string id PK
        string task_id FK
        string author_id FK
        string body
        datetime created_at
    }
    WORKSPACE ||--|{ PROJECT : contains
    PROJECT ||--o{ TASK : has
    TASK ||--o{ COMMENT : has
```
````

### Many-to-Many with Junction Table

````markdown
```mermaid
erDiagram
    STUDENT {
        string id PK
        string name
    }
    COURSE {
        string id PK
        string title
        int credits
    }
    ENROLLMENT {
        string student_id FK
        string course_id FK
        string grade
        date enrolled_at
    }
    STUDENT ||--o{ ENROLLMENT : "enrolls in"
    COURSE ||--o{ ENROLLMENT : "has"
```
````

## Tips

- Name entities in UPPER_CASE singular nouns (convention for ER diagrams)
- Always include PK/FK markers to clarify key relationships
- Label relationships with a verb phrase (`places`, `contains`, `belongs to`)
- Keep diagrams to 8-10 entities max — split by bounded context if larger
- Include only the attributes relevant to the plan, not exhaustive schemas
- Use junction tables explicitly for many-to-many relationships
