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
        //console.log('newOrderPlaced req.body',req.body)
        const {id, tableNumber} = req.body
    db.new_order([id, tableNumber]).then(response => {
       // console.log('new order', response);
    }).catch(err => console.log(err))
    },

    getCheckByTable(req, res) {
        
        const db = req.app.get('db')
        Promise.all([
            
            db.get_table_total([req.params.table]),
            db.get_table_receipt([req.params.table])]).then(response => {
               // console.log('info', response)   
                const tableReceipt = [response[0][0].sum,
                                    response[1]]
                    //console.log('check by table', response[1][0].name)
                    res.status(200).json(tableReceipt)
        }).catch(err => console.log(err))
    },

    getAdminOrders(req, res) {
        // console.log('hi');
        const db = req.app.get('db')
    db.get_admin_orders().then(response => {
        // console.log('admin orders')
        res.status(200).send(response)
    }).catch((err) => {console.log(err);})
    },

    patchCompleted(req, res) {
        // console.log('patch', req.body)
        const db = req.app.get('db')
            const {tableNumber} = req.body
        db.clear_menu(tableNumber).then(response => {
            res.status(200).send(response)
        })
    },

    deleteItem(req,res){
        const db = req.app.get('db') 
        db.delete_item([req.params.id ,req.params.table]).then(() =>{
            Promise.all([
                
                db.get_table_total([req.params.table]),
                db.get_table_receipt([req.params.table])]).then(response => {
                    console.log('info', response)   
                    const tableReceipt = [response[0][0].sum,
                                        response[1]]
                        // console.log('check by table', response[1][0].name)
                        res.status(200).json(tableReceipt)
            }).catch(err => console.log(err))
        })
    },

    sendNewMessage(req, res) {
        const db = req.app.get('db')
        const {tableNumber, msg} = req.body
    db.new_message([tableNumber, msg]).then(response => {
        db.get_messages_by_table([tableNumber]).then(response => {
            res.status(200).json(response)
}).catch(err => console.log(err))
       // console.log('new order', response);
    }).catch(err => console.log(err))
    },

    getMessagesByTable(req, res) {
        const db = req.app.get('db')        
            db.get_messages_by_table([req.params.table]).then(response => {
                    res.status(200).json(response)
        }).catch(err => console.log(err))
    },

    getAdminMessages(req, res) {

        const db = req.app.get('db')        
            db.get_admin_messages().then(response => {
                    res.status(200).json(response)
        }).catch(err => console.log(err))
    },

    adminMessageRead(req, res) {
        const db = req.app.get('db') 
            const {messageId} = req.body
            db.update_admin_read(messageId).then(response => {
                res.status(200).json(response)
            }).catch(err => console.log(err))
    },

    adminMessageCompleted(req, res) {
        const db = req.app.get('db') 
            const {messageId} = req.body
            db.update_admin_completed(messageId).then(response => {
                res.status(200).json(response)
            }).catch(err => console.log(err))
    }


}

