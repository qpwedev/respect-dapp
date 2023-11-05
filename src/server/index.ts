import { publicProcedure, router } from "./trpc";
import { z } from "zod";

import { exploreAllAttestations } from "./graphql/getAddressRespectAttestations";
import { matchEthAddress } from "@/app/_utils/matchEthAddress";
import { getAddressLinks } from "./graphql/getAddressLinks";

export const appRouter = router({
  getAttestations: publicProcedure.input(z.string()).query(async (opts) => {
    if (!matchEthAddress(opts.input)) {
      return null;
    }

    const data = await exploreAllAttestations(
      opts.input,
      "0x7644469043E6CE9F4D288DCF021AA6F9022075E15F6746FDFED8C8EBEED558EE",
      4,
    );

    return data;
  }),

  getAddressLinks: publicProcedure.input(z.string()).query(async (opts) => {
    if (!matchEthAddress(opts.input)) {
      return null;
    }

    const data = await getAddressLinks(
      opts.input,
    );

    return data;
  }),
});

export type AppRouter = typeof appRouter;
