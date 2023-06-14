class SitesController {
  //[GET] /login
  login(req, res) {
    res.render("login");
  }

  //[GET] /
  home(req, res) {
    res.render("home");
  }

  //[GET] /search
  searchGet(req, res) {
    console.log(req.query);
    res.render("search");
  }

  //[POST] /search
  searchPost(req, res) {
    console.log(req.body);
    res.render("search");
  }
}

module.exports = new SitesController;