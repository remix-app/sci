import { router, publicProcedure } from './_core/trpc'
import { z } from 'zod'

export const appRouter = router({
  health: publicProcedure.query(() => ({
    status: 'ok',
    timestamp: new Date().toISOString(),
  })),

  integrations: router({
    validateTaxId: publicProcedure
      .input(z.object({ taxId: z.string() }))
      .mutation(async ({ input }) => {
        // Simulación de validación de RUT chileno
        const isValid = /^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/.test(input.taxId) || /^\d{7,8}-[\dkK]$/.test(input.taxId);
        return {
          isValid,
          message: isValid ? "RUT validado correctamente" : "RUT inválido",
        };
      }),
  }),

  services: router({
    getVisits: publicProcedure.query(() => [
      { id: 1, name: "Juan Pérez", date: "2025-12-30", status: "scheduled" },
      { id: 2, name: "María García", date: "2025-12-29", status: "completed" },
    ]),
    getIncidents: publicProcedure.query(() => [
      { id: 1, title: "Fuga de agua", status: "open", priority: "high" },
    ]),
    getInsurances: publicProcedure.query(() => [
      { id: 1, type: "Incendio", provider: "Seguros ABC", status: "active" },
    ]),
    getPackages: publicProcedure.query(() => [
      { id: 1, courier: "FedEx", status: "delivered", date: "2025-12-28" },
    ]),
  }),

  payments: router({
    getHistory: publicProcedure.query(() => [
      { id: 1, amount: 50000, date: "2025-11-05", status: "paid" },
    ]),
    getDelinquency: publicProcedure.query(() => [
      { unit: "101", amount: 150000, months: 3 },
    ]),
  }),

  publications: router({
    getAll: publicProcedure.query(() => [
      { id: 1, title: "Asamblea General", date: "2025-12-15", content: "..." },
    ]),
  }),

  property: router({
    getDetails: publicProcedure.query(() => ({
      id: "101",
      owner: "Propietario Demo",
      balance: 0,
    })),
  }),
})

export type AppRouter = typeof appRouter
