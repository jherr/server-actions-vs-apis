```sql
CREATE TABLE bookmarks
(
  userId VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  CONSTRAINT constraint_name UNIQUE (userId, slug)
);
```

```ts
fetch("http://localhost:8080/cook-slug", {
  method: "POST",
})
  .then((res) => res.json())
  .then(console.log);
```

`.env` for `slug-city` and `slug-api`:

```env
POSTGRES_URL=postgres://[username]:[password]@127.0.0.1:5432/[database_name]

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_********
CLERK_SECRET_KEY=sk_test_********
```
