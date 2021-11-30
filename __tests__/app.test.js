const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const app = require("../app.js");
const request = require("supertest");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/categories", () => {
  test("200 || return an object containing an array of categories and their descriptions", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({ body }) => {
        expect(body.categories).toBeInstanceOf(Array);
        body.categories.forEach((category) => {
          expect(category).toEqual(
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String),
            })
          );
        });
      });
  });
});

describe("GET || /api/reviews/:review_id", () => {
  test("200 || return an object containing review properties of the review_id passed in", () => {
    return request(app)
      .get("/api/reviews/5")
      .expect(200)
      .then(({ body }) => {
        expect(body.review).toBeInstanceOf(Array);
        body.review.forEach((review) => {
          expect(review).toEqual(
            expect.objectContaining({
              owner: expect.any(String),
              title: expect.any(String),
              review_id: expect.any(Number),
              designer: expect.any(String),
              review_img_url: expect.any(String),
              category: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              comment_count: expect.any(Number),
            })
          );
        });
      });
  });
  test("400 || returns a bad request when review_id is invalid", () => {
    return request(app)
      .get("/api/reviews/pineapple")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad request :(");
      });
  });
  test("404 || returns error message when review_id is a valid input but doesn't exist", () => {
    return request(app)
      .get("/api/reviews/3467")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Path not found");
      });
  });
});
