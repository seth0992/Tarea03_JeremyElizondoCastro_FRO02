const express = require("express");
const axios = require("axios");

const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Hola mundo!</h1>");
});

app.get("/postsComments/:idUsuario", async (req, res) => {
  try {
    const idUsuario = req.params.idUsuario;

    // Obtiene todos los posts del api
    const postsAll = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    // obtiene solo los post de un usuario en especifico.
    const postsUser = postsAll.data.filter((post) => post.userId == idUsuario);

    // Obtiene todos los comentarios del api
    const commentsAll = await axios.get(
      "https://jsonplaceholder.typicode.com/comments"
    );
    // Obtiene unicamente los post y los comentarios de cada post del usuario especificado
    const commentsUser = postsUser.map((post) => ({
      ...post,
      comments: commentsAll.data.filter((comment) => comment.postId == post.id), // Obtiene los comentarios de un post de un usuario
    }));

    res.send(commentsUser);
  } catch (error) {
    console.error(error);
  }
});

app.listen(3000);

// app.listen(3000, () => {
//   console.log("Servidor iniciado en puerto 3000...");
// });

module.exports = app;
