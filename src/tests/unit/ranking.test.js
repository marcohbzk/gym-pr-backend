// Mock Prisma client so no real DB is needed
jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => {
      return {
        pR: {
          findMany: jest.fn().mockResolvedValue([
            // Mock PR data — note multiple entries per user for testing best PR selection
            { userId: 'user1', weightKg: 110, liftType: 'bench', visibility: true, user: { name: 'User One' } },
            { userId: 'user2', weightKg: 90, liftType: 'bench', visibility: true, user: { name: 'User Two' } },
            { userId: 'user1', weightKg: 100, liftType: 'bench', visibility: true, user: { name: 'User One' } },
            { userId: 'user3', weightKg: 95, liftType: 'bench', visibility: true, user: { name: 'User Three' } },
            { userId: 'user4', weightKg: 110, liftType: 'bench', visibility: true, user: { name: 'User Four' } },
          ]),
        },
      };
    }),
  };
});

const { getRankingByLiftType } = require('../../utility/ranking');

describe('getRankingByLiftType', () => {
  test('returns users ranked by their best visible PR with correct ranks', async () => {
    const rankings = await getRankingByLiftType('bench');

    // Should return only one best PR per user
    expect(rankings.length).toBe(4);

    // Sorted descending by weightKg
    expect(rankings[0].weightKg).toBe(110);
    expect(rankings[1].weightKg).toBe(110);
    expect(rankings[2].weightKg).toBe(95);
    expect(rankings[3].weightKg).toBe(90);

    // Users with same best PR weight get the same rank (ties)
    expect(rankings[0].rank).toBe(1);
    expect(rankings[1].rank).toBe(1);

    // Next rank increments properly after tie
    expect(rankings[2].rank).toBe(3);
    expect(rankings[3].rank).toBe(4);

    // Each ranking object should have userId and user info (due to prisma include)
    expect(rankings[0]).toHaveProperty('userId');
    expect(rankings[0]).toHaveProperty('user');
    expect(rankings[0].user).toHaveProperty('name');
  });
});
