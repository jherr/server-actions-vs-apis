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
