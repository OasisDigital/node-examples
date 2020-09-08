import app from './app';

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(
    `Example app listening on port ${port}! Find graphiql at http://localhost:${port}/graphiql`
  )
);
