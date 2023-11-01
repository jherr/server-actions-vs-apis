import Fastify from "fastify";
import cors from "@fastify/cors";
import { clerkPlugin, getAuth } from "@clerk/fastify";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL, {});

const fastify = Fastify({
  logger: true,
});
fastify.register(cors, {});
fastify.register(clerkPlugin);

fastify.get("/", async function (request, reply) {
  const { userId } = getAuth(request);

  if (userId) {
    reply.send(
      await sql`SELECT * FROM bookmarks WHERE userId = ${userId} AND active = true`
    );
  }

  reply.send({
    error: "Not logged in",
  });
});

fastify.post("/:slug", async function (request, reply) {
  const { userId } = getAuth(request);

  const { slug } = request.params;

  if (userId && slug) {
    await sql`INSERT INTO bookmarks (userId, slug)
    VALUES(${userId},${slug})
    ON CONFLICT (userId, slug)
    DO UPDATE SET active = NOT bookmarks.active`;

    reply.send(
      await sql`SELECT * FROM bookmarks WHERE userId = ${userId} AND active = true`
    );
  }

  reply.send({
    error: "Not logged in or no slug provided",
  });
});

fastify.listen({ port: 8080 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
