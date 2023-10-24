import { publicProcedure, router } from "./trpc";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import Database from "better-sqlite3";
import { z } from "zod";

import { todos } from "@/db/schema";
import { eq } from "drizzle-orm";
import { exploreIncomingAttestations, exploreOutgoingAttestations } from "./graphql/requests";

const sqlite = new Database("sqlite.db");
const db = drizzle(sqlite);


// try {
//     migrate(
//         db,
//         {
//             migrationsFolder: "drizzle"
//         }
//     )

// } catch (e) {
//     console.log(e);
// }


export const appRouter = router(
    {
        getTodos: publicProcedure.query(
            async () => {
                return db.select().from(todos).all();
            }
        ),
        addTodo: publicProcedure.input(
            z.string()
        ).mutation(
            async (opts) => {
                db.insert(todos).values(
                    {
                        content: opts.input,
                        done: 0,
                    }
                ).run();

                return true;
            }
        ),

        getAttestations: publicProcedure.query(
            async () => {
                const data = await exploreIncomingAttestations("0xBB60ADaFB45ebbf4CE60799950a39f3dfb3AD2DC", "0x47a5c13d25325ce9923ab417bb362e151422d02d6649cf8a8e873a0e2dba4065", 2);

                return JSON.stringify(Object.fromEntries(data));
            }
        )
        ,
        setDone: publicProcedure.input(
            z.object(
                {
                    id: z.number(),
                    done: z.number(),
                }
            )
        ).mutation(
            async (opts) => {
                db.update(todos).set({
                    done: opts.input.done,

                }).where(eq(todos.id, opts.input.id)).run();
                return true;
            }
        )
    }
)


