class HomesController {

    //[GET] /home
    index (req, res) {
        res.render('home');
    };

    //[GET] /home/:slug
    cart (req, res) {
        res.send("This is cart");
    }
}

module.exports = new HomesController;