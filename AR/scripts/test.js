var element = document.getElementById("div_a-scene");

// ---------------- mouse ------------------

var b_Mdrag = false;
var MprevX, MprevY;

element.addEventListener("mousemove",
    function (itEvent){
        console.log(itEvent.type);

        //ページの左上からのdiv要素位置を得る
        var itX = this.offsetLeft;
        var itY = this.offsetTop;
        //div内の相対座標を得る
        var mx = itEvent.clientX-itX;
        var my = itEvent.clientY-itY;
        // ページのスクロールを考慮
        my += document.documentElement.scrollTop + document.body.scrollTop;
        console.log("マウスの相対座標 : ("+ mx + "," + my + ")");

        if(b_Mdrag){
            // 移動量
            var dx = mx - MprevX;
            var dy = my - MprevY;

            // 覚えておく
            MprevX = mx;
            MprevY = my;

// rot !!!
            var speed = 0.5; //0.1;
            var isIntersect = false;

            var rotcamera = document.getElementById('camera');
            var rottarget = document.getElementById('obj');

            if (rottarget && !isIntersect) {
                var curposition = rottarget.getAttribute('position');
                var tempposition = curposition;
                if (tempposition == null) {tempposition = new THREE.Vector3();}
                tempposition.x = 0;//-x;
                tempposition.y = 0;//-y;
                tempposition.z = 0;//-z;
                //rottarget.setAttribute('position', tempposition);
                var rotation = rottarget.getAttribute('rotation');
                // a-drame rotation : roll (x), pitch (y), and yaw (z)
                // roll : 前後, pitch : 左右, yaw : 上下 deg?

                if (rotation == null) {rotation = new THREE.Vector3();}
                rotation.x += dy * speed;
                rotation.y += dx * speed;
                rotation.z += 0 * speed;
                rottarget.setAttribute('rotation', rotation);
                rottarget.setAttribute('position', tempposition);

                //rotcamera.setAttribute('position', tempposition);

            }
// rot !!!

        }
    },
    false);

element.addEventListener("mousedown",
    function (itEvent){
        console.log(itEvent.type);

        //ページの左上からのdiv要素位置を得る
        var itX = this.offsetLeft;
        var itY = this.offsetTop;
        //div内の相対座標を得る
        var mx = itEvent.clientX-itX;
        var my = itEvent.clientY-itY;
        // ページのスクロールを考慮
        my += document.documentElement.scrollTop + document.body.scrollTop;
        console.log("マウスダウン時の相対座標 : ("+ mx + "," + my + ")");

        b_Mdrag = true;
        MprevX = mx;
        MprevY = my;

    },
    false);

element.addEventListener("mouseup",
    function (itEvent){
        console.log(itEvent.type);

        b_Mdrag = false;
    },
    false);


// ---------------- touch ------------------

var b_Tdrag = false;
var TprevX, TprevY;

// タッチイベントに対応している
if(window.TouchEvent){
    console.log("タッチイベントに対応している");

    // イベントリスナーに対応している
    if(window.addEventListener){

        element.addEventListener("touchmove",
            function (itEvent){
                console.log(itEvent.type);

                // TouchList オブジェクトを取得
                var touch_list = itEvent.changedTouches;

                // Touch オブジェクトを取得
                // 0 番決め打ち 複数指でのタッチは将来的に
                var touch = touch_list[0];

                //ページの左上からのdiv要素位置を得る
                var itX = this.offsetLeft;
                var itY = this.offsetTop;
                //div内の相対座標を得る
                var mx = touch.pageX-itX;
                var my = touch.pageY-itY;
                if(isNaN(mx)){return;}
                if(isNaN(my)){return;}

                // ページのスクロールを考慮
                my += document.documentElement.scrollTop + document.body.scrollTop;
                console.log("Tマウスダウン時の相対座標 : (" + mx + "," + my +")");

                if(b_Tdrag){
                    // 移動量
                    var dx = mx - TprevX;
                    var dy = my - TprevY;

                    // 覚えておく
                    TprevX = mx;
                    TprevY = my;

// rot!!!
                    var speed = 0.5;
                    var isIntersect = false;

                    var rotcamera = document.getElementById('camera');
                    var rottarget = document.getElementById('obj');

                    if (rottarget && !isIntersect) {
                        var curposition = rottarget.getAttribute('position');
                        var tempposition = curposition;
                        if (tempposition == null) {tempposition = new THREE.Vector3();}
                        tempposition.x = 0;//-x;
                        tempposition.y = 0;//-y;
                        tempposition.z = 0;//-z;
                        //rottarget.setAttribute('position', tempposition);
                        var rotation = rottarget.getAttribute('rotation');
                        // a-drame rotation : roll (x), pitch (y), and yaw (z)
                        // roll : 前後, pitch : 左右, yaw : 上下 deg?

                        if (rotation == null) {rotation = new THREE.Vector3();}
                        rotation.x += dy * speed;
                        rotation.y += dx * speed;
                        rotation.z += 0 * speed;
                        console.log(""+rotation.x + " " + rotation.y + " " + rotation.z);
                        rottarget.setAttribute('rotation', rotation);
                        rottarget.setAttribute('position', tempposition);

                        //rotcamera.setAttribute('position', tempposition);

                    }
// rot!!!

                }
            }
        );

        element.addEventListener("touchstart",
            function (itEvent){
                console.log(itEvent.type);

                // TouchList オブジェクトを取得
                var touch_list = itEvent.changedTouches;

                // Touch オブジェクトを取得
                // 0 番決め打ち 複数指でのタッチは将来的に
                var touch = touch_list[0];

                //ページの左上からのdiv要素位置を得る
                var itX = this.offsetLeft;
                var itY = this.offsetTop;
                //div内の相対座標を得る
                var mx = touch.pageX-itX;
                var my = touch.pageY-itY;
                if(isNaN(mx)){return;}
                if(isNaN(my)){return;}

                // ページのスクロールを考慮
                my += document.documentElement.scrollTop + document.body.scrollTop;
                console.log("Tマウスダウン時の相対座標 : (" + mx + "," + my +")");

                b_Tdrag = true;
                TprevX = mx;
                TprevY = my;

            }
        );

        element.addEventListener("touchend",
            function (itEvent){
                console.log(itEvent.type);

                b_Tdrag = false;
            }
        );

    }
}