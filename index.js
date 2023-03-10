const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const ConnectionDB = require("./database");
const multer = require('./Middleware/multer')

app.use(express.json());
ConnectionDB();

app.use("/api/image", multer.router)
app.use('/api/v1/user', require('./Routes/user'))
app.use('/api/v1/profile', require('./Routes/profile'))
app.use('/api/v1/parent', require('./Routes/parent'))
app.use('/api/v1/owner', require('./Routes/owner'))
app.use('/api/v1/room', require('./Routes/room'))

// app.use('/api/v1/venue', require('./routes/venue'))
// app.use('/api/v1/review', require('./routes/reviews'))
// app.use('/api/v1/razorpay', require('./routes/razorpay'))
// app.use('/api/v1/public', require('./routes/publicNoti'))
// app.use('/api/v1/owner', require('./routes/owner'))
// app.use('/api/v1', require('./routes/cancelAndRefunds'))
// app.use('/api/v1/booking', require('./routes/booking'))
// app.use('/api/v1/configuration', require('./routes/configuration'))



app.listen(port, () => console.log(`Server up and running...at ${port}`))