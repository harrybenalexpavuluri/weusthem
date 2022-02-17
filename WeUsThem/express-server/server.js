const express = require('express')
const cors = require('cors')
const contactsRouter = require('./routes/contacts')

require('dotenv').config()

const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());

app.use(express.json());

app.use('/contacts', contactsRouter)

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));