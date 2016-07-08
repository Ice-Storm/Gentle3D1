var co       = require('co');
var chokidar = require('chokidar');
var fs       = require('fs');
var path     = require('path');
var pathMap  = require('./pathMap');
var thunkify = require('thunkify');

/**
 * 监控指定目录，生成URL路径 map.json
 */
var fsWrite = thunkify(fs.writeFile);

module.exports = function *(splitFile){
  var watcher = chokidar.watch('./' + splitFile, { persistent: true });
  watcher.on('add', function (filePath) {
    co(function *(){
      var pathList = yield pathMap.map(path.join(__filename, '../' + splitFile));
      var s = yield pathMap.traFileName(pathList, splitFile)
      yield fsWrite('map.json', JSON.stringify(s))
    }).then(function(value){
      console.log(value)
    }, function(err){
      console.log(err)
    })
  })
  .on('change',function(filePath){
    co(function *(){
      var pathList = yield pathMap.map(path.join(__filename, '../' + splitFile));
      var s = yield pathMap.traFileName(pathList, splitFile)
      yield fsWrite('map.json', JSON.stringify(s))
    }).then(function(value){
      console.log(value)
    }, function(err){
      console.log(err)
    })
  })
  .on('error',function(filePath){
    console.log(filePath)
  })
  .on('unlink', function(filePath){
    co(function *(){
      var pathList = yield pathMap.map(path.join(__filename, '../' + splitFile));
      var s = yield pathMap.traFileName(pathList, splitFile)
      yield fsWrite('map.json', JSON.stringify(s))
    }).then(function(value){
      console.log(value)
    }, function(err){
      console.log(err)
    })
  })  
} 

 