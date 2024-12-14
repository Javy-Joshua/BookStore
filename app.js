const express = require("express")
const morgan = require("morgan");
const bookRouter = require("./router/books")
const authorRouter = require("./router/author.router")
const rateLimiter = require("express-rate-limit")
const helmet = require("helmet")
const { requiresAuth } = require("express-openid-connect");
const auth0Middleware = require('./auth/auth0')




const app = express();
app.use(morgan("dev"));
app.use(express.json()) //body parser
app.use(express.urlencoded({ extended: true}))  //body parser: form data
app.use(auth0Middleware)

const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
}); 
app.use(limiter)

app.use(helmet())  //security middleware

app.get("/", (req, res) => {
  res.send("Hello Bookstore");
});

app.use("/api/v1/books", requiresAuth(), bookRouter);
app.use("/api/v1/authors", requiresAuth(), authorRouter)


// error handler middleware
app.use((err, req, res, next) => {
    // Logger.error(err.message)

    console.log(err)
    const errorStatus = err.status || 500
    res.status(errorStatus).send(err.message)
    next()
})

module.exports = app; 