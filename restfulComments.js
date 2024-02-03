const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const { v4: uuid } = require('uuid');
var methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let comments = [
    {
        id: uuid(),
        username: 'Tammy',
        comment: 'lol that is'},
    {
        id: uuid(),
        username: 'Sk8erBoi',
        comment: 'I love to skate'
    },
    {
        id:uuid(),
        username: 'Avril',
        comment: 'I love to sing!'
    }
];

// GET /comments - list all comments
// POST /comments - Create a  comment
// GET /comments/:id - get info about one comment
// PATCH /comments/:id - update one comment
// DELETE /comments/:id - delete one comment

app.get('/comments', (req, res) => {
    res.render('comments/index',{ comments });
});
app.get('/comments/new', (req, res) => {
    res.render('comments/new');
});

app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    const id = uuid();
    comments.push({id, username, comment });
    res.redirect('/comments');
});

app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show',{comment});
});

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
});

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    comment.comment = req.body.comment;

    res.redirect('/comments');
});

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit',{comment});
});




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });

