var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
  var query = req.query.keyword;
  if(query === undefined) {
    res.render('index');
  }
  else {
    res.render('resultscreen', {query_keyword : query});
  }

});


//keyword�� ������ ���� �ֱ� �м� ��� ����
//Query�� keyword����
router.get('/result/recently_result', function (req, res, next) {
  var query = {};
  var keyword = req.query.keyword;
  req.db.collection('analysis').findOne({$query: {"keyword": keyword}, $orderby: {"reg_date": -1}}, function (err, doc) {
    query.keyword = doc.keyword;
    query.result = doc.result;
    query.date = doc.reg_date;
    res.send(query);
  });
 /* insert analysis sample

  var arr = [];
  var arr2 = [];
  req.db.collection('article').find({}, {_id:true}).limit(10).toArray(function (err, docs) {
    docs.forEach(function (doc) {
      arr.push(doc._id);
    })
    console.log(arr);

    req.db.collection('article').find({}, {_id:true}).skip(10).limit(10).toArray(function (err, docs) {
      docs.forEach(function (doc) {
        arr2.push(doc._id);
      })
      console.log(arr2);

      req.db.collection('analysis').insertOne( {
        "reg_date" : new Date() ,
        "keyword" : "eunamong",
        "result" : 60,
        likes_id : arr,
        dislikes_id : arr2
      }, function(err, result) {
        console.log("insert")
        res.sendStatus(200);
      });
    });
  });
*/

});


//keyword�� ������ �ֱ� �м� article ����
//Query�� keyword����
router.get('/result/article', function (req, res, next){
  var keyword = req.query.keyword;
  var query = {};

  req.db.collection('analysis').findOne({$query: {"keyword": keyword}, $orderby: {"reg_date": -1}}, function (err, doc) {
    query.keyword = doc.keyword;

    req.db.collection('article')
        .find({"_id": { $in: doc.likes_id}}, {"scrname" : 1, "text" : 1, "date" : 1, "url" : 1, "_id" : 0})
        .toArray(function (err, docs) {
          query.likes = docs;

          req.db.collection('article')
              .find({"_id": { $in: doc.dislikes_id}}, {"scrname" : 1, "text" : 1, "date" : 1, "url" : 1, "_id" : 0})
              .toArray(function (err, docs) {
                query.dislikes = docs;
                res.send(query);
              })
    });
  });
});

//keyword�� �޾� �м� ����
//Query�� keyword����
router.post('/result/analysis', function(req, res, next){
  req.db.collection('article').find().skip(100).limit(10).toArray(function (err, docs) {
    var likes = [];
    var dislikes = [];

    docs.forEach(function (doc) {
      if (classifyArticle()) {
        likes.push(doc._id);
      }
      else {
        dislikes.push(doc._id);
      }
    })
    var result = likes.length / (likes.length + dislikes.length);

    req.db.collection('analysis').insertOne( {
      "reg_date" : new Date() ,
      "keyword" : req.query.keyword,
      "result" : result,
      likes_id : likes,
      dislikes_id : dislikes
    }, function(err, result) {
      console.log("insert");
      res.sendStatus(200);
    });

  });
});

function classifyArticle() {
  //TODO: �� ����/���� �з�

  if(Math.random() > 0.5) {
    return 1;
  }
  else{
    return 0;
  }

}

module.exports = router;
