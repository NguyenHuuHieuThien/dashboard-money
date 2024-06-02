let Friend = require('../model/friend')
exports.add = async (req, res) => {
    try {
        let { name, email, image, money, phone, ...rest } = req.body;
        let data = rest;
        if (!name || !email) {
            return res.json({ status: false, mesaage: '1 số trường còn thiếu!' })
        }
        if (!money || money < 0) money == 0;
        if (!image || image.length < 1) {
        }
        let friendExist = await Friend.findOne({ email });
        if (friendExist) {
            return res.json({ status: false, message: 'Đã tồn tại người bạn này!' })
        }
        if (!data.description || data.description.length == 0) {
            delete data.description
        }
        if (data.link) {
            data.link = data.link.filter(e => e != '');
        }
        let friend = new Friend({ name, email, image, money, phone, ...data })
        await friend.save()
        return res.json({ status: true, message: 'Thêm thành công' })
    } catch (error) {
        console.log('add friend err', error);
        return res.json({ status: false, message: 'lỗi' })
    }
}

exports.list = async (req, res) => {
    try {
        let filter = req.body.opts ?? {};
        let friends = await Friend.find(filter);
        return res.json({ status: true, data: friends })
    } catch (error) {
        console.log('get list friend err', error);
        return res.json({ status: false, message: 'lỗi' })
    }
}

exports.get = async (req, res) => {
    try {
        let id = req.body.id;
        let friend = await Friend.findOne({ _id: id })
        return res.json({ status: true, data: friend })
    } catch (error) {
        console.log('get friend err', error);
        return res.json({ status: false, message: 'lỗi' })
    }
}

exports.update = async (req, res) => {
    try {
        let id = req.body.id;
        let data = req.body.data;
        await Friend.updateOne({ _id: id }, data);
        return res.json({ status: true, message: 'Thành công' })
    } catch (error) {
        console.log('update friend err', error);
        return res.json({ status: false, message: 'lỗi' })
    }
}

exports.delete = async (req, res) => {
    try {
        let ids = req.body.ids;
        await Friend.deleteMany({ _id: { $in: ids } });
        return res.json({ status: true, message: 'Thành công' })
    } catch (error) {
        console.log('delete friend err', error);
        return res.json({ status: false, message: 'lỗi' })
    }
}
