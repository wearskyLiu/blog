const express = require('express');
const router = express.Router();
const multer = require('multer');

//'D:/Blog/blog/public/img' 
//'C:/Blog/public/img'
const upload = multer({ dest: 'C:/Blog/public/img' });

router.post('/file', upload.single('wangeditor-uploaded-image'), (req, res) => {
    console.log(req.file)
    res.status(200).json(
        {
            "errno": 0, // 注意：值是数字，不能是字符串
            "data": {
                "url": 'http://127.0.0.1:3000/img/' + req.file.filename, // 图片 src ，必须
                "alt": "yyy", // 图片描述文字，非必须
                "href": "zzz" // 图片的链接，非必须
            }
        }
    )
})

module.exports = router;