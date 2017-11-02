module.exports = {
    getMenuType(req, res) {
        const db = req.app.get('db')
    db.get_menu_type([req.params.type]).then(response => {
        //console.log(response);
        res.send(response)
    }).catch((err) => {console.log(err)})
    },

    newOrderPlaced(req, res) {
        const db = req.app.get('db')
        const {id, tableNumber} = req.body
    db.new_order([id, tableNumber]).then(response => {
        console.log('plz work', response);
    }).catch(err => console.log(err))
    },

    getCheckByTable(req, res) {
        const db = req.app.get('db')
    db.get_check_by_table([req.params.table]).then(response => {
        console.log('check by table', response)
        res.status(200).send(response)
    }).catch(err => console.log(err))
    }
}