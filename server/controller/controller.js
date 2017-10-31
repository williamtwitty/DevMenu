module.exports = {
    getMenuType(req, res) {
        const db = req.app.get('db')
    db.get_menu_type([req.params.type]).then(response => {
        console.log(response);

    }).catch((err) => {console.log(err)})

    
    }
}