import { publicProcedure, router } from "./trpc";
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { z } from "zod";

import { todos } from "@/db/schema";
import { eq } from "drizzle-orm";
import { exploreAllAttestations } from "./graphql/requests";

const sqlite = new Database("sqlite.db");
const db = drizzle(sqlite);

export const appRouter = router({
    getTodos: publicProcedure.query(async () => {
        return db.select().from(todos).all();
    }),
    addTodo: publicProcedure.input(z.string()).mutation(async (opts) => {
        db.insert(todos)
            .values({
                content: opts.input,
                done: 0,
            })
            .run();

        return true;
    }),

    getAttestations: publicProcedure.query(async () => {
        const data = await exploreAllAttestations(
            "0xBB60ADaFB45ebbf4CE60799950a39f3dfb3AD2DC",
            "0x7644469043E6CE9F4D288DCF021AA6F9022075E15F6746FDFED8C8EBEED558EE",
            3
        );

        return data;
    }),
    setDone: publicProcedure
        .input(
            z.object({
                id: z.number(),
                done: z.number(),
            })
        )
        .mutation(async (opts) => {
            db.update(todos)
                .set({
                    done: opts.input.done,
                })
                .where(eq(todos.id, opts.input.id))
                .run();
            return true;
        }),
});

export type AppRouter = typeof appRouter;
