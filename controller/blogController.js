const Post = require('../model/post');

// Menampilkan semua post yanga da
const home = async (req, res) => {
    try {
        const posts = await Post.find().lean().sort({ createdAt: 1 });

        res.render('index', {
            title: "Semua Post",
            posts,
        });
    } catch (error) {
        console.log(err)
    }
}

// Menampilkan semua post untuk dimanage
const listPost = async (req, res) => {
    try {
        const posts = await Post.find().lean().sort({ createdAt: -1 });

        res.render('post/list_post', {
            title: "List Post",
            posts,
        });
    } catch (error) {
        console.log(error)
    }
}

// Menampilkan detail suatu post
const detailPost = async (req, res) => {
    let detailPost = await Post.findById(
        req.params.id
    ).lean();

    res.render('post/detail_post', {
        title: "Detail Post",
        post: detailPost,
    });
}

// Menampilkan form tambah data
const createPost = (req, res) => {
    res.render('post/create_post', {
        title: "Create New Post",
    });
}

// Menyimpan data ke database
const storePost = (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
    })

    post.save()
        .then((result) => {
            console.log(result);
            res.redirect('/');
        })
        .catch((err) => {
            console.log(err);
            res.redirect('/');
        });
}

// Menghapus data
const deletePost = async (req, res) => {
    try {
        const deletePost = await Post.deleteOne({
            _id: req.params.id,
        })
        console.log(deletePost);
        res.redirect('/blog')
    } catch (error) {
        res.redirect('/blog')
    }
}

// Menampilkan form edit data
const editPost = async (req, res) => {
    try {
        let editPost = await Post.findById(
            req.params.id
        ).lean();

        res.render('post/edit_post', {
            title: "Edit Post",
            post: editPost,
        });
    } catch (error) {
        console.log(error)
    }
}

// Menyimpan perubahan ke database
const updatePost = async (req, res) => {
    const id = req.params.id;
    const bodyPost = {
        title: req.body.title,
        content: req.body.content,
    }

    try {
        const updatePost = await Post.findByIdAndUpdate(id, { $set: bodyPost });
        console.log(updatePost);

        res.redirect('/blog');
    } catch (error) {
        console.log(error)
    }
}

module.exports = { home, listPost, storePost, createPost, deletePost, updatePost, editPost, detailPost }