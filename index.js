const express = require('express');
const path = require('path');
const expressHandlebars = require('express-handlebars');
const mongoose = require('mongoose');
const blogRoute = require('./routes/index');

const app = express();
const port = 5000;

// View Engine
app.set('views', path.join(__dirname, 'views'));

// Membuat helper
const helpers = {
    limitstring: (content, limit) => {
        if (content.length > 100) {
            return content.slice(0, limit) + '...';
        } else {
            return content;
        }
    }
}

app.engine('hbs', expressHandlebars({
    helpers,
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
}))

app.set('view engine', 'hbs');

// Parser Body
app.use(express.urlencoded({ extended: true }));

// Menggunakan router
app.use('/', blogRoute);

// Menghubungkan Mongoose dengan MongoDb Atlas
mongoose.connect("mongodb+srv://aswassaw:aswassaw@cluster0.8ixwj.mongodb.net/simple_blog_express_mongo?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Database berhasil terkoneksi.');

    app.listen(port, () => {
        console.log('Server berjalan di port ' + port);
        console.log('http://localhost:' + port);
    })
}).catch((err) => {
    console.log("Database gagal terkoneksi.");
    console.log(err);
})
