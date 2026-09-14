# Schema: Rol_Tramuntana
Database: pgsql
Tables: 11
Columns are NOT NULL unless marked nullable.

## USER
user_id: serial PK
name: varchar
nick: varchar unique nullable
password_hash: varchar
email: varchar unique
phone: int unique
address: varchar nullable
birthdate: date nullable
pronouns: enum nullable
image: varchar nullable

## MASTER
user_id: int PK FK
xp: int
title: varchar

## PLAYER
user_id: int PK FK
xp: int
title: varchar

## SYSTEM
system_id: serial PK
name: varchar
edition: varchar nullable
publisher: varchar nullable
description: text nullable
image: varchar nullable

## USER_SYSTEM
user_id: int FK
system_id: int FK
player_xp: int
master_xp: int

## GAME
game_id: serial PK
master_id: int FK
system_id: int FK
name: varchar
description: text
start_date: date
end_date: date
status: enum

## CHARACTER
char_id: serial PK
user_id: int FK
system_id: int FK
name: varchar
description: text
status: enum

## GAME_CHAR
game_id: int PK FK
char_id: int PK FK

## GAME_PLAYER
game_id: int PK FK
user_id: int PK FK
join_date: date
leave_date: date
status: enum

## SESSION
session_id: serial PK
game_id: int FK
session_num: int
date: date
start_time: time
end_time: time
notes: text

## DEATH
death_id: serial PK
session_id: int FK
char_id: int FK
description: text

## Relationships
USER.user_id → MASTER.user_id (one-to-zero-or-one)
USER.user_id → PLAYER.user_id (one-to-zero-or-one)
USER.user_id → USER_SYSTEM.user_id (one-to-many)
USER.user_id → GAME.master_id (one-to-many)
USER.user_id → GAME_PLAYER.user_id (one-to-many)
USER.user_id → CHARACTER.user_id (one-to-many)

SYSTEM.system_id → USER_SYSTEM.system_id (one-to-many)
SYSTEM.system_id → GAME.system_id (one-to-many)
SYSTEM.system_id → CHARACTER.system_id (one-to-many)

GAME.game_id → GAME_PLAYER.game_id (one-to-many)
GAME.game_id → GAME_CHARACTER.game_id (one-to-many)
GAME.game_id → SESSION.game_id (one-to-many)

CHARACTER.character_id → GAME_CHARACTER.character_id (one-to-many)
CHARACTER.character_id → DEATH.character_id (one-to-many)

SESSION.session_id → DEATH.session_id (one-to-many)

USER ↔ SYSTEM through USER_SYSTEM (many-to-many)
USER ↔ GAME through GAME_PLAYER (many-to-many, as player)
GAME ↔ CHARACTER through GAME_CHARACTER (many-to-many)

---
If you suggest changes to this schema, ALSO return them as a DrawSQL patch: one fenced ```json code block, so I can apply them to my diagram. If you are only answering a question, skip the patch.

Patch rules:
- One JSON object with "strategy": "merge"; combine every change into that single patch.
- Reference tables and columns by name. Only include what changes — omit unchanged columns and unused optional fields.
- Column: {"name","type","length","is_primary_key","is_auto_increment","is_nullable","is_unique_key","is_index","is_unsigned","default","enum_values"} — use exact type names for pgsql as shown in the schema above.
- Relationship: {"type":"one-to-many","source_table":"users","source_column":"id","target_table":"posts","target_column":"user_id"} — for "one-to-many" the source is the "one" side; for "many-to-one" the source is the "many" (foreign-key) side. Prefer "one-to-many".
- Add "default_type" ("string" | "function" | "number" | "boolean") when a default could be misread — a literal string "CURRENT_TIMESTAMP" or "0" needs "default_type":"string".
- SET columns (MySQL) list their members in "set_values", not "enum_values".
- Index: {"indexes":[{"name":"idx_posts_user_created","type":"index","columns":["user_id","created_at"]}]} on its table — "type" is "index" or "unique"; delete via "deletions".
- Group: {"name":"Billing"}. A group never lists its members — put "parent_name":"Billing" on each table that belongs to it.
- Sticky note: {"sticky_notes":[{"content":"..."}]}.
- Delete via "deletions"; rename via "old_name". Do not include left/top coordinates.

Examples:
Add table: `{"strategy":"merge","tables":[{"name":"posts","comment":"Blog posts","columns":[{"name":"id","type":"bigint","is_primary_key":true,"is_auto_increment":true},{"name":"user_id","type":"bigint","is_index":true},{"name":"title","type":"varchar","length":255},{"name":"body","type":"text","is_nullable":true},{"name":"created_at","type":"timestamp","is_nullable":true},{"name":"updated_at","type":"timestamp","is_nullable":true}]}]}`
Rename table and column (use old_name only when renaming): `{"strategy":"merge","tables":[{"name":"articles","old_name":"posts","columns":[{"name":"content","old_name":"body"}]}]}`
Delete: `{"strategy":"merge","deletions":{"tables":["tmp"],"columns":[{"table":"users","columns":["legacy"]}],"relationships":[{"source_table":"users","source_column":"id","target_table":"posts","target_column":"user_id"}]}}`
Multiple groups with nested tables (every table sets parent_name): `{"strategy":"merge","groups":[{"name":"Auth"},{"name":"Content"}],"tables":[{"name":"users","parent_name":"Auth","columns":[{"name":"id","type":"bigint","is_primary_key":true,"is_auto_increment":true}]},{"name":"roles","parent_name":"Auth","columns":[{"name":"id","type":"bigint","is_primary_key":true,"is_auto_increment":true}]},{"name":"posts","parent_name":"Content","columns":[{"name":"id","type":"bigint","is_primary_key":true,"is_auto_increment":true}]}]}`
