var bodyParser = require('body-parser'),
    mongoose   = require('mongoose'),
    express    = require('express'),
    app        = express();
    //APP CONFIG
    mongoose.connect('mongodb+srv://Jurgest:saadmin@cluster0.bdfsr.mongodb.net/RESTBLOG?retryWrites=true&w=majority');
    app.set('view engine', 'ejs');
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({extended: true}));

    //MONGOOSE MODEL CONFIG
    var blogSchema = new mongoose.Schema({
        title: String,
        image: String,
        body: String,
        created: {type: Date, default: Date.now}
    });
    var Blog = mongoose.model('Blog', blogSchema);

    // Blog.create({
    //     title:'Test Blog',
    //     image: 'https://pixabay.com/get/g1a7d03bd19e6c17b38be2fdb486abf5230e39ef5f6b96fc4875b32fb47e31264a562217b51dfcdc1853bdb5fc04d42e9_340.jpg',
    //     body: 'Hello from blog post',
    // });

    // RESTFULL ROUTES
    // default
    app.get('/', (req, res) => {
        res.redirect('/blogs');
    });
    // index route
    app.get('/blogs', (req, res) => {
        Blog.find({}, (err, blogs) => {
            if(err) {
                console.log(err)
            } else{
                res.render('index',{blogs:blogs});
            }
        })

    });
    // new route
    app.get('/blogs/new', (req, res) => {
        res.render('new');
    })

    // create route
    app.post('/blogs', (req, res) => {
        // create blog and redirect
        Blog.create(req.body.blog, (err, newBlog)=>{
            if(err) {
                res.render('new');
            }else {res.redirect('/blogs');
        }
        });
    });
    // SHOW ROUTE
    app.get('/blogs/:id', (req, res)=> {
        Blog.findById(req.params.id, (err, foundBlog)=> {
            if(err) {
              console.log(err);
                // res.redirect('/blogs');
            }else {
                res.render('show', {blog: foundBlog});
        }
        })
    });
    app.listen(3001, ()=> {
        console.log('server running');
    });