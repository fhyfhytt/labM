var WT3DModel;
var keyDownInterval = 0;
var timelong = 200;
var threeClock = null;
function threeStart(_height) {
    WT3DModel = new WT3D();
    var initOption = {
        antialias: true,
        loadSyn: false,
        showHelpGrid: false,
        clearCoolr: 0x4068b0,
        clearColorOp: 0,
    };
    var Aobjects = {  // 给3D对象绑定事件
        objects: getBuildData(),
        events: {
            dbclick: [
                {
                    obj_name: "ALL",
                    obj_event: function (_obj, face, inserts) {
                        {
                            var selectobj = null;
                            $.each(inserts, function (_index, _iobj) {
                                if (_iobj.object && _iobj.object.name && _iobj.object.name.indexOf("dev_") >= 0 && selectobj == null) {

                                    if ((_iobj.object.name.indexOf("SDD2") >= 0&&_iobj.object.name.indexOf("OBJCREN0") >= 0)
                                        || (_iobj.object.name.indexOf("SDD1") >= 0&&_iobj.object.name.indexOf("OBJCREN2") >= 0)
                                        || (_iobj.object.name.indexOf("DG") >= 0&&_iobj.object.name.indexOf("OBJCREN4") >= 0)
                                        || (_iobj.object.name.indexOf("GGD") >= 0 && _iobj.object.name.indexOf("OBJCREN18") >= 0)
                                        ) {
                                    
                                    }else{

                                    selectobj = _iobj.object;
                                    if (selectobj) {
                                        if (selectobj.name.indexOf("OBJCREN") > 0) {
                                            var selectname = selectobj.name.split("OBJCREN")[0];
                                            selectobj = WT3DObj.commonFunc.findObject(selectname);
                                        }
                                    }
                                }
                            }
                            });
                            if (_obj.name.indexOf("light_") >= 0) {
                                selectobj = _obj;
                            }
                            if (!selectobj) {
                                return;
                            }
                            if(threeClock){
                                clearTimeout(threeClock)
                                threeClock = null
                            }
                            CloseDistance(selectobj, function () {
                                modelBussiness.dbClickSelectCabinet(selectobj, face, inserts);
                            });
                            console.log(inserts);
                        }
                    }
                },
            ]
            ,
            mouseDown: [
                {
                    obj_name: "ALL",
                    obj_event: function (_obj, face, inserts) {
                        if(threeClock){
                            clearTimeout(threeClock)
                            threeClock=null
                        }else{
                            threeClock = setTimeout(()=>{
                                var selectobj = null;
                                $.each(inserts, function (_index, _iobj) {
                                    if (_iobj.object && _iobj.object.name && _iobj.object.name.indexOf("dev_") >= 0 && selectobj == null) {

                                        if ((_iobj.object.name.indexOf("SDD2") >= 0&&_iobj.object.name.indexOf("OBJCREN0") >= 0)
                                            || (_iobj.object.name.indexOf("SDD1") >= 0&&_iobj.object.name.indexOf("OBJCREN2") >= 0)
                                            || (_iobj.object.name.indexOf("DG") >= 0&&_iobj.object.name.indexOf("OBJCREN4") >= 0)
                                            || (_iobj.object.name.indexOf("GGD") >= 0 && _iobj.object.name.indexOf("OBJCREN18") >= 0)
                                            ) {
                                        
                                        }else{
    
                                        selectobj = _iobj.object;
                                        if (selectobj) {
                                            if (selectobj.name.indexOf("OBJCREN") > 0) {
                                                var selectname = selectobj.name.split("OBJCREN")[0];
                                                selectobj = WT3DObj.commonFunc.findObject(selectname);
                                            }
                                        }
                                    }
                                }
                                });
                                if (_obj.name.indexOf("light_") >= 0) {
                                    selectobj = _obj;
                                }
                                if (!selectobj) {
                                    return;
                                }
                                parent.selectDevice(selectobj.name)
                                threeClock = null
                            },500)
                        }
                        if (modelBussiness && modelBussiness.getClickPointPosition && inserts && inserts.length > 0) {
                            modelBussiness.getClickPointPosition(inserts[0].point);
                        }
                    }
                },
            ]
        },
        btns: [
            {
                btnid: "btn_reset",
                btnTitle: "场景复位",
                btnimg: "../img/3dImg/back.png",
                sortnub: 0,
                btnType: "system",
                enable: true,
                show_event: function () {
                    WT3DObj.controls.object.zoom =1;
                    WT3DObj.controls.object.updateProjectionMatrix();
                    backToInitCameraPosition(1000);
                },
        
            }, {
                btnid: "btn_move",
                btnTitle: "平移",
                btnimg: "../img/3dImg/edit.png",
                sortnub: 0,
                btnType: "system",
                enable: true,
                show_event: function () {
                   if (WT3DObj.controls.showmoveindex){
                       layer.close(WT3DObj.controls.showmoveindex);
                       WT3DObj.controls.showmoveindex = null;
                       return;
                   }
                    WT3DObj.controls.object.zoom = 1;
                    WT3DObj.controls.object.updateProjectionMatrix();
                    WT3DObj.controls.showmoveindex = layer.tips('<table>\
                        <tr><td></td><td id="kup" style="text-align:center;cursor:pointer;">↑</td><td></td></tr>\
                        <tr><td style="text-align:center;cursor:pointer;" id="kleft">←</td><td>&nbsp;&nbsp;&nbsp;&nbsp;</td><td style="text-align:center;cursor:pointer;"  id="kright">→</td></tr>\
                        <tr><td></td><td style="text-align:center;cursor:pointer;" id="kdown">↓</td><td></td></tr>\
                        <tr><td colspan=3><button onclick="btnOperate(0)" style=" width:20px;height:20px;font-size:12px;vertical-align:middle;">-</button>\
                            <input id="num" value="1" style=" box-sizing:border-box;height:20px;width:30px;font-size:12px;text-align:center;"> \
                            <button onclick="btnOperate(1)"  style=" width:20px;height:20px;font-size:12px;vertical-align:middle;">+</button>\
            </td></tr>\
                        </table>', '#btn_move', {
                            tips: [4, '#000000'],
                            time: 0
                        });
                    setTimeout(function () {
                        $("#kup").mousedown(function () {
                            if (keyDownInterval) {
                                clearInterval(keyDownInterval);
                            }
                            $(this).css("background", "#094f71");
                            keyDownInterval = setInterval(function () {
                                WT3DObj.controls.simulationHandleKeyDownFunc({ keyCode: 38 });
                            }, timelong);
                        });
                        $("#kdown").mousedown(function () {
                            if (keyDownInterval) {
                                clearInterval(keyDownInterval);
                            }
                            $(this).css("background", "#094f71");
                            keyDownInterval = setInterval(function () {
                                WT3DObj.controls.simulationHandleKeyDownFunc({ keyCode: 40 });
                            }, timelong);
                         
                        });
                        $("#kleft").mousedown(function () {
                            if (keyDownInterval) {
                                clearInterval(keyDownInterval);
                            }
                            $(this).css("background", "#094f71");
                            keyDownInterval = setInterval(function () {
                                WT3DObj.controls.simulationHandleKeyDownFunc({ keyCode: 37 });
                            }, timelong);
                            
                        });
                        $("#kright").mousedown(function () {
                            if (keyDownInterval) {
                                clearInterval(keyDownInterval);
                            }
                            $(this).css("background", "#094f71");
                            keyDownInterval = setInterval(function () {
                                WT3DObj.controls.simulationHandleKeyDownFunc({ keyCode: 39 });
                            }, timelong);
                         
                        });

                        $("#kup").mouseup(function () {
                            if (keyDownInterval) {
                                clearInterval(keyDownInterval);
                            }
                            $(this).css("background", "none");
                        });
                        $("#kdown").mouseup(function () {
                            if (keyDownInterval) {
                                clearInterval(keyDownInterval);
                            }
                            $(this).css("background", "none");
                        });
                        $("#kleft").mouseup(function () {
                            if (keyDownInterval) {
                                clearInterval(keyDownInterval);
                            }
                            $(this).css("background", "none");
                        });
                        $("#kright").mouseup(function () {
                            if (keyDownInterval) {
                                clearInterval(keyDownInterval);
                            }
                            $(this).css("background", "none");
                        });

                        $("#kup").mouseleave(function () {
                            if (keyDownInterval) {
                                clearInterval(keyDownInterval);
                            }
                            $(this).css("background", "none");
                        });
                        $("#kdown").mouseleave(function () {
                            if (keyDownInterval) {
                                clearInterval(keyDownInterval);
                            }
                            $(this).css("background", "none");
                        });
                        $("#kleft").mouseleave(function () {
                            if (keyDownInterval) {
                                clearInterval(keyDownInterval);
                            }
                            $(this).css("background", "none");
                        });
                        $("#kright").mouseleave(function () {
                            if (keyDownInterval) {
                                clearInterval(keyDownInterval);
                            }
                            $(this).css("background", "none");
                        });

                    }, 500);
                },

            },
            {
                btnid: "btn_rotation",
                btnTitle: "旋转",
                btnimg: "../img/3dImg/reset.png",
                sortnub: 0,
                btnType: "system",
                enable: true,
                show_event: function () {
                    WT3DObj.controls.simulationRotateLeftFunc(Math.PI/8);
                },
          
            },  {
                btnid: "btn_plus",
                btnTitle: "放大",
                btnimg: "../img/3dImg/add.png",
                sortnub: 0,
                btnType: "system",
                enable: true,
                show_event: function () {
                    WT3DObj.controls.object.zoom +=0.1;
                    WT3DObj.controls.object.updateProjectionMatrix();
                },

            }, {
                btnid: "btn_minu",
                btnTitle: "缩小",
                btnimg: "../img/3dImg/minu.png",
                sortnub: 0,
                btnType: "system",
                enable: true,
                show_event: function () {

                    WT3DObj.controls.object.zoom -= 0.1;
                     if (WT3DObj.controls.object.zoom <= 0.8) {
                         WT3DObj.controls.object.zoom = 0.8;
                     }
                     WT3DObj.controls.object.updateProjectionMatrix();
                },

            },
        ]
    }
    if (parent != null && parent.Aobjects_objects != null) {
        Aobjects.objects = parent.Aobjects_objects;
    }
    Aobjects.imageList = [];
    imageUUIDList = [];
    function getImageList(obj) {
        if (obj && typeof (obj) == "object") {
            $.each(obj, function (_index, _obj) {
                if (_obj && _obj.imgurl) {
                    var imgObj = {};
                    imgObj.uuid = _obj.imgurl;
                    imgObj.imgurl = _obj.imgurl;
                    if ($.inArray(imgObj.uuid, imageUUIDList) < 0) {
                        imageUUIDList.push(imgObj.uuid);
                        Aobjects.imageList.push(imgObj);
                    }
                }
                getImageList(_obj);
            });
        }
    }
    getImageList(Aobjects.objects);
    if (_height != null && typeof (_height) != 'undefined' && _height == 0) {
        $("#canvas-frame").height($(document).height());
    }
    WT3DModel.initWT3D('canvas-frame', initOption, Aobjects);
    WT3DModel.start();
}
function btnOperate(pom) {
    var num = $("#num").val();
    if (pom == 1) {
        num++;
    } else {
        num--;
    }
    if (num <= 0) {
        num = 1;
    }
    $("#num").val(num);
    timelong = 200/num;
}
function CloseDistance(_obj, callBack) {
    {
        var mainCamera = WT3DObj.camera;//主场景
        if (_obj.name.indexOf("OBJCREN") > 0) {
            var parentname = _obj.name.split("OBJCREN")[0];
            var pobj = WT3DObj.commonFunc.findObject(parentname);
            if (pobj) {
                _obj = pobj;
            }
        }

        var objpositionx = _obj.position.x;
        var objpositiony = _obj.position.y;
        var objpositionz = _obj.position.z;
        if (typeof (_obj.parent) != 'undefined' && _obj.parent != null && typeof (_obj.parent.position) != 'undefined' && _obj.parent.position != null) {
            objpositionx += _obj.parent.position.x;
            objpositiony += _obj.parent.position.y;
            objpositionz += _obj.parent.position.z;

        }
        if (typeof (_obj.oldPosition) != 'undefined' && _obj.oldPosition != null) {
            objpositionx = _obj.oldPosition.x;
            objpositiony = _obj.oldPosition.y;
            objpositionz = _obj.oldPosition.z;
        }
        if (_obj.name.indexOf("XBSQBB") >= 0) {
            objpositiony += 500;
        }
        if (_obj.name.indexOf("SKBXHD") >= 0) {
            objpositiony += 500;
        }
        if (_obj.name.indexOf("XBGZ") >= 0) {
            objpositiony += 1000;
        }
        if (_obj.name.indexOf("GGD") >= 0) {
            objpositiony += 500;
        }
        new TWEEN.Tween(WT3DObj.controls.target).to({
            x: objpositionx, y: objpositiony, z: objpositionz
        }, 600).onComplete(function () {
            var x_distance = mainCamera.position.x - objpositionx;
            var y_distance = mainCamera.position.y - objpositiony;
            var z_distance = mainCamera.position.z - objpositionz;
            var lvvalue = 300;
            if (window.location.href.indexOf("xsdq") >= 0) {
                lvvalue = 200;
            } else if (window.location.href.indexOf("gsdq") >= 0) {
                lvvalue = 200;
            } else if (window.location.href.indexOf("shuidao") >= 0) {
                lvvalue = 1500;
            }

            var lv = lvvalue / Math.sqrt(x_distance * x_distance + y_distance * y_distance + z_distance * z_distance);
            var runtweenTime = 1000;
            if (lv > 0.6) {
                runtweenTime = 400;
            } else if (lv > 0.3) {
                runtweenTime = 1000;
            } else if (lv > 0.1) {
                runtweenTime = 1200;
            } else if (lv > 0.05) {
                runtweenTime = 1600;
            } else if (lv > 0.01) {
                runtweenTime = 2000;
            } else {
                runtweenTime = 2500;
            }
            if (x_distance * x_distance + y_distance * y_distance + z_distance * z_distance > 200 * 200 && lv < 0.9999) {
                new TWEEN.Tween(mainCamera.position).to({
                    x: objpositionx + (mainCamera.position.x - objpositionx) * lv, y: objpositiony + (mainCamera.position.y - objpositiony) * lv, z: objpositionz + (mainCamera.position.z - objpositionz) * lv
                }, runtweenTime).onComplete(function () {

                }).start();
                if (callBack) {
                    callBack();
                }
            } else {
                if (callBack) {
                    callBack();
                }
            }
        }).start();
    }
}
