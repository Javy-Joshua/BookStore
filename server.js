const app = require('./app')
const db = require('./db')

const port =  process.env.PORT || 5000

db.connect()

app.listen(port, () => console.log(`we are listening to port: ${port}`))