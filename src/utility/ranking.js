const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * Get Rankings for specific liftType
 * Returns users sorted by their best visible PR in that category
 * @param {string} liftType
 * @returns {Array} Array of ranking objects: { rank, userId, bestPR }
 */

async function getRankingByLiftTypeAndGym(gymId, liftType) {
  // Step 1: Get all visible PRs of users from that gym and lift type
  const prs = await prisma.pR.findMany({
    where: {
      user: {
        gymId: gymId,
      },
      liftType: liftType,
      visibility: true,
    },
    include: { user: true },
    orderBy: { weightKg: "desc" },
  });

  // Step 2: Reduce to best PR per user
  const userBestPrMap = new Map();
  for (const pr of prs) {
    if (!userBestPrMap.has(pr.userId)) {
      userBestPrMap.set(pr.userId, pr);
    }
  }

  const rankedUsers = Array.from(userBestPrMap.values());

  // Step 3: Sort again to ensure ranking is correct
  rankedUsers.sort((a, b) => b.weightKg - a.weightKg);

  // Step 4: Assign rank
  let rank = 1;
  let lastWeight = null;
  rankedUsers.forEach((pr, i) => {
    if (lastWeight !== null && pr.weightKg < lastWeight) {
      rank = i + 1;
    }
    pr.rank = rank;
    lastWeight = pr.weightKg;
  });

  return rankedUsers;
}


async function getRankingByLiftType(liftType){
    // Step 1: Get all PRs for the category where visibility = true
    const prs = await prisma.pR.findMany({
        where: {
            liftType,
            visibility: true,
        },
        orderBy: {
            weightKg: 'desc', // Highest PR First
        },
        include: {
            user: true,
        },
    });

    // Step 2: Reduce to one best PR per user
    const userBestPrMap = new Map();

    for (const pr of prs) {
        if (!userBestPrMap.has(pr.userId))
            userBestPrMap.set(pr.userId, pr);
    }
    
    // Step 3: Convert map to array and assign ranks
    const rankedUsers = Array.from(userBestPrMap.values());

    // Sort by weightKg desc to be safe (although already sorted)
    rankedUsers.sort((a, b) => b.weightKg - a.weightKg);

    // Step 4: Assign rank, handle ties if you want (optional)
    let rank = 1;
    let lastWeight = null;
    rankedUsers.forEach((pr, i) => {
        if (lastWeight !== null && pr.weightKg < lastWeight)
            rank = i + 1; // FIX: i++ returns i, then increments i - this is incorrect.
        pr.rank = rank;
        lastWeight = pr.weightKg;
    });

    return rankedUsers;
}

module.exports = { 
    getRankingByLiftType,
    getRankingByLiftTypeAndGym
 };