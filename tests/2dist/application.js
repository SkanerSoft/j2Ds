var scene = j2Ds.getSceneManager();
var v2f = j2Ds.getMathManager().v2f;
var fps = j2Ds.getFPSManager();
var io = j2Ds.getIO();
var lr = j2Ds.getLayerManager();
var gm = j2Ds.getGameStateManager();
var err = j2Ds.getErrorManager();

scene.init(500, 300);
scene.setAutoClear(true);

lr.add('back', -1).fill('#FFFFC1');

var b = scene.addTextNode(v2f(5, 0), '', 30, 'white', '', 1, 'black');

gm.add('myGame', function () {

    if (io.isKeyDown('W')) {
        b.drawSimpleText('JJJJJJJJJJJJ');
    }

    b.drawSimpleText('FPS: ' + fps.getFPS());

}, function () {
    err.show('Уровень начался');
});

scene.start('myGame', 60);
