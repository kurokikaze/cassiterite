this.serve = function(req, res) {
    res.respond("Other version of code [" + req.session["name"] + "]");
}