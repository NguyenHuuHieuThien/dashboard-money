const Debt = require('../model/debt')

exports.create = async (req, res) =>{
    try {
        let debt = new Debt(req.body);
        await debt.save();
        return res.json({status: true, message: 'Tạo thành công'})
    } catch (error) {
        console.log('create debt', err)
        return res.json({status: false, message: 'Tạo thất bại'})
    }
}

exports.delete = async (req, res) =>{
    try {
        let ids = req.body.ids;
        await Debt.deleteMany({_id: {$in: ids}});
        return res.json({status: true, message: 'Xóa thành công'})
    } catch (error) {
        console.log('delete debt', err)
        return res.json({status: true, message: 'Xóa thất bại'})
    }
}