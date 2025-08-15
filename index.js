require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    console.log(req)
    console.log(res)
	res.json({ status: 'ok' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});


