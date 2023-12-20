import express from "express";
import booksRoutes from "./booksRoutes.js";
import authorsRoutes from "./authorRoutes.js";

const routes = (app) => {
    app.route("/").get((req, res) => res.status(200).send("Welcome to books api"));

    app.use(express.json(), booksRoutes, authorsRoutes);
};

export default routes;