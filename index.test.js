const app = require("./index");
const request = require("supertest");
const axios = require("axios");

jest.mock("axios");

describe("apiCommentsPost", () => {
  test("commentsXPost", async () => {
    const arrComments = [
      {
        postId: 1,
        id: 1,
        name: "id labore ex et quam laborum",
        email: "Eliseo@gardner.biz",
        body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium",
      },
      {
        postId: 1,
        id: 2,
        name: "quo vero reiciendis velit similique earum",
        email: "Jayne_Kuhic@sydney.com",
        body: "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et",
      },
    ];

    const arrPosts = [
      {
        userId: 1,
        id: 1,
        title:
          "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
      },
    ];

    axios.get.mockImplementation((ruta) => {
      if (ruta === "https://jsonplaceholder.typicode.com/posts") {
        return Promise.resolve({ data: arrPosts });
      } else {
        return Promise.resolve({ data: arrComments });
      }
    });

    const respuesta = await request(app).get("/postsComments/1");
    expect(respuesta.body).toEqual([{ ...arrPosts[0], comments: arrComments }]);
  });

  test("SinCommentsXPost", async () => {
    const arrComments = [
      {
        postId: 1,
        id: 1,
        name: "id labore ex et quam laborum",
        email: "Eliseo@gardner.biz",
        body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium",
      },
      {
        postId: 1,
        id: 2,
        name: "quo vero reiciendis velit similique earum",
        email: "Jayne_Kuhic@sydney.com",
        body: "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et",
      },
    ];

    const arrPosts = [
      {
        userId: 1,
        id: 1,
        title:
          "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
      },
    ];

    axios.get.mockImplementation((ruta) => {
      if (ruta === "https://jsonplaceholder.typicode.com/posts") {
        return Promise.resolve({ data: arrPosts });
      } else {
        return Promise.resolve({ data: arrComments });
      }
    });

    const respuesta = await request(app).get("/postsComments/2");
    expect(respuesta.body).toEqual([]);
  });
});
