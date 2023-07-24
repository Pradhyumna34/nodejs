const express = require('express');
const router = express.Router();
const {getList, getListByID, add ,Edit ,Delete} = require('../controllers/admin');
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.json({users: [{name: 'Timmy'}]});
// });
router.route('/get').get(getList);
router.route('/getListByID').get(getListByID);

router.route('/add').get(add);
router.route('/edit').get(Edit);
router.route('/delete').get(Delete);

module.exports = router;
