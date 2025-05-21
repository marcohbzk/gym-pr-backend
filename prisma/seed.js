// prisma/seed.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const gyms = [
  {
    name: "Fitness Hut Lisboa - Marquês",
    address: "Rua Mouzinho da Silveira 26, 1250-167 Lisboa, Portugal",
    lat: 38.7257,
    lng: -9.1486,
    placeId: "ChIJSYvW-dYzGQ0RA3O0o_U7YuE"
  },
  {
    name: "Solinca Porto",
    address: "R. Aleixo da Mota 164, 4150-044 Porto, Portugal",
    lat: 41.1580,
    lng: -8.6381,
    placeId: "ChIJ6zTzTSh3JA0RBjJbUvYqktM"
  },
  {
    name: "Fitness UP Coimbra",
    address: "R. do Brasil 77, 3030-175 Coimbra, Portugal",
    lat: 40.2063,
    lng: -8.4137,
    placeId: "ChIJUX0cdczXJQ0RPFoaBBaY1cI"
  },
  {
    name: "Go Fit Benfica",
    address: "R. República da Bolívia 5, 1500-544 Lisboa, Portugal",
    lat: 38.7490,
    lng: -9.2031,
    placeId: "ChIJtV1XYMkyGQ0RPZ7tbJzLKQE"
  }
];

async function main() {
  for (const gym of gyms) {
    await prisma.gym.upsert({
      where: { placeId: gym.placeId },
      update: {},
      create: gym,
    });
  }
  console.log("✅ Seeded gyms");
}

main()
  .catch(e => {
    console.error(e);
    // eslint-disable-next-line
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
