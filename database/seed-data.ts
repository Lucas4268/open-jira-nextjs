
interface SeedData {
  entries: SeedEntry[]
}

interface SeedEntry {
  description: string,
  status: string,
  createdAt: number
}


export const seedData: SeedData = {
  entries: [
    {
      description: 'Pendiente: Lorem imponafb ib iwabf wbifbw dew',
      status: 'pending',
      createdAt: Date.now()
    },
    {
      description: 'En progreso: Lorem imponaceawewfb ib faffwa wbifbw dew',
      status: 'in-progress',
      createdAt: Date.now() - 1000000
    },
    {
      description: 'Finalizada: Lor dwf fwbfiqp qib ib iwabf wbifbw dew',
      status: 'finished',
      createdAt: Date.now() - 100000
    },
  ]
}

