var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//keyword를 받으면 가장 최근 분석 결과 제공
//Query로 keyword받음
router.get('/result/recently_result', function(req, res, next) {
  res.sendStatus(200);
});

//keyword를 받으면 최근 분석 article 제공
//Query로 keyword받음
router.get('/result/article', function(req, res, next){
  res.sendStatus(200);
});

//keyword를 받아 분석 시작
//Query로 keyword받음
router.post('/result/analysis', function(req, res, next){
  res.sendStatus(200);
});

module.exports = router;
