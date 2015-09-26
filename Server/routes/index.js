var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//keyword�� ������ ���� �ֱ� �м� ��� ����
//Query�� keyword����
router.get('/result/recently_result', function(req, res, next) {
  res.sendStatus(200);
});

//keyword�� ������ �ֱ� �м� article ����
//Query�� keyword����
router.get('/result/article', function(req, res, next){
  res.sendStatus(200);
});

//keyword�� �޾� �м� ����
//Query�� keyword����
router.post('/result/analysis', function(req, res, next){
  res.sendStatus(200);
});

module.exports = router;
