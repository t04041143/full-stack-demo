'use strict';

let fs = require('fs');
let path = require('path');

function makeDir(dirpath) {
    if (!fs.existsSync(dirpath)) {
        let pathtmp;
        dirpath.split("/").forEach(function (dirname) {
            if (pathtmp) {
                pathtmp = path.join(pathtmp, dirname);
            } else {
                //如果在linux系统中，第一个dirname的值为空，所以赋值为"/"
                if (dirname) {
                    pathtmp = dirname;
                } else {
                    pathtmp = "/";
                }
            }
            if (!fs.existsSync(pathtmp)) {
                if (!fs.mkdirSync(pathtmp)) {
                    return false;
                }
            }
        });
    }

    return true;
}

/*
 * 复制目录、子目录，及其中的文件
 * @param src {String} 要复制的目录
 * @param dist {String} 复制到目标目录
 */
function copyDir(src, dist, callback) {
    fs.access(dist, function (err) {
        if (err) {
            // 目录不存在时创建目录
            fs.mkdirSync(dist);
        }
        _copy(null, src, dist);
    });

    function _copy(err, src, dist) {
        if (err) {
            callback(err);
        } else {
            fs.readdir(src, function (err, paths) {
                if (err) {
                    callback(err)
                } else {
                    paths.forEach(function (path) {
                        var _src = src + '/' + path;
                        var _dist = dist + '/' + path;
                        fs.stat(_src, function (err, stat) {
                            if (err) {
                                callback(err);
                            } else {
                                // 判断是文件还是目录
                                if (stat.isFile()) {
                                    fs.writeFileSync(_dist, fs.readFileSync(_src));
                                } else if (stat.isDirectory()) {
                                    // 当是目录是，递归复制
                                    copyDir(_src, _dist, callback)
                                }
                            }
                        })
                    })
                }
            })
        }
    }
}

function copyFile(src, dist) {
    let distPath = dist.substring(0, dist.lastIndexOf('/'));
    console.log(distPath);
    if (makeDir(distPath)) {
        fs.writeFileSync(dist, fs.readFileSync(src));
    } else {
        console.error(`创建目录${dist}失败！`);
    }
}

//npm run-script deploy-nginx -- --dir=C:/Development/Tools/openresty-1.11.2.1-win32
const args = require('minimist')(process.argv.slice(2));

// dir必须是绝对路径
if (args['dir'] && path.isAbsolute(args['dir'])) {
    let ngxDir = args['dir'];

    let stat = fs.lstatSync(ngxDir);
    if (stat.isDirectory()) {
        // 1. 拷贝配置文件
        copyFile('./nginx/nginx.conf', `${ngxDir}/conf/nginx.conf`);
        copyFile('./nginx/oauth/oauth.conf', `${ngxDir}/conf/conf.d/oauth/oauth.conf`);
        // 2. 拷贝脚本目录
        copyDir('./nginx/oauth/scripts', `${ngxDir}/lua/oauth`, (err)=> {
            console.log('nginx配置时发生错误 ', err);
        });
    } else {
        console.error(`${ngxDir}不是文件夹！`);
    }
} else {
    console.error('参数[dir]不是一个绝对路径！');
}

