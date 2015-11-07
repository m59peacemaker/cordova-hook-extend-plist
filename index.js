var fs       = require('fs');
var path     = require('path');
var plist    = require('plist');
var parseXML = require('xml2js').parseString;

module.exports = function(entries) {
  return function(context) {
    var Q = context.requireCordovaModule('q');
    var deferral = new Q.defer();
    var projectRoot = context.opts.projectRoot;
    var configFile = path.join(projectRoot, 'config.xml');
    parseXML(fs.readFileSync(configFile, 'utf8'), function(err, result) {
      if (err) { throw err; }
      var config = result.widget;
      var projectName = config.name[0];
      var plistFile = path.join(projectRoot, '/platforms/ios', projectName, projectName+'-Info.plist');
      var plistObj = plist.parse(fs.readFileSync(plistFile, 'utf8'));
      Object.assign(plistObj, entries);
      fs.writeFileSync(plistFile, plist.build(plistObj));
      deferral.resolve();
    });
    return deferral.promise;
  }
};
