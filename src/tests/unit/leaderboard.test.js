// leaderboard.test.js
const request = require('supertest');
const express = require('express');
const lbRouter = require('../../routes/leaderboard');

jest.mock('../../utility/ranking', () => ({
  getRankingByLiftType: jest.fn(),
}));

const { getRankingByLiftType } = require('../../utility/ranking');

const app = express();
app.use('/leaderboard', lbRouter);

describe('GET /leaderboard/:liftType', () => {
  it('should return rankings json', async () => {
    // Arrange
    const mockRankings = [
      { userId: 'u1', weightKg: 200, rank: 1 },
      { userId: 'u2', weightKg: 180, rank: 2 },
    ];
    getRankingByLiftType.mockResolvedValue(mockRankings);

    // Act
    const res = await request(app).get('/leaderboard/squat');

    // Assert
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockRankings);
    expect(getRankingByLiftType).toHaveBeenCalledWith('squat');
  });

  it('should return 500 if an error occurs', async () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {}); // Useful for deliberate console errors
    getRankingByLiftType.mockRejectedValue(new Error('DB failure'));

    const res = await request(app).get('/leaderboard/squat');

    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty('error', 'Internal Server Error');
    errorSpy.mockRestore();
  });
});

