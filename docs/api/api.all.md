## API Reference

<a name="module_j2Ds"></a>

## j2Ds

* [j2Ds](#module_j2Ds)
    * [j2DsEngine](#exp_module_j2Ds--j2DsEngine) ⏏
        * [.createLocal(id)](#module_j2Ds--j2DsEngine+createLocal) ⇒ <code>StorageManager</code>
        * [.gameEngine(j2Ds)](#module_j2Ds--j2DsEngine+gameEngine)
        * [.gameStates](#module_j2Ds--j2DsEngine+gameStates) : <code>Object</code>
        * [.getAudioManager()](#module_j2Ds--j2DsEngine+getAudioManager) ⇒ <code>AudioHandler</code>
        * [.getDOMManager()](#module_j2Ds--j2DsEngine+getDOMManager) ⇒ <code>Dom</code>
        * [.getDeviceManager()](#module_j2Ds--j2DsEngine+getDeviceManager) ⇒ <code>DeviceManager</code>
        * [.getErrorManager()](#module_j2Ds--j2DsEngine+getErrorManager) ⇒ <code>ErrorManager</code>
        * [.getFPSManager()](#module_j2Ds--j2DsEngine+getFPSManager) ⇒ <code>FpsManager</code>
        * [.getGameStateManager()](#module_j2Ds--j2DsEngine+getGameStateManager) ⇒ <code>Object</code>
        * [.getIO()](#module_j2Ds--j2DsEngine+getIO) ⇒ <code>InputHandler</code>
        * [.getInfo()](#module_j2Ds--j2DsEngine+getInfo) ⇒ <code>Object</code>
        * [.getLayerManager()](#module_j2Ds--j2DsEngine+getLayerManager) ⇒ <code>Layers</code>
        * [.getMathManager()](#module_j2Ds--j2DsEngine+getMathManager) ⇒ <code>MathUtil</code>
        * ~~[.getPaintManager()](#module_j2Ds--j2DsEngine+getPaintManager)~~
        * [.getResourceManager()](#module_j2Ds--j2DsEngine+getResourceManager) ⇒ <code>ResourceManager</code>
        * [.getSceneManager()](#module_j2Ds--j2DsEngine+getSceneManager) ⇒ <code>SceneManager</code>
        * [.getTextureManager()](#module_j2Ds--j2DsEngine+getTextureManager) ⇒ <code>TextureUtil</code>
        * [.getTimeManager()](#module_j2Ds--j2DsEngine+getTimeManager) ⇒ <code>TimeManager</code>
        * [.getTouchIO()](#module_j2Ds--j2DsEngine+getTouchIO) ⇒ <code>TouchHandler</code>
        * [.getTriggerManager()](#module_j2Ds--j2DsEngine+getTriggerManager) ⇒ <code>TriggerManager</code>
        * [.getViewManager()](#module_j2Ds--j2DsEngine+getViewManager) ⇒ <code>ViewManager</code>
        * [.runEngine(j2Ds)](#module_j2Ds--j2DsEngine+runEngine)
        * [.setActiveEngine(engine)](#module_j2Ds--j2DsEngine+setActiveEngine)
        * [.setFrameLimit(fps)](#module_j2Ds--j2DsEngine+setFrameLimit)
        * [.setWindow(global)](#module_j2Ds--j2DsEngine+setWindow)
        * [.start(engine, frameLimit)](#module_j2Ds--j2DsEngine+start)
        * [.stopEngine()](#module_j2Ds--j2DsEngine+stopEngine)

<a name="exp_module_j2Ds--j2DsEngine"></a>

### j2DsEngine ⏏
j2DsEngine

**Kind**: Exported class  
**Properties**

| Name | Type |
| --- | --- |
| now | <code>number</code> | 
| dt | <code>number</code> | 
| stopAll | <code>number</code> | 
| frameLimit | <code>number</code> | 
| sceneStartTime | <code>number</code> | 
| sceneSkipTime | <code>number</code> | 
| engine | <code>function</code> | 
| ready | <code>boolean</code> | 
| window | <code>Window</code> | 
| canDeactivate | <code>boolean</code> | 

<a name="module_j2Ds--j2DsEngine+createLocal"></a>

#### j2DsEngine.createLocal(id) ⇒ <code>StorageManager</code>
**Kind**: instance method of <code>[j2DsEngine](#exp_module_j2Ds--j2DsEngine)</code>  

| Param | Type |
| --- | --- |
| id | <code>string</code> | 

<a name="module_j2Ds--j2DsEngine+gameEngine"></a>

#### j2DsEngine.gameEngine(j2Ds)
**Kind**: instance method of <code>[j2DsEngine](#exp_module_j2Ds--j2DsEngine)</code>  

| Param | Type |
| --- | --- |
| j2Ds | <code>j2DsEngine</code> | 

<a name="module_j2Ds--j2DsEngine+gameStates"></a>

#### j2DsEngine.gameStates : <code>Object</code>
**Kind**: instance property of <code>[j2DsEngine](#exp_module_j2Ds--j2DsEngine)</code>  
<a name="module_j2Ds--j2DsEngine+getAudioManager"></a>

#### j2DsEngine.getAudioManager() ⇒ <code>AudioHandler</code>
**Kind**: instance method of <code>[j2DsEngine](#exp_module_j2Ds--j2DsEngine)</code>  
<a name="module_j2Ds--j2DsEngine+getDOMManager"></a>

#### j2DsEngine.getDOMManager() ⇒ <code>Dom</code>
**Kind**: instance method of <code>[j2DsEngine](#exp_module_j2Ds--j2DsEngine)</code>  
<a name="module_j2Ds--j2DsEngine+getDeviceManager"></a>

#### j2DsEngine.getDeviceManager() ⇒ <code>DeviceManager</code>
**Kind**: instance method of <code>[j2DsEngine](#exp_module_j2Ds--j2DsEngine)</code>  
<a name="module_j2Ds--j2DsEngine+getErrorManager"></a>

#### j2DsEngine.getErrorManager() ⇒ <code>ErrorManager</code>
**Kind**: instance method of <code>[j2DsEngine](#exp_module_j2Ds--j2DsEngine)</code>  
<a name="module_j2Ds--j2DsEngine+getFPSManager"></a>

#### j2DsEngine.getFPSManager() ⇒ <code>FpsManager</code>
**Kind**: instance method of <code>[j2DsEngine](#exp_module_j2Ds--j2DsEngine)</code>  
<a name="module_j2Ds--j2DsEngine+getGameStateManager"></a>

#### j2DsEngine.getGameStateManager() ⇒ <code>Object</code>
**Kind**: instance method of <code>[j2DsEngine](#exp_module_j2Ds--j2DsEngine)</code>  
<a name="module_j2Ds--j2DsEngine+getIO"></a>

#### j2DsEngine.getIO() ⇒ <code>InputHandler</code>
**Kind**: instance method of <code>[j2DsEngine](#exp_module_j2Ds--j2DsEngine)</code>  
<a name="module_j2Ds--j2DsEngine+getInfo"></a>

#### j2DsEngine.getInfo() ⇒ <code>Object</code>
**Kind**: instance method of <code>[j2DsEngine](#exp_module_j2Ds--j2DsEngine)</code>  
<a name="module_j2Ds--j2DsEngine+getLayerManager"></a>

#### j2DsEngine.getLayerManager() ⇒ <code>Layers</code>
**Kind**: instance method of <code>[j2DsEngine](#exp_module_j2Ds--j2DsEngine)</code>  
<a name="module_j2Ds--j2DsEngine+getMathManager"></a>

#### j2DsEngine.getMathManager() ⇒ <code>MathUtil</code>
**Kind**: instance method of <code>[j2DsEngine](#exp_module_j2Ds--j2DsEngine)</code>  
<a name="module_j2Ds--j2DsEngine+getPaintManager"></a>

#### ~~j2DsEngine.getPaintManager()~~
***Deprecated***

**Kind**: instance method of <code>[j2DsEngine](#exp_module_j2Ds--j2DsEngine)</code>  
<a name="module_j2Ds--j2DsEngine+getResourceManager"></a>

#### j2DsEngine.getResourceManager() ⇒ <code>ResourceManager</code>
**Kind**: instance method of <code>[j2DsEngine](#exp_module_j2Ds--j2DsEngine)</code>  
<a name="module_j2Ds--j2DsEngine+getSceneManager"></a>

#### j2DsEngine.getSceneManager() ⇒ <code>SceneManager</code>
**Kind**: instance method of <code>[j2DsEngine](#exp_module_j2Ds--j2DsEngine)</code>  
<a name="module_j2Ds--j2DsEngine+getTextureManager"></a>

#### j2DsEngine.getTextureManager() ⇒ <code>TextureUtil</code>
**Kind**: instance method of <code>[j2DsEngine](#exp_module_j2Ds--j2DsEngine)</code>  
<a name="module_j2Ds--j2DsEngine+getTimeManager"></a>

#### j2DsEngine.getTimeManager() ⇒ <code>TimeManager</code>
**Kind**: instance method of <code>[j2DsEngine](#exp_module_j2Ds--j2DsEngine)</code>  
<a name="module_j2Ds--j2DsEngine+getTouchIO"></a>

#### j2DsEngine.getTouchIO() ⇒ <code>TouchHandler</code>
**Kind**: instance method of <code>[j2DsEngine](#exp_module_j2Ds--j2DsEngine)</code>  
<a name="module_j2Ds--j2DsEngine+getTriggerManager"></a>

#### j2DsEngine.getTriggerManager() ⇒ <code>TriggerManager</code>
**Kind**: instance method of <code>[j2DsEngine](#exp_module_j2Ds--j2DsEngine)</code>  
<a name="module_j2Ds--j2DsEngine+getViewManager"></a>

#### j2DsEngine.getViewManager() ⇒ <code>ViewManager</code>
**Kind**: instance method of <code>[j2DsEngine](#exp_module_j2Ds--j2DsEngine)</code>  
<a name="module_j2Ds--j2DsEngine+runEngine"></a>

#### j2DsEngine.runEngine(j2Ds)
**Kind**: instance method of <code>[j2DsEngine](#exp_module_j2Ds--j2DsEngine)</code>  

| Param | Type |
| --- | --- |
| j2Ds | <code>j2DsEngine</code> | 

<a name="module_j2Ds--j2DsEngine+setActiveEngine"></a>

#### j2DsEngine.setActiveEngine(engine)
**Kind**: instance method of <code>[j2DsEngine](#exp_module_j2Ds--j2DsEngine)</code>  

| Param | Type |
| --- | --- |
| engine | <code>function</code> | 

<a name="module_j2Ds--j2DsEngine+setFrameLimit"></a>

#### j2DsEngine.setFrameLimit(fps)
**Kind**: instance method of <code>[j2DsEngine](#exp_module_j2Ds--j2DsEngine)</code>  

| Param | Type |
| --- | --- |
| fps | <code>number</code> | 

<a name="module_j2Ds--j2DsEngine+setWindow"></a>

#### j2DsEngine.setWindow(global)
**Kind**: instance method of <code>[j2DsEngine](#exp_module_j2Ds--j2DsEngine)</code>  

| Param | Type |
| --- | --- |
| global | <code>Window</code> | 

<a name="module_j2Ds--j2DsEngine+start"></a>

#### j2DsEngine.start(engine, frameLimit)
**Kind**: instance method of <code>[j2DsEngine](#exp_module_j2Ds--j2DsEngine)</code>  

| Param | Type |
| --- | --- |
| engine | <code>function</code> | 
| frameLimit | <code>number</code> | 

<a name="module_j2Ds--j2DsEngine+stopEngine"></a>

#### j2DsEngine.stopEngine()
**Kind**: instance method of <code>[j2DsEngine](#exp_module_j2Ds--j2DsEngine)</code>  
<a name="module_nodes/BaseNode"></a>

## nodes/BaseNode

* [nodes/BaseNode](#module_nodes/BaseNode)
    * [.drawBox()](#module_nodes/BaseNode+drawBox)
    * [.getAlpha()](#module_nodes/BaseNode+getAlpha) ⇒ <code>\*</code> &#124; <code>number</code>
    * [.getBox(node)](#module_nodes/BaseNode+getBox) ⇒ <code>Object</code>
    * [.getBoxVertices(node)](#module_nodes/BaseNode+getBoxVertices) ⇒ <code>Array.&lt;{x: number, y: number}&gt;</code>
    * [.getDistance(id)](#module_nodes/BaseNode+getDistance) ⇒ <code>number</code>
    * [.getDistanceXY(id)](#module_nodes/BaseNode+getDistanceXY) ⇒ <code>Object</code> &#124; <code>Object</code>
    * [.getLayer()](#module_nodes/BaseNode+getLayer) ⇒ <code>\*</code>
    * [.getPosition()](#module_nodes/BaseNode+getPosition) ⇒ <code>Object</code> &#124; <code>Object</code>
    * [.getRotation()](#module_nodes/BaseNode+getRotation) ⇒ <code>number</code> &#124; <code>\*</code>
    * [.getSize()](#module_nodes/BaseNode+getSize) ⇒ <code>\*</code>
    * [.isCollision(id)](#module_nodes/BaseNode+isCollision) ⇒ <code>boolean</code>
    * [.isIntersect(node2)](#module_nodes/BaseNode+isIntersect) ⇒ <code>\*</code>
    * [.isLookScene()](#module_nodes/BaseNode+isLookScene) ⇒ <code>boolean</code>
    * [.isOutScene()](#module_nodes/BaseNode+isOutScene) ⇒ <code>Object</code>
    * [.isPointInsideBox(vf, point)](#module_nodes/BaseNode+isPointInsideBox) ⇒ <code>boolean</code>
    * [.isVisible()](#module_nodes/BaseNode+isVisible) ⇒ <code>boolean</code> &#124; <code>\*</code>
    * [.move(pos)](#module_nodes/BaseNode+move)
    * [.moveDir(speed)](#module_nodes/BaseNode+moveDir)
    * [.moveTo(to, t)](#module_nodes/BaseNode+moveTo)
    * [.resizeBox(offset, size)](#module_nodes/BaseNode+resizeBox)
    * [.rotateTo(to, t)](#module_nodes/BaseNode+rotateTo)
    * [.setAlpha(alpha)](#module_nodes/BaseNode+setAlpha)
    * [.setLayer(layer)](#module_nodes/BaseNode+setLayer)
    * [.setParent(id)](#module_nodes/BaseNode+setParent)
    * [.setPosition(pos)](#module_nodes/BaseNode+setPosition) ⇒ <code>\*</code>
    * [.setRotation(angle)](#module_nodes/BaseNode+setRotation)
    * [.setSize(size)](#module_nodes/BaseNode+setSize) ⇒ <code>\*</code>
    * [.setVisible(visible)](#module_nodes/BaseNode+setVisible)
    * [.turn(angle)](#module_nodes/BaseNode+turn)

<a name="module_nodes/BaseNode+drawBox"></a>

### nodes/BaseNode.drawBox()
**Kind**: instance method of <code>[nodes/BaseNode](#module_nodes/BaseNode)</code>  
<a name="module_nodes/BaseNode+getAlpha"></a>

### nodes/BaseNode.getAlpha() ⇒ <code>\*</code> &#124; <code>number</code>
**Kind**: instance method of <code>[nodes/BaseNode](#module_nodes/BaseNode)</code>  
<a name="module_nodes/BaseNode+getBox"></a>

### nodes/BaseNode.getBox(node) ⇒ <code>Object</code>
**Kind**: instance method of <code>[nodes/BaseNode](#module_nodes/BaseNode)</code>  

| Param |
| --- |
| node | 

<a name="module_nodes/BaseNode+getBoxVertices"></a>

### nodes/BaseNode.getBoxVertices(node) ⇒ <code>Array.&lt;{x: number, y: number}&gt;</code>
**Kind**: instance method of <code>[nodes/BaseNode](#module_nodes/BaseNode)</code>  

| Param | Type |
| --- | --- |
| node | <code>BaseNode</code> | 

<a name="module_nodes/BaseNode+getDistance"></a>

### nodes/BaseNode.getDistance(id) ⇒ <code>number</code>
**Kind**: instance method of <code>[nodes/BaseNode](#module_nodes/BaseNode)</code>  

| Param |
| --- |
| id | 

<a name="module_nodes/BaseNode+getDistanceXY"></a>

### nodes/BaseNode.getDistanceXY(id) ⇒ <code>Object</code> &#124; <code>Object</code>
**Kind**: instance method of <code>[nodes/BaseNode](#module_nodes/BaseNode)</code>  

| Param |
| --- |
| id | 

<a name="module_nodes/BaseNode+getLayer"></a>

### nodes/BaseNode.getLayer() ⇒ <code>\*</code>
**Kind**: instance method of <code>[nodes/BaseNode](#module_nodes/BaseNode)</code>  
<a name="module_nodes/BaseNode+getPosition"></a>

### nodes/BaseNode.getPosition() ⇒ <code>Object</code> &#124; <code>Object</code>
**Kind**: instance method of <code>[nodes/BaseNode](#module_nodes/BaseNode)</code>  
<a name="module_nodes/BaseNode+getRotation"></a>

### nodes/BaseNode.getRotation() ⇒ <code>number</code> &#124; <code>\*</code>
**Kind**: instance method of <code>[nodes/BaseNode](#module_nodes/BaseNode)</code>  
<a name="module_nodes/BaseNode+getSize"></a>

### nodes/BaseNode.getSize() ⇒ <code>\*</code>
**Kind**: instance method of <code>[nodes/BaseNode](#module_nodes/BaseNode)</code>  
<a name="module_nodes/BaseNode+isCollision"></a>

### nodes/BaseNode.isCollision(id) ⇒ <code>boolean</code>
**Kind**: instance method of <code>[nodes/BaseNode](#module_nodes/BaseNode)</code>  

| Param |
| --- |
| id | 

<a name="module_nodes/BaseNode+isIntersect"></a>

### nodes/BaseNode.isIntersect(node2) ⇒ <code>\*</code>
**Kind**: instance method of <code>[nodes/BaseNode](#module_nodes/BaseNode)</code>  

| Param |
| --- |
| node2 | 

<a name="module_nodes/BaseNode+isLookScene"></a>

### nodes/BaseNode.isLookScene() ⇒ <code>boolean</code>
**Kind**: instance method of <code>[nodes/BaseNode](#module_nodes/BaseNode)</code>  
<a name="module_nodes/BaseNode+isOutScene"></a>

### nodes/BaseNode.isOutScene() ⇒ <code>Object</code>
**Kind**: instance method of <code>[nodes/BaseNode](#module_nodes/BaseNode)</code>  
<a name="module_nodes/BaseNode+isPointInsideBox"></a>

### nodes/BaseNode.isPointInsideBox(vf, point) ⇒ <code>boolean</code>
**Kind**: instance method of <code>[nodes/BaseNode](#module_nodes/BaseNode)</code>  

| Param |
| --- |
| vf | 
| point | 

<a name="module_nodes/BaseNode+isVisible"></a>

### nodes/BaseNode.isVisible() ⇒ <code>boolean</code> &#124; <code>\*</code>
**Kind**: instance method of <code>[nodes/BaseNode](#module_nodes/BaseNode)</code>  
<a name="module_nodes/BaseNode+move"></a>

### nodes/BaseNode.move(pos)
**Kind**: instance method of <code>[nodes/BaseNode](#module_nodes/BaseNode)</code>  

| Param |
| --- |
| pos | 

<a name="module_nodes/BaseNode+moveDir"></a>

### nodes/BaseNode.moveDir(speed)
**Kind**: instance method of <code>[nodes/BaseNode](#module_nodes/BaseNode)</code>  

| Param |
| --- |
| speed | 

<a name="module_nodes/BaseNode+moveTo"></a>

### nodes/BaseNode.moveTo(to, t)
**Kind**: instance method of <code>[nodes/BaseNode](#module_nodes/BaseNode)</code>  

| Param |
| --- |
| to | 
| t | 

<a name="module_nodes/BaseNode+resizeBox"></a>

### nodes/BaseNode.resizeBox(offset, size)
**Kind**: instance method of <code>[nodes/BaseNode](#module_nodes/BaseNode)</code>  

| Param |
| --- |
| offset | 
| size | 

<a name="module_nodes/BaseNode+rotateTo"></a>

### nodes/BaseNode.rotateTo(to, t)
**Kind**: instance method of <code>[nodes/BaseNode](#module_nodes/BaseNode)</code>  

| Param |
| --- |
| to | 
| t | 

<a name="module_nodes/BaseNode+setAlpha"></a>

### nodes/BaseNode.setAlpha(alpha)
**Kind**: instance method of <code>[nodes/BaseNode](#module_nodes/BaseNode)</code>  

| Param |
| --- |
| alpha | 

<a name="module_nodes/BaseNode+setLayer"></a>

### nodes/BaseNode.setLayer(layer)
**Kind**: instance method of <code>[nodes/BaseNode](#module_nodes/BaseNode)</code>  

| Param |
| --- |
| layer | 

<a name="module_nodes/BaseNode+setParent"></a>

### nodes/BaseNode.setParent(id)
**Kind**: instance method of <code>[nodes/BaseNode](#module_nodes/BaseNode)</code>  

| Param |
| --- |
| id | 

<a name="module_nodes/BaseNode+setPosition"></a>

### nodes/BaseNode.setPosition(pos) ⇒ <code>\*</code>
**Kind**: instance method of <code>[nodes/BaseNode](#module_nodes/BaseNode)</code>  

| Param |
| --- |
| pos | 

<a name="module_nodes/BaseNode+setRotation"></a>

### nodes/BaseNode.setRotation(angle)
**Kind**: instance method of <code>[nodes/BaseNode](#module_nodes/BaseNode)</code>  

| Param |
| --- |
| angle | 

<a name="module_nodes/BaseNode+setSize"></a>

### nodes/BaseNode.setSize(size) ⇒ <code>\*</code>
**Kind**: instance method of <code>[nodes/BaseNode](#module_nodes/BaseNode)</code>  

| Param |
| --- |
| size | 

<a name="module_nodes/BaseNode+setVisible"></a>

### nodes/BaseNode.setVisible(visible)
**Kind**: instance method of <code>[nodes/BaseNode](#module_nodes/BaseNode)</code>  

| Param |
| --- |
| visible | 

<a name="module_nodes/BaseNode+turn"></a>

### nodes/BaseNode.turn(angle)
**Kind**: instance method of <code>[nodes/BaseNode](#module_nodes/BaseNode)</code>  

| Param |
| --- |
| angle | 

<a name="module_nodes/CircleNode"></a>

## nodes/CircleNode

* [nodes/CircleNode](#module_nodes/CircleNode)
    * [CircleNode](#exp_module_nodes/CircleNode--CircleNode) ⇐ <code>[nodes/BaseNode](#module_nodes/BaseNode)</code> ⏏
        * [new CircleNode(j2DsEngine, pos, radius, color)](#new_module_nodes/CircleNode--CircleNode_new)
        * [.draw()](#module_nodes/CircleNode--CircleNode+draw)
        * [.drawBox()](#module_nodes/BaseNode+drawBox)
        * [.getAlpha()](#module_nodes/BaseNode+getAlpha) ⇒ <code>\*</code> &#124; <code>number</code>
        * [.getBox(node)](#module_nodes/BaseNode+getBox) ⇒ <code>Object</code>
        * [.getBoxVertices(node)](#module_nodes/BaseNode+getBoxVertices) ⇒ <code>Array.&lt;{x: number, y: number}&gt;</code>
        * [.getDistance(id)](#module_nodes/BaseNode+getDistance) ⇒ <code>number</code>
        * [.getDistanceXY(id)](#module_nodes/BaseNode+getDistanceXY) ⇒ <code>Object</code> &#124; <code>Object</code>
        * [.getLayer()](#module_nodes/BaseNode+getLayer) ⇒ <code>\*</code>
        * [.getPosition()](#module_nodes/BaseNode+getPosition) ⇒ <code>Object</code> &#124; <code>Object</code>
        * [.getRotation()](#module_nodes/BaseNode+getRotation) ⇒ <code>number</code> &#124; <code>\*</code>
        * [.getSize()](#module_nodes/BaseNode+getSize) ⇒ <code>\*</code>
        * [.isCollision(id)](#module_nodes/BaseNode+isCollision) ⇒ <code>boolean</code>
        * [.isIntersect(node2)](#module_nodes/BaseNode+isIntersect) ⇒ <code>\*</code>
        * [.isLookScene()](#module_nodes/BaseNode+isLookScene) ⇒ <code>boolean</code>
        * [.isOutScene()](#module_nodes/BaseNode+isOutScene) ⇒ <code>Object</code>
        * [.isPointInsideBox(vf, point)](#module_nodes/BaseNode+isPointInsideBox) ⇒ <code>boolean</code>
        * [.isVisible()](#module_nodes/BaseNode+isVisible) ⇒ <code>boolean</code> &#124; <code>\*</code>
        * [.move(pos)](#module_nodes/BaseNode+move)
        * [.moveDir(speed)](#module_nodes/BaseNode+moveDir)
        * [.moveTo(to, t)](#module_nodes/BaseNode+moveTo)
        * [.resizeBox(offset, size)](#module_nodes/BaseNode+resizeBox)
        * [.rotateTo(to, t)](#module_nodes/BaseNode+rotateTo)
        * [.setAlpha(alpha)](#module_nodes/BaseNode+setAlpha)
        * [.setLayer(layer)](#module_nodes/BaseNode+setLayer)
        * [.setParent(id)](#module_nodes/BaseNode+setParent)
        * [.setPosition(pos)](#module_nodes/BaseNode+setPosition) ⇒ <code>\*</code>
        * [.setRotation(angle)](#module_nodes/BaseNode+setRotation)
        * [.setSize(size)](#module_nodes/BaseNode+setSize) ⇒ <code>\*</code>
        * [.setVisible(visible)](#module_nodes/BaseNode+setVisible)
        * [.turn(angle)](#module_nodes/BaseNode+turn)

<a name="exp_module_nodes/CircleNode--CircleNode"></a>

### CircleNode ⇐ <code>[nodes/BaseNode](#module_nodes/BaseNode)</code> ⏏
CircleNode

**Kind**: Exported class  
**Extends:** <code>[nodes/BaseNode](#module_nodes/BaseNode)</code>  
**Properties**

| Name | Type |
| --- | --- |
| color | <code>string</code> | 
| radius | <code>number</code> | 

<a name="new_module_nodes/CircleNode--CircleNode_new"></a>

#### new CircleNode(j2DsEngine, pos, radius, color)
Примитивный узел для отрисовки круга.


| Param | Type |
| --- | --- |
| j2DsEngine | <code>j2DsEngine</code> | 
| pos | <code>Object</code> | 
| radius | <code>number</code> | 
| color | <code>string</code> | 

<a name="module_nodes/CircleNode--CircleNode+draw"></a>

#### circleNode.draw()
Метод для отрисовки узла

**Kind**: instance method of <code>[CircleNode](#exp_module_nodes/CircleNode--CircleNode)</code>  
<a name="module_nodes/BaseNode+drawBox"></a>

#### circleNode.drawBox()
**Kind**: instance method of <code>[CircleNode](#exp_module_nodes/CircleNode--CircleNode)</code>  
<a name="module_nodes/BaseNode+getAlpha"></a>

#### circleNode.getAlpha() ⇒ <code>\*</code> &#124; <code>number</code>
**Kind**: instance method of <code>[CircleNode](#exp_module_nodes/CircleNode--CircleNode)</code>  
<a name="module_nodes/BaseNode+getBox"></a>

#### circleNode.getBox(node) ⇒ <code>Object</code>
**Kind**: instance method of <code>[CircleNode](#exp_module_nodes/CircleNode--CircleNode)</code>  

| Param |
| --- |
| node | 

<a name="module_nodes/BaseNode+getBoxVertices"></a>

#### circleNode.getBoxVertices(node) ⇒ <code>Array.&lt;{x: number, y: number}&gt;</code>
**Kind**: instance method of <code>[CircleNode](#exp_module_nodes/CircleNode--CircleNode)</code>  

| Param | Type |
| --- | --- |
| node | <code>BaseNode</code> | 

<a name="module_nodes/BaseNode+getDistance"></a>

#### circleNode.getDistance(id) ⇒ <code>number</code>
**Kind**: instance method of <code>[CircleNode](#exp_module_nodes/CircleNode--CircleNode)</code>  

| Param |
| --- |
| id | 

<a name="module_nodes/BaseNode+getDistanceXY"></a>

#### circleNode.getDistanceXY(id) ⇒ <code>Object</code> &#124; <code>Object</code>
**Kind**: instance method of <code>[CircleNode](#exp_module_nodes/CircleNode--CircleNode)</code>  

| Param |
| --- |
| id | 

<a name="module_nodes/BaseNode+getLayer"></a>

#### circleNode.getLayer() ⇒ <code>\*</code>
**Kind**: instance method of <code>[CircleNode](#exp_module_nodes/CircleNode--CircleNode)</code>  
<a name="module_nodes/BaseNode+getPosition"></a>

#### circleNode.getPosition() ⇒ <code>Object</code> &#124; <code>Object</code>
**Kind**: instance method of <code>[CircleNode](#exp_module_nodes/CircleNode--CircleNode)</code>  
<a name="module_nodes/BaseNode+getRotation"></a>

#### circleNode.getRotation() ⇒ <code>number</code> &#124; <code>\*</code>
**Kind**: instance method of <code>[CircleNode](#exp_module_nodes/CircleNode--CircleNode)</code>  
<a name="module_nodes/BaseNode+getSize"></a>

#### circleNode.getSize() ⇒ <code>\*</code>
**Kind**: instance method of <code>[CircleNode](#exp_module_nodes/CircleNode--CircleNode)</code>  
<a name="module_nodes/BaseNode+isCollision"></a>

#### circleNode.isCollision(id) ⇒ <code>boolean</code>
**Kind**: instance method of <code>[CircleNode](#exp_module_nodes/CircleNode--CircleNode)</code>  

| Param |
| --- |
| id | 

<a name="module_nodes/BaseNode+isIntersect"></a>

#### circleNode.isIntersect(node2) ⇒ <code>\*</code>
**Kind**: instance method of <code>[CircleNode](#exp_module_nodes/CircleNode--CircleNode)</code>  

| Param |
| --- |
| node2 | 

<a name="module_nodes/BaseNode+isLookScene"></a>

#### circleNode.isLookScene() ⇒ <code>boolean</code>
**Kind**: instance method of <code>[CircleNode](#exp_module_nodes/CircleNode--CircleNode)</code>  
<a name="module_nodes/BaseNode+isOutScene"></a>

#### circleNode.isOutScene() ⇒ <code>Object</code>
**Kind**: instance method of <code>[CircleNode](#exp_module_nodes/CircleNode--CircleNode)</code>  
<a name="module_nodes/BaseNode+isPointInsideBox"></a>

#### circleNode.isPointInsideBox(vf, point) ⇒ <code>boolean</code>
**Kind**: instance method of <code>[CircleNode](#exp_module_nodes/CircleNode--CircleNode)</code>  

| Param |
| --- |
| vf | 
| point | 

<a name="module_nodes/BaseNode+isVisible"></a>

#### circleNode.isVisible() ⇒ <code>boolean</code> &#124; <code>\*</code>
**Kind**: instance method of <code>[CircleNode](#exp_module_nodes/CircleNode--CircleNode)</code>  
<a name="module_nodes/BaseNode+move"></a>

#### circleNode.move(pos)
**Kind**: instance method of <code>[CircleNode](#exp_module_nodes/CircleNode--CircleNode)</code>  

| Param |
| --- |
| pos | 

<a name="module_nodes/BaseNode+moveDir"></a>

#### circleNode.moveDir(speed)
**Kind**: instance method of <code>[CircleNode](#exp_module_nodes/CircleNode--CircleNode)</code>  

| Param |
| --- |
| speed | 

<a name="module_nodes/BaseNode+moveTo"></a>

#### circleNode.moveTo(to, t)
**Kind**: instance method of <code>[CircleNode](#exp_module_nodes/CircleNode--CircleNode)</code>  

| Param |
| --- |
| to | 
| t | 

<a name="module_nodes/BaseNode+resizeBox"></a>

#### circleNode.resizeBox(offset, size)
**Kind**: instance method of <code>[CircleNode](#exp_module_nodes/CircleNode--CircleNode)</code>  

| Param |
| --- |
| offset | 
| size | 

<a name="module_nodes/BaseNode+rotateTo"></a>

#### circleNode.rotateTo(to, t)
**Kind**: instance method of <code>[CircleNode](#exp_module_nodes/CircleNode--CircleNode)</code>  

| Param |
| --- |
| to | 
| t | 

<a name="module_nodes/BaseNode+setAlpha"></a>

#### circleNode.setAlpha(alpha)
**Kind**: instance method of <code>[CircleNode](#exp_module_nodes/CircleNode--CircleNode)</code>  

| Param |
| --- |
| alpha | 

<a name="module_nodes/BaseNode+setLayer"></a>

#### circleNode.setLayer(layer)
**Kind**: instance method of <code>[CircleNode](#exp_module_nodes/CircleNode--CircleNode)</code>  

| Param |
| --- |
| layer | 

<a name="module_nodes/BaseNode+setParent"></a>

#### circleNode.setParent(id)
**Kind**: instance method of <code>[CircleNode](#exp_module_nodes/CircleNode--CircleNode)</code>  

| Param |
| --- |
| id | 

<a name="module_nodes/BaseNode+setPosition"></a>

#### circleNode.setPosition(pos) ⇒ <code>\*</code>
**Kind**: instance method of <code>[CircleNode](#exp_module_nodes/CircleNode--CircleNode)</code>  

| Param |
| --- |
| pos | 

<a name="module_nodes/BaseNode+setRotation"></a>

#### circleNode.setRotation(angle)
**Kind**: instance method of <code>[CircleNode](#exp_module_nodes/CircleNode--CircleNode)</code>  

| Param |
| --- |
| angle | 

<a name="module_nodes/BaseNode+setSize"></a>

#### circleNode.setSize(size) ⇒ <code>\*</code>
**Kind**: instance method of <code>[CircleNode](#exp_module_nodes/CircleNode--CircleNode)</code>  

| Param |
| --- |
| size | 

<a name="module_nodes/BaseNode+setVisible"></a>

#### circleNode.setVisible(visible)
**Kind**: instance method of <code>[CircleNode](#exp_module_nodes/CircleNode--CircleNode)</code>  

| Param |
| --- |
| visible | 

<a name="module_nodes/BaseNode+turn"></a>

#### circleNode.turn(angle)
**Kind**: instance method of <code>[CircleNode](#exp_module_nodes/CircleNode--CircleNode)</code>  

| Param |
| --- |
| angle | 

<a name="module_nodes/LineNode"></a>

## nodes/LineNode

* [nodes/LineNode](#module_nodes/LineNode)
    * [LineNode](#exp_module_nodes/LineNode--LineNode) ⇐ <code>[nodes/BaseNode](#module_nodes/BaseNode)</code> ⏏
        * [new LineNode(j2DsEngine, pos, points, scale, color, width, fill, cFill)](#new_module_nodes/LineNode--LineNode_new)
        * [.draw()](#module_nodes/LineNode--LineNode+draw)
        * [.drawBox()](#module_nodes/BaseNode+drawBox)
        * [.getAlpha()](#module_nodes/BaseNode+getAlpha) ⇒ <code>\*</code> &#124; <code>number</code>
        * [.getBox(node)](#module_nodes/BaseNode+getBox) ⇒ <code>Object</code>
        * [.getBoxVertices(node)](#module_nodes/BaseNode+getBoxVertices) ⇒ <code>Array.&lt;{x: number, y: number}&gt;</code>
        * [.getDistance(id)](#module_nodes/BaseNode+getDistance) ⇒ <code>number</code>
        * [.getDistanceXY(id)](#module_nodes/BaseNode+getDistanceXY) ⇒ <code>Object</code> &#124; <code>Object</code>
        * [.getLayer()](#module_nodes/BaseNode+getLayer) ⇒ <code>\*</code>
        * [.getPosition()](#module_nodes/BaseNode+getPosition) ⇒ <code>Object</code> &#124; <code>Object</code>
        * [.getRotation()](#module_nodes/BaseNode+getRotation) ⇒ <code>number</code> &#124; <code>\*</code>
        * [.getSize()](#module_nodes/BaseNode+getSize) ⇒ <code>\*</code>
        * [.isCollision(id)](#module_nodes/BaseNode+isCollision) ⇒ <code>boolean</code>
        * [.isIntersect(node2)](#module_nodes/BaseNode+isIntersect) ⇒ <code>\*</code>
        * [.isLookScene()](#module_nodes/BaseNode+isLookScene) ⇒ <code>boolean</code>
        * [.isOutScene()](#module_nodes/BaseNode+isOutScene) ⇒ <code>Object</code>
        * [.isPointInsideBox(vf, point)](#module_nodes/BaseNode+isPointInsideBox) ⇒ <code>boolean</code>
        * [.isVisible()](#module_nodes/BaseNode+isVisible) ⇒ <code>boolean</code> &#124; <code>\*</code>
        * [.move(pos)](#module_nodes/BaseNode+move)
        * [.moveDir(speed)](#module_nodes/BaseNode+moveDir)
        * [.moveTo(to, t)](#module_nodes/BaseNode+moveTo)
        * [.resizeBox(offset, size)](#module_nodes/BaseNode+resizeBox)
        * [.rotateTo(to, t)](#module_nodes/BaseNode+rotateTo)
        * [.setAlpha(alpha)](#module_nodes/BaseNode+setAlpha)
        * [.setLayer(layer)](#module_nodes/BaseNode+setLayer)
        * [.setParent(id)](#module_nodes/BaseNode+setParent)
        * [.setPosition(pos)](#module_nodes/BaseNode+setPosition) ⇒ <code>\*</code>
        * [.setRotation(angle)](#module_nodes/BaseNode+setRotation)
        * [.setSize(size)](#module_nodes/BaseNode+setSize) ⇒ <code>\*</code>
        * [.setVisible(visible)](#module_nodes/BaseNode+setVisible)
        * [.turn(angle)](#module_nodes/BaseNode+turn)

<a name="exp_module_nodes/LineNode--LineNode"></a>

### LineNode ⇐ <code>[nodes/BaseNode](#module_nodes/BaseNode)</code> ⏏
LineNode

**Kind**: Exported class  
**Extends:** <code>[nodes/BaseNode](#module_nodes/BaseNode)</code>  
**Properties**

| Name | Type |
| --- | --- |
| color | <code>string</code> | 
| points | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | 
| fill | <code>boolean</code> | 
| scale | <code>number</code> | 
| cFill | <code>string</code> | 
| lineWidth | <code>number</code> | 

<a name="new_module_nodes/LineNode--LineNode_new"></a>

#### new LineNode(j2DsEngine, pos, points, scale, color, width, fill, cFill)
Примитивный узел для отрисовки линии.


| Param | Type |
| --- | --- |
| j2DsEngine | <code>j2DsEngine</code> | 
| pos | <code>Object</code> | 
| points | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | 
| scale | <code>number</code> | 
| color | <code>string</code> | 
| width | <code>number</code> | 
| fill | <code>boolean</code> | 
| cFill | <code>string</code> | 

<a name="module_nodes/LineNode--LineNode+draw"></a>

#### lineNode.draw()
Метод для отрисовки узла

**Kind**: instance method of <code>[LineNode](#exp_module_nodes/LineNode--LineNode)</code>  
<a name="module_nodes/BaseNode+drawBox"></a>

#### lineNode.drawBox()
**Kind**: instance method of <code>[LineNode](#exp_module_nodes/LineNode--LineNode)</code>  
<a name="module_nodes/BaseNode+getAlpha"></a>

#### lineNode.getAlpha() ⇒ <code>\*</code> &#124; <code>number</code>
**Kind**: instance method of <code>[LineNode](#exp_module_nodes/LineNode--LineNode)</code>  
<a name="module_nodes/BaseNode+getBox"></a>

#### lineNode.getBox(node) ⇒ <code>Object</code>
**Kind**: instance method of <code>[LineNode](#exp_module_nodes/LineNode--LineNode)</code>  

| Param |
| --- |
| node | 

<a name="module_nodes/BaseNode+getBoxVertices"></a>

#### lineNode.getBoxVertices(node) ⇒ <code>Array.&lt;{x: number, y: number}&gt;</code>
**Kind**: instance method of <code>[LineNode](#exp_module_nodes/LineNode--LineNode)</code>  

| Param | Type |
| --- | --- |
| node | <code>BaseNode</code> | 

<a name="module_nodes/BaseNode+getDistance"></a>

#### lineNode.getDistance(id) ⇒ <code>number</code>
**Kind**: instance method of <code>[LineNode](#exp_module_nodes/LineNode--LineNode)</code>  

| Param |
| --- |
| id | 

<a name="module_nodes/BaseNode+getDistanceXY"></a>

#### lineNode.getDistanceXY(id) ⇒ <code>Object</code> &#124; <code>Object</code>
**Kind**: instance method of <code>[LineNode](#exp_module_nodes/LineNode--LineNode)</code>  

| Param |
| --- |
| id | 

<a name="module_nodes/BaseNode+getLayer"></a>

#### lineNode.getLayer() ⇒ <code>\*</code>
**Kind**: instance method of <code>[LineNode](#exp_module_nodes/LineNode--LineNode)</code>  
<a name="module_nodes/BaseNode+getPosition"></a>

#### lineNode.getPosition() ⇒ <code>Object</code> &#124; <code>Object</code>
**Kind**: instance method of <code>[LineNode](#exp_module_nodes/LineNode--LineNode)</code>  
<a name="module_nodes/BaseNode+getRotation"></a>

#### lineNode.getRotation() ⇒ <code>number</code> &#124; <code>\*</code>
**Kind**: instance method of <code>[LineNode](#exp_module_nodes/LineNode--LineNode)</code>  
<a name="module_nodes/BaseNode+getSize"></a>

#### lineNode.getSize() ⇒ <code>\*</code>
**Kind**: instance method of <code>[LineNode](#exp_module_nodes/LineNode--LineNode)</code>  
<a name="module_nodes/BaseNode+isCollision"></a>

#### lineNode.isCollision(id) ⇒ <code>boolean</code>
**Kind**: instance method of <code>[LineNode](#exp_module_nodes/LineNode--LineNode)</code>  

| Param |
| --- |
| id | 

<a name="module_nodes/BaseNode+isIntersect"></a>

#### lineNode.isIntersect(node2) ⇒ <code>\*</code>
**Kind**: instance method of <code>[LineNode](#exp_module_nodes/LineNode--LineNode)</code>  

| Param |
| --- |
| node2 | 

<a name="module_nodes/BaseNode+isLookScene"></a>

#### lineNode.isLookScene() ⇒ <code>boolean</code>
**Kind**: instance method of <code>[LineNode](#exp_module_nodes/LineNode--LineNode)</code>  
<a name="module_nodes/BaseNode+isOutScene"></a>

#### lineNode.isOutScene() ⇒ <code>Object</code>
**Kind**: instance method of <code>[LineNode](#exp_module_nodes/LineNode--LineNode)</code>  
<a name="module_nodes/BaseNode+isPointInsideBox"></a>

#### lineNode.isPointInsideBox(vf, point) ⇒ <code>boolean</code>
**Kind**: instance method of <code>[LineNode](#exp_module_nodes/LineNode--LineNode)</code>  

| Param |
| --- |
| vf | 
| point | 

<a name="module_nodes/BaseNode+isVisible"></a>

#### lineNode.isVisible() ⇒ <code>boolean</code> &#124; <code>\*</code>
**Kind**: instance method of <code>[LineNode](#exp_module_nodes/LineNode--LineNode)</code>  
<a name="module_nodes/BaseNode+move"></a>

#### lineNode.move(pos)
**Kind**: instance method of <code>[LineNode](#exp_module_nodes/LineNode--LineNode)</code>  

| Param |
| --- |
| pos | 

<a name="module_nodes/BaseNode+moveDir"></a>

#### lineNode.moveDir(speed)
**Kind**: instance method of <code>[LineNode](#exp_module_nodes/LineNode--LineNode)</code>  

| Param |
| --- |
| speed | 

<a name="module_nodes/BaseNode+moveTo"></a>

#### lineNode.moveTo(to, t)
**Kind**: instance method of <code>[LineNode](#exp_module_nodes/LineNode--LineNode)</code>  

| Param |
| --- |
| to | 
| t | 

<a name="module_nodes/BaseNode+resizeBox"></a>

#### lineNode.resizeBox(offset, size)
**Kind**: instance method of <code>[LineNode](#exp_module_nodes/LineNode--LineNode)</code>  

| Param |
| --- |
| offset | 
| size | 

<a name="module_nodes/BaseNode+rotateTo"></a>

#### lineNode.rotateTo(to, t)
**Kind**: instance method of <code>[LineNode](#exp_module_nodes/LineNode--LineNode)</code>  

| Param |
| --- |
| to | 
| t | 

<a name="module_nodes/BaseNode+setAlpha"></a>

#### lineNode.setAlpha(alpha)
**Kind**: instance method of <code>[LineNode](#exp_module_nodes/LineNode--LineNode)</code>  

| Param |
| --- |
| alpha | 

<a name="module_nodes/BaseNode+setLayer"></a>

#### lineNode.setLayer(layer)
**Kind**: instance method of <code>[LineNode](#exp_module_nodes/LineNode--LineNode)</code>  

| Param |
| --- |
| layer | 

<a name="module_nodes/BaseNode+setParent"></a>

#### lineNode.setParent(id)
**Kind**: instance method of <code>[LineNode](#exp_module_nodes/LineNode--LineNode)</code>  

| Param |
| --- |
| id | 

<a name="module_nodes/BaseNode+setPosition"></a>

#### lineNode.setPosition(pos) ⇒ <code>\*</code>
**Kind**: instance method of <code>[LineNode](#exp_module_nodes/LineNode--LineNode)</code>  

| Param |
| --- |
| pos | 

<a name="module_nodes/BaseNode+setRotation"></a>

#### lineNode.setRotation(angle)
**Kind**: instance method of <code>[LineNode](#exp_module_nodes/LineNode--LineNode)</code>  

| Param |
| --- |
| angle | 

<a name="module_nodes/BaseNode+setSize"></a>

#### lineNode.setSize(size) ⇒ <code>\*</code>
**Kind**: instance method of <code>[LineNode](#exp_module_nodes/LineNode--LineNode)</code>  

| Param |
| --- |
| size | 

<a name="module_nodes/BaseNode+setVisible"></a>

#### lineNode.setVisible(visible)
**Kind**: instance method of <code>[LineNode](#exp_module_nodes/LineNode--LineNode)</code>  

| Param |
| --- |
| visible | 

<a name="module_nodes/BaseNode+turn"></a>

#### lineNode.turn(angle)
**Kind**: instance method of <code>[LineNode](#exp_module_nodes/LineNode--LineNode)</code>  

| Param |
| --- |
| angle | 

<a name="module_nodes/RectNode"></a>

## nodes/RectNode

* [nodes/RectNode](#module_nodes/RectNode)
    * [RectNode](#exp_module_nodes/RectNode--RectNode) ⇐ <code>[nodes/BaseNode](#module_nodes/BaseNode)</code> ⏏
        * [new RectNode(j2DsEngine, pos, size, color)](#new_module_nodes/RectNode--RectNode_new)
        * [.draw()](#module_nodes/RectNode--RectNode+draw)
        * [.drawBox()](#module_nodes/BaseNode+drawBox)
        * [.getAlpha()](#module_nodes/BaseNode+getAlpha) ⇒ <code>\*</code> &#124; <code>number</code>
        * [.getBox(node)](#module_nodes/BaseNode+getBox) ⇒ <code>Object</code>
        * [.getBoxVertices(node)](#module_nodes/BaseNode+getBoxVertices) ⇒ <code>Array.&lt;{x: number, y: number}&gt;</code>
        * [.getDistance(id)](#module_nodes/BaseNode+getDistance) ⇒ <code>number</code>
        * [.getDistanceXY(id)](#module_nodes/BaseNode+getDistanceXY) ⇒ <code>Object</code> &#124; <code>Object</code>
        * [.getLayer()](#module_nodes/BaseNode+getLayer) ⇒ <code>\*</code>
        * [.getPosition()](#module_nodes/BaseNode+getPosition) ⇒ <code>Object</code> &#124; <code>Object</code>
        * [.getRotation()](#module_nodes/BaseNode+getRotation) ⇒ <code>number</code> &#124; <code>\*</code>
        * [.getSize()](#module_nodes/BaseNode+getSize) ⇒ <code>\*</code>
        * [.isCollision(id)](#module_nodes/BaseNode+isCollision) ⇒ <code>boolean</code>
        * [.isIntersect(node2)](#module_nodes/BaseNode+isIntersect) ⇒ <code>\*</code>
        * [.isLookScene()](#module_nodes/BaseNode+isLookScene) ⇒ <code>boolean</code>
        * [.isOutScene()](#module_nodes/BaseNode+isOutScene) ⇒ <code>Object</code>
        * [.isPointInsideBox(vf, point)](#module_nodes/BaseNode+isPointInsideBox) ⇒ <code>boolean</code>
        * [.isVisible()](#module_nodes/BaseNode+isVisible) ⇒ <code>boolean</code> &#124; <code>\*</code>
        * [.move(pos)](#module_nodes/BaseNode+move)
        * [.moveDir(speed)](#module_nodes/BaseNode+moveDir)
        * [.moveTo(to, t)](#module_nodes/BaseNode+moveTo)
        * [.resizeBox(offset, size)](#module_nodes/BaseNode+resizeBox)
        * [.rotateTo(to, t)](#module_nodes/BaseNode+rotateTo)
        * [.setAlpha(alpha)](#module_nodes/BaseNode+setAlpha)
        * [.setLayer(layer)](#module_nodes/BaseNode+setLayer)
        * [.setParent(id)](#module_nodes/BaseNode+setParent)
        * [.setPosition(pos)](#module_nodes/BaseNode+setPosition) ⇒ <code>\*</code>
        * [.setRotation(angle)](#module_nodes/BaseNode+setRotation)
        * [.setSize(size)](#module_nodes/BaseNode+setSize) ⇒ <code>\*</code>
        * [.setVisible(visible)](#module_nodes/BaseNode+setVisible)
        * [.turn(angle)](#module_nodes/BaseNode+turn)

<a name="exp_module_nodes/RectNode--RectNode"></a>

### RectNode ⇐ <code>[nodes/BaseNode](#module_nodes/BaseNode)</code> ⏏
RectNode

**Kind**: Exported class  
**Extends:** <code>[nodes/BaseNode](#module_nodes/BaseNode)</code>  
**Properties**

| Name | Type |
| --- | --- |
| color | <code>string</code> | 

<a name="new_module_nodes/RectNode--RectNode_new"></a>

#### new RectNode(j2DsEngine, pos, size, color)
Примитивный узел для отрисовки прямоугольника.


| Param | Type |
| --- | --- |
| j2DsEngine | <code>j2DsEngine</code> | 
| pos | <code>Object</code> | 
| size | <code>Object</code> | 
| color | <code>string</code> | 

<a name="module_nodes/RectNode--RectNode+draw"></a>

#### rectNode.draw()
Метод для отрисовки узла

**Kind**: instance method of <code>[RectNode](#exp_module_nodes/RectNode--RectNode)</code>  
<a name="module_nodes/BaseNode+drawBox"></a>

#### rectNode.drawBox()
**Kind**: instance method of <code>[RectNode](#exp_module_nodes/RectNode--RectNode)</code>  
<a name="module_nodes/BaseNode+getAlpha"></a>

#### rectNode.getAlpha() ⇒ <code>\*</code> &#124; <code>number</code>
**Kind**: instance method of <code>[RectNode](#exp_module_nodes/RectNode--RectNode)</code>  
<a name="module_nodes/BaseNode+getBox"></a>

#### rectNode.getBox(node) ⇒ <code>Object</code>
**Kind**: instance method of <code>[RectNode](#exp_module_nodes/RectNode--RectNode)</code>  

| Param |
| --- |
| node | 

<a name="module_nodes/BaseNode+getBoxVertices"></a>

#### rectNode.getBoxVertices(node) ⇒ <code>Array.&lt;{x: number, y: number}&gt;</code>
**Kind**: instance method of <code>[RectNode](#exp_module_nodes/RectNode--RectNode)</code>  

| Param | Type |
| --- | --- |
| node | <code>BaseNode</code> | 

<a name="module_nodes/BaseNode+getDistance"></a>

#### rectNode.getDistance(id) ⇒ <code>number</code>
**Kind**: instance method of <code>[RectNode](#exp_module_nodes/RectNode--RectNode)</code>  

| Param |
| --- |
| id | 

<a name="module_nodes/BaseNode+getDistanceXY"></a>

#### rectNode.getDistanceXY(id) ⇒ <code>Object</code> &#124; <code>Object</code>
**Kind**: instance method of <code>[RectNode](#exp_module_nodes/RectNode--RectNode)</code>  

| Param |
| --- |
| id | 

<a name="module_nodes/BaseNode+getLayer"></a>

#### rectNode.getLayer() ⇒ <code>\*</code>
**Kind**: instance method of <code>[RectNode](#exp_module_nodes/RectNode--RectNode)</code>  
<a name="module_nodes/BaseNode+getPosition"></a>

#### rectNode.getPosition() ⇒ <code>Object</code> &#124; <code>Object</code>
**Kind**: instance method of <code>[RectNode](#exp_module_nodes/RectNode--RectNode)</code>  
<a name="module_nodes/BaseNode+getRotation"></a>

#### rectNode.getRotation() ⇒ <code>number</code> &#124; <code>\*</code>
**Kind**: instance method of <code>[RectNode](#exp_module_nodes/RectNode--RectNode)</code>  
<a name="module_nodes/BaseNode+getSize"></a>

#### rectNode.getSize() ⇒ <code>\*</code>
**Kind**: instance method of <code>[RectNode](#exp_module_nodes/RectNode--RectNode)</code>  
<a name="module_nodes/BaseNode+isCollision"></a>

#### rectNode.isCollision(id) ⇒ <code>boolean</code>
**Kind**: instance method of <code>[RectNode](#exp_module_nodes/RectNode--RectNode)</code>  

| Param |
| --- |
| id | 

<a name="module_nodes/BaseNode+isIntersect"></a>

#### rectNode.isIntersect(node2) ⇒ <code>\*</code>
**Kind**: instance method of <code>[RectNode](#exp_module_nodes/RectNode--RectNode)</code>  

| Param |
| --- |
| node2 | 

<a name="module_nodes/BaseNode+isLookScene"></a>

#### rectNode.isLookScene() ⇒ <code>boolean</code>
**Kind**: instance method of <code>[RectNode](#exp_module_nodes/RectNode--RectNode)</code>  
<a name="module_nodes/BaseNode+isOutScene"></a>

#### rectNode.isOutScene() ⇒ <code>Object</code>
**Kind**: instance method of <code>[RectNode](#exp_module_nodes/RectNode--RectNode)</code>  
<a name="module_nodes/BaseNode+isPointInsideBox"></a>

#### rectNode.isPointInsideBox(vf, point) ⇒ <code>boolean</code>
**Kind**: instance method of <code>[RectNode](#exp_module_nodes/RectNode--RectNode)</code>  

| Param |
| --- |
| vf | 
| point | 

<a name="module_nodes/BaseNode+isVisible"></a>

#### rectNode.isVisible() ⇒ <code>boolean</code> &#124; <code>\*</code>
**Kind**: instance method of <code>[RectNode](#exp_module_nodes/RectNode--RectNode)</code>  
<a name="module_nodes/BaseNode+move"></a>

#### rectNode.move(pos)
**Kind**: instance method of <code>[RectNode](#exp_module_nodes/RectNode--RectNode)</code>  

| Param |
| --- |
| pos | 

<a name="module_nodes/BaseNode+moveDir"></a>

#### rectNode.moveDir(speed)
**Kind**: instance method of <code>[RectNode](#exp_module_nodes/RectNode--RectNode)</code>  

| Param |
| --- |
| speed | 

<a name="module_nodes/BaseNode+moveTo"></a>

#### rectNode.moveTo(to, t)
**Kind**: instance method of <code>[RectNode](#exp_module_nodes/RectNode--RectNode)</code>  

| Param |
| --- |
| to | 
| t | 

<a name="module_nodes/BaseNode+resizeBox"></a>

#### rectNode.resizeBox(offset, size)
**Kind**: instance method of <code>[RectNode](#exp_module_nodes/RectNode--RectNode)</code>  

| Param |
| --- |
| offset | 
| size | 

<a name="module_nodes/BaseNode+rotateTo"></a>

#### rectNode.rotateTo(to, t)
**Kind**: instance method of <code>[RectNode](#exp_module_nodes/RectNode--RectNode)</code>  

| Param |
| --- |
| to | 
| t | 

<a name="module_nodes/BaseNode+setAlpha"></a>

#### rectNode.setAlpha(alpha)
**Kind**: instance method of <code>[RectNode](#exp_module_nodes/RectNode--RectNode)</code>  

| Param |
| --- |
| alpha | 

<a name="module_nodes/BaseNode+setLayer"></a>

#### rectNode.setLayer(layer)
**Kind**: instance method of <code>[RectNode](#exp_module_nodes/RectNode--RectNode)</code>  

| Param |
| --- |
| layer | 

<a name="module_nodes/BaseNode+setParent"></a>

#### rectNode.setParent(id)
**Kind**: instance method of <code>[RectNode](#exp_module_nodes/RectNode--RectNode)</code>  

| Param |
| --- |
| id | 

<a name="module_nodes/BaseNode+setPosition"></a>

#### rectNode.setPosition(pos) ⇒ <code>\*</code>
**Kind**: instance method of <code>[RectNode](#exp_module_nodes/RectNode--RectNode)</code>  

| Param |
| --- |
| pos | 

<a name="module_nodes/BaseNode+setRotation"></a>

#### rectNode.setRotation(angle)
**Kind**: instance method of <code>[RectNode](#exp_module_nodes/RectNode--RectNode)</code>  

| Param |
| --- |
| angle | 

<a name="module_nodes/BaseNode+setSize"></a>

#### rectNode.setSize(size) ⇒ <code>\*</code>
**Kind**: instance method of <code>[RectNode](#exp_module_nodes/RectNode--RectNode)</code>  

| Param |
| --- |
| size | 

<a name="module_nodes/BaseNode+setVisible"></a>

#### rectNode.setVisible(visible)
**Kind**: instance method of <code>[RectNode](#exp_module_nodes/RectNode--RectNode)</code>  

| Param |
| --- |
| visible | 

<a name="module_nodes/BaseNode+turn"></a>

#### rectNode.turn(angle)
**Kind**: instance method of <code>[RectNode](#exp_module_nodes/RectNode--RectNode)</code>  

| Param |
| --- |
| angle | 

<a name="module_nodes/SpriteNode"></a>

## nodes/SpriteNode

* [nodes/SpriteNode](#module_nodes/SpriteNode)
    * [SpriteNode](#exp_module_nodes/SpriteNode--SpriteNode) ⇐ <code>[nodes/BaseNode](#module_nodes/BaseNode)</code> ⏏
        * [new SpriteNode(j2DsEngine, pos, size, animation)](#new_module_nodes/SpriteNode--SpriteNode_new)
        * [.draw()](#module_nodes/SpriteNode--SpriteNode+draw)
        * [.drawBox()](#module_nodes/BaseNode+drawBox)
        * [.drawFrame(frame)](#module_nodes/SpriteNode--SpriteNode+drawFrame) ⇒ <code>void</code> &#124; <code>Object</code>
        * [.getAlpha()](#module_nodes/BaseNode+getAlpha) ⇒ <code>\*</code> &#124; <code>number</code>
        * [.getBox(node)](#module_nodes/BaseNode+getBox) ⇒ <code>Object</code>
        * [.getBoxVertices(node)](#module_nodes/BaseNode+getBoxVertices) ⇒ <code>Array.&lt;{x: number, y: number}&gt;</code>
        * [.getDistance(id)](#module_nodes/BaseNode+getDistance) ⇒ <code>number</code>
        * [.getDistanceXY(id)](#module_nodes/BaseNode+getDistanceXY) ⇒ <code>Object</code> &#124; <code>Object</code>
        * [.getLayer()](#module_nodes/BaseNode+getLayer) ⇒ <code>\*</code>
        * [.getPosition()](#module_nodes/BaseNode+getPosition) ⇒ <code>Object</code> &#124; <code>Object</code>
        * [.getRotation()](#module_nodes/BaseNode+getRotation) ⇒ <code>number</code> &#124; <code>\*</code>
        * [.getSize()](#module_nodes/BaseNode+getSize) ⇒ <code>\*</code>
        * [.isCollision(id)](#module_nodes/BaseNode+isCollision) ⇒ <code>boolean</code>
        * [.isIntersect(node2)](#module_nodes/BaseNode+isIntersect) ⇒ <code>\*</code>
        * [.isLookScene()](#module_nodes/BaseNode+isLookScene) ⇒ <code>boolean</code>
        * [.isOutScene()](#module_nodes/BaseNode+isOutScene) ⇒ <code>Object</code>
        * [.isPointInsideBox(vf, point)](#module_nodes/BaseNode+isPointInsideBox) ⇒ <code>boolean</code>
        * [.isVisible()](#module_nodes/BaseNode+isVisible) ⇒ <code>boolean</code> &#124; <code>\*</code>
        * [.move(pos)](#module_nodes/BaseNode+move)
        * [.moveDir(speed)](#module_nodes/BaseNode+moveDir)
        * [.moveTo(to, t)](#module_nodes/BaseNode+moveTo)
        * [.resizeBox(offset, size)](#module_nodes/BaseNode+resizeBox)
        * [.rotateTo(to, t)](#module_nodes/BaseNode+rotateTo)
        * [.setAlpha(alpha)](#module_nodes/BaseNode+setAlpha)
        * [.setAnimation(animation)](#module_nodes/SpriteNode--SpriteNode+setAnimation)
        * [.setFlip(x, y)](#module_nodes/SpriteNode--SpriteNode+setFlip)
        * [.setLayer(layer)](#module_nodes/BaseNode+setLayer)
        * [.setParent(id)](#module_nodes/BaseNode+setParent)
        * [.setPosition(pos)](#module_nodes/BaseNode+setPosition) ⇒ <code>\*</code>
        * [.setRotation(angle)](#module_nodes/BaseNode+setRotation)
        * [.setSize(size)](#module_nodes/BaseNode+setSize) ⇒ <code>\*</code>
        * [.setVisible(visible)](#module_nodes/BaseNode+setVisible)
        * [.turn(angle)](#module_nodes/BaseNode+turn)

<a name="exp_module_nodes/SpriteNode--SpriteNode"></a>

### SpriteNode ⇐ <code>[nodes/BaseNode](#module_nodes/BaseNode)</code> ⏏
SpriteNode

**Kind**: Exported class  
**Extends:** <code>[nodes/BaseNode](#module_nodes/BaseNode)</code>  
**Properties**

| Name | Type |
| --- | --- |
| tmpSpeed | <code>number</code> | 
| frame | <code>number</code> | 
| animation | <code>Object</code> | 
| flip | <code>Object</code> | 

<a name="new_module_nodes/SpriteNode--SpriteNode_new"></a>

#### new SpriteNode(j2DsEngine, pos, size, animation)
Примитивный узел для отрисовки спрайта.


| Param | Type |
| --- | --- |
| j2DsEngine | <code>j2DsEngine</code> | 
| pos | <code>Object</code> | 
| size | <code>Object</code> | 
| animation | <code>Object</code> | 

<a name="module_nodes/SpriteNode--SpriteNode+draw"></a>

#### spriteNode.draw()
Метод для отрисовки узла

**Kind**: instance method of <code>[SpriteNode](#exp_module_nodes/SpriteNode--SpriteNode)</code>  
<a name="module_nodes/BaseNode+drawBox"></a>

#### spriteNode.drawBox()
**Kind**: instance method of <code>[SpriteNode](#exp_module_nodes/SpriteNode--SpriteNode)</code>  
<a name="module_nodes/SpriteNode--SpriteNode+drawFrame"></a>

#### spriteNode.drawFrame(frame) ⇒ <code>void</code> &#124; <code>Object</code>
Отрисовка одного кадра

**Kind**: instance method of <code>[SpriteNode](#exp_module_nodes/SpriteNode--SpriteNode)</code>  

| Param | Type |
| --- | --- |
| frame | <code>number</code> | 

<a name="module_nodes/BaseNode+getAlpha"></a>

#### spriteNode.getAlpha() ⇒ <code>\*</code> &#124; <code>number</code>
**Kind**: instance method of <code>[SpriteNode](#exp_module_nodes/SpriteNode--SpriteNode)</code>  
<a name="module_nodes/BaseNode+getBox"></a>

#### spriteNode.getBox(node) ⇒ <code>Object</code>
**Kind**: instance method of <code>[SpriteNode](#exp_module_nodes/SpriteNode--SpriteNode)</code>  

| Param |
| --- |
| node | 

<a name="module_nodes/BaseNode+getBoxVertices"></a>

#### spriteNode.getBoxVertices(node) ⇒ <code>Array.&lt;{x: number, y: number}&gt;</code>
**Kind**: instance method of <code>[SpriteNode](#exp_module_nodes/SpriteNode--SpriteNode)</code>  

| Param | Type |
| --- | --- |
| node | <code>BaseNode</code> | 

<a name="module_nodes/BaseNode+getDistance"></a>

#### spriteNode.getDistance(id) ⇒ <code>number</code>
**Kind**: instance method of <code>[SpriteNode](#exp_module_nodes/SpriteNode--SpriteNode)</code>  

| Param |
| --- |
| id | 

<a name="module_nodes/BaseNode+getDistanceXY"></a>

#### spriteNode.getDistanceXY(id) ⇒ <code>Object</code> &#124; <code>Object</code>
**Kind**: instance method of <code>[SpriteNode](#exp_module_nodes/SpriteNode--SpriteNode)</code>  

| Param |
| --- |
| id | 

<a name="module_nodes/BaseNode+getLayer"></a>

#### spriteNode.getLayer() ⇒ <code>\*</code>
**Kind**: instance method of <code>[SpriteNode](#exp_module_nodes/SpriteNode--SpriteNode)</code>  
<a name="module_nodes/BaseNode+getPosition"></a>

#### spriteNode.getPosition() ⇒ <code>Object</code> &#124; <code>Object</code>
**Kind**: instance method of <code>[SpriteNode](#exp_module_nodes/SpriteNode--SpriteNode)</code>  
<a name="module_nodes/BaseNode+getRotation"></a>

#### spriteNode.getRotation() ⇒ <code>number</code> &#124; <code>\*</code>
**Kind**: instance method of <code>[SpriteNode](#exp_module_nodes/SpriteNode--SpriteNode)</code>  
<a name="module_nodes/BaseNode+getSize"></a>

#### spriteNode.getSize() ⇒ <code>\*</code>
**Kind**: instance method of <code>[SpriteNode](#exp_module_nodes/SpriteNode--SpriteNode)</code>  
<a name="module_nodes/BaseNode+isCollision"></a>

#### spriteNode.isCollision(id) ⇒ <code>boolean</code>
**Kind**: instance method of <code>[SpriteNode](#exp_module_nodes/SpriteNode--SpriteNode)</code>  

| Param |
| --- |
| id | 

<a name="module_nodes/BaseNode+isIntersect"></a>

#### spriteNode.isIntersect(node2) ⇒ <code>\*</code>
**Kind**: instance method of <code>[SpriteNode](#exp_module_nodes/SpriteNode--SpriteNode)</code>  

| Param |
| --- |
| node2 | 

<a name="module_nodes/BaseNode+isLookScene"></a>

#### spriteNode.isLookScene() ⇒ <code>boolean</code>
**Kind**: instance method of <code>[SpriteNode](#exp_module_nodes/SpriteNode--SpriteNode)</code>  
<a name="module_nodes/BaseNode+isOutScene"></a>

#### spriteNode.isOutScene() ⇒ <code>Object</code>
**Kind**: instance method of <code>[SpriteNode](#exp_module_nodes/SpriteNode--SpriteNode)</code>  
<a name="module_nodes/BaseNode+isPointInsideBox"></a>

#### spriteNode.isPointInsideBox(vf, point) ⇒ <code>boolean</code>
**Kind**: instance method of <code>[SpriteNode](#exp_module_nodes/SpriteNode--SpriteNode)</code>  

| Param |
| --- |
| vf | 
| point | 

<a name="module_nodes/BaseNode+isVisible"></a>

#### spriteNode.isVisible() ⇒ <code>boolean</code> &#124; <code>\*</code>
**Kind**: instance method of <code>[SpriteNode](#exp_module_nodes/SpriteNode--SpriteNode)</code>  
<a name="module_nodes/BaseNode+move"></a>

#### spriteNode.move(pos)
**Kind**: instance method of <code>[SpriteNode](#exp_module_nodes/SpriteNode--SpriteNode)</code>  

| Param |
| --- |
| pos | 

<a name="module_nodes/BaseNode+moveDir"></a>

#### spriteNode.moveDir(speed)
**Kind**: instance method of <code>[SpriteNode](#exp_module_nodes/SpriteNode--SpriteNode)</code>  

| Param |
| --- |
| speed | 

<a name="module_nodes/BaseNode+moveTo"></a>

#### spriteNode.moveTo(to, t)
**Kind**: instance method of <code>[SpriteNode](#exp_module_nodes/SpriteNode--SpriteNode)</code>  

| Param |
| --- |
| to | 
| t | 

<a name="module_nodes/BaseNode+resizeBox"></a>

#### spriteNode.resizeBox(offset, size)
**Kind**: instance method of <code>[SpriteNode](#exp_module_nodes/SpriteNode--SpriteNode)</code>  

| Param |
| --- |
| offset | 
| size | 

<a name="module_nodes/BaseNode+rotateTo"></a>

#### spriteNode.rotateTo(to, t)
**Kind**: instance method of <code>[SpriteNode](#exp_module_nodes/SpriteNode--SpriteNode)</code>  

| Param |
| --- |
| to | 
| t | 

<a name="module_nodes/BaseNode+setAlpha"></a>

#### spriteNode.setAlpha(alpha)
**Kind**: instance method of <code>[SpriteNode](#exp_module_nodes/SpriteNode--SpriteNode)</code>  

| Param |
| --- |
| alpha | 

<a name="module_nodes/SpriteNode--SpriteNode+setAnimation"></a>

#### spriteNode.setAnimation(animation)
Устанавливает анимацию

**Kind**: instance method of <code>[SpriteNode](#exp_module_nodes/SpriteNode--SpriteNode)</code>  

| Param | Type |
| --- | --- |
| animation | <code>Object</code> | 

<a name="module_nodes/SpriteNode--SpriteNode+setFlip"></a>

#### spriteNode.setFlip(x, y)
//TODO Добавить описание этой херни

**Kind**: instance method of <code>[SpriteNode](#exp_module_nodes/SpriteNode--SpriteNode)</code>  

| Param | Type |
| --- | --- |
| x | <code>number</code> | 
| y | <code>number</code> | 

<a name="module_nodes/BaseNode+setLayer"></a>

#### spriteNode.setLayer(layer)
**Kind**: instance method of <code>[SpriteNode](#exp_module_nodes/SpriteNode--SpriteNode)</code>  

| Param |
| --- |
| layer | 

<a name="module_nodes/BaseNode+setParent"></a>

#### spriteNode.setParent(id)
**Kind**: instance method of <code>[SpriteNode](#exp_module_nodes/SpriteNode--SpriteNode)</code>  

| Param |
| --- |
| id | 

<a name="module_nodes/BaseNode+setPosition"></a>

#### spriteNode.setPosition(pos) ⇒ <code>\*</code>
**Kind**: instance method of <code>[SpriteNode](#exp_module_nodes/SpriteNode--SpriteNode)</code>  

| Param |
| --- |
| pos | 

<a name="module_nodes/BaseNode+setRotation"></a>

#### spriteNode.setRotation(angle)
**Kind**: instance method of <code>[SpriteNode](#exp_module_nodes/SpriteNode--SpriteNode)</code>  

| Param |
| --- |
| angle | 

<a name="module_nodes/BaseNode+setSize"></a>

#### spriteNode.setSize(size) ⇒ <code>\*</code>
**Kind**: instance method of <code>[SpriteNode](#exp_module_nodes/SpriteNode--SpriteNode)</code>  

| Param |
| --- |
| size | 

<a name="module_nodes/BaseNode+setVisible"></a>

#### spriteNode.setVisible(visible)
**Kind**: instance method of <code>[SpriteNode](#exp_module_nodes/SpriteNode--SpriteNode)</code>  

| Param |
| --- |
| visible | 

<a name="module_nodes/BaseNode+turn"></a>

#### spriteNode.turn(angle)
**Kind**: instance method of <code>[SpriteNode](#exp_module_nodes/SpriteNode--SpriteNode)</code>  

| Param |
| --- |
| angle | 

<a name="module_nodes/TextNode"></a>

## nodes/TextNode

* [nodes/TextNode](#module_nodes/TextNode)
    * [TextNode](#exp_module_nodes/TextNode--TextNode) ⇐ <code>[nodes/BaseNode](#module_nodes/BaseNode)</code> ⏏
        * [new TextNode(j2DsEngine, pos, text, sizePx, color, family, width, colorL)](#new_module_nodes/TextNode--TextNode_new)
        * [.draw()](#module_nodes/TextNode--TextNode+draw)
        * [.drawBox()](#module_nodes/BaseNode+drawBox)
        * ~~[.drawSimpleText(text, pos, color, colorL)](#module_nodes/TextNode--TextNode+drawSimpleText)~~
        * [.getAlpha()](#module_nodes/BaseNode+getAlpha) ⇒ <code>\*</code> &#124; <code>number</code>
        * [.getBox(node)](#module_nodes/BaseNode+getBox) ⇒ <code>Object</code>
        * [.getBoxVertices(node)](#module_nodes/BaseNode+getBoxVertices) ⇒ <code>Array.&lt;{x: number, y: number}&gt;</code>
        * [.getDistance(id)](#module_nodes/BaseNode+getDistance) ⇒ <code>number</code>
        * [.getDistanceXY(id)](#module_nodes/BaseNode+getDistanceXY) ⇒ <code>Object</code> &#124; <code>Object</code>
        * [.getLayer()](#module_nodes/BaseNode+getLayer) ⇒ <code>\*</code>
        * [.getPosition()](#module_nodes/BaseNode+getPosition) ⇒ <code>Object</code> &#124; <code>Object</code>
        * [.getRotation()](#module_nodes/BaseNode+getRotation) ⇒ <code>number</code> &#124; <code>\*</code>
        * [.getSize()](#module_nodes/TextNode--TextNode+getSize) ⇒ <code>number</code>
        * [.getText()](#module_nodes/TextNode--TextNode+getText) ⇒ <code>string</code>
        * [.isCollision(id)](#module_nodes/BaseNode+isCollision) ⇒ <code>boolean</code>
        * [.isIntersect(node2)](#module_nodes/BaseNode+isIntersect) ⇒ <code>\*</code>
        * [.isLookScene()](#module_nodes/BaseNode+isLookScene) ⇒ <code>boolean</code>
        * [.isOutScene()](#module_nodes/BaseNode+isOutScene) ⇒ <code>Object</code>
        * [.isPointInsideBox(vf, point)](#module_nodes/BaseNode+isPointInsideBox) ⇒ <code>boolean</code>
        * [.isVisible()](#module_nodes/BaseNode+isVisible) ⇒ <code>boolean</code> &#124; <code>\*</code>
        * [.move(pos)](#module_nodes/BaseNode+move)
        * [.moveDir(speed)](#module_nodes/BaseNode+moveDir)
        * [.moveTo(to, t)](#module_nodes/BaseNode+moveTo)
        * [.resizeBox(offset, size)](#module_nodes/BaseNode+resizeBox)
        * [.rotateTo(to, t)](#module_nodes/BaseNode+rotateTo)
        * [.setAlpha(alpha)](#module_nodes/BaseNode+setAlpha)
        * [.setLayer(layer)](#module_nodes/BaseNode+setLayer)
        * [.setParent(id)](#module_nodes/BaseNode+setParent)
        * [.setPosition(pos)](#module_nodes/BaseNode+setPosition) ⇒ <code>\*</code>
        * [.setRotation(angle)](#module_nodes/BaseNode+setRotation)
        * [.setSize(sizePx)](#module_nodes/TextNode--TextNode+setSize)
        * [.setText(text)](#module_nodes/TextNode--TextNode+setText)
        * [.setVisible(visible)](#module_nodes/BaseNode+setVisible)
        * [.turn(angle)](#module_nodes/BaseNode+turn)

<a name="exp_module_nodes/TextNode--TextNode"></a>

### TextNode ⇐ <code>[nodes/BaseNode](#module_nodes/BaseNode)</code> ⏏
TextNode

**Kind**: Exported class  
**Extends:** <code>[nodes/BaseNode](#module_nodes/BaseNode)</code>  
**Properties**

| Name | Type |
| --- | --- |
| vAlign | <code>number</code> | 
| hAlign | <code>number</code> | 
| color | <code>string</code> | 
| family | <code>string</code> | 
| sizePx | <code>number</code> | 
| lineWidth | <code>number</code> | 
| colorL | <code>string</code> | 
| font | <code>string</code> | 
| fullText | <code>string</code> | 
| maxWidth | <code>number</code> | 
| lines | <code>Array.&lt;string&gt;</code> | 

<a name="new_module_nodes/TextNode--TextNode_new"></a>

#### new TextNode(j2DsEngine, pos, text, sizePx, color, family, width, colorL)
Примитивный узел для отрисовки текста.


| Param | Type |
| --- | --- |
| j2DsEngine | <code>j2DsEngine</code> | 
| pos | <code>Object</code> | 
| text | <code>string</code> | 
| sizePx | <code>number</code> | 
| color | <code>string</code> | 
| family | <code>string</code> | 
| width | <code>number</code> | 
| colorL | <code>string</code> | 

<a name="module_nodes/TextNode--TextNode+draw"></a>

#### textNode.draw()
Метод для отрисовки узла

**Kind**: instance method of <code>[TextNode](#exp_module_nodes/TextNode--TextNode)</code>  
<a name="module_nodes/BaseNode+drawBox"></a>

#### textNode.drawBox()
**Kind**: instance method of <code>[TextNode](#exp_module_nodes/TextNode--TextNode)</code>  
<a name="module_nodes/TextNode--TextNode+drawSimpleText"></a>

#### ~~textNode.drawSimpleText(text, pos, color, colorL)~~
***Deprecated***

Метод для быстрого изменения текста и его последующей отрисовки.

**Kind**: instance method of <code>[TextNode](#exp_module_nodes/TextNode--TextNode)</code>  

| Param | Type |
| --- | --- |
| text | <code>string</code> | 
| pos | <code>Object</code> | 
| color | <code>string</code> | 
| colorL | <code>string</code> | 

<a name="module_nodes/BaseNode+getAlpha"></a>

#### textNode.getAlpha() ⇒ <code>\*</code> &#124; <code>number</code>
**Kind**: instance method of <code>[TextNode](#exp_module_nodes/TextNode--TextNode)</code>  
<a name="module_nodes/BaseNode+getBox"></a>

#### textNode.getBox(node) ⇒ <code>Object</code>
**Kind**: instance method of <code>[TextNode](#exp_module_nodes/TextNode--TextNode)</code>  

| Param |
| --- |
| node | 

<a name="module_nodes/BaseNode+getBoxVertices"></a>

#### textNode.getBoxVertices(node) ⇒ <code>Array.&lt;{x: number, y: number}&gt;</code>
**Kind**: instance method of <code>[TextNode](#exp_module_nodes/TextNode--TextNode)</code>  

| Param | Type |
| --- | --- |
| node | <code>BaseNode</code> | 

<a name="module_nodes/BaseNode+getDistance"></a>

#### textNode.getDistance(id) ⇒ <code>number</code>
**Kind**: instance method of <code>[TextNode](#exp_module_nodes/TextNode--TextNode)</code>  

| Param |
| --- |
| id | 

<a name="module_nodes/BaseNode+getDistanceXY"></a>

#### textNode.getDistanceXY(id) ⇒ <code>Object</code> &#124; <code>Object</code>
**Kind**: instance method of <code>[TextNode](#exp_module_nodes/TextNode--TextNode)</code>  

| Param |
| --- |
| id | 

<a name="module_nodes/BaseNode+getLayer"></a>

#### textNode.getLayer() ⇒ <code>\*</code>
**Kind**: instance method of <code>[TextNode](#exp_module_nodes/TextNode--TextNode)</code>  
<a name="module_nodes/BaseNode+getPosition"></a>

#### textNode.getPosition() ⇒ <code>Object</code> &#124; <code>Object</code>
**Kind**: instance method of <code>[TextNode](#exp_module_nodes/TextNode--TextNode)</code>  
<a name="module_nodes/BaseNode+getRotation"></a>

#### textNode.getRotation() ⇒ <code>number</code> &#124; <code>\*</code>
**Kind**: instance method of <code>[TextNode](#exp_module_nodes/TextNode--TextNode)</code>  
<a name="module_nodes/TextNode--TextNode+getSize"></a>

#### textNode.getSize() ⇒ <code>number</code>
Возвращает текущий размер

**Kind**: instance method of <code>[TextNode](#exp_module_nodes/TextNode--TextNode)</code>  
**Overrides:** <code>[getSize](#module_nodes/BaseNode+getSize)</code>  
<a name="module_nodes/TextNode--TextNode+getText"></a>

#### textNode.getText() ⇒ <code>string</code>
Возвращает текст

**Kind**: instance method of <code>[TextNode](#exp_module_nodes/TextNode--TextNode)</code>  
<a name="module_nodes/BaseNode+isCollision"></a>

#### textNode.isCollision(id) ⇒ <code>boolean</code>
**Kind**: instance method of <code>[TextNode](#exp_module_nodes/TextNode--TextNode)</code>  

| Param |
| --- |
| id | 

<a name="module_nodes/BaseNode+isIntersect"></a>

#### textNode.isIntersect(node2) ⇒ <code>\*</code>
**Kind**: instance method of <code>[TextNode](#exp_module_nodes/TextNode--TextNode)</code>  

| Param |
| --- |
| node2 | 

<a name="module_nodes/BaseNode+isLookScene"></a>

#### textNode.isLookScene() ⇒ <code>boolean</code>
**Kind**: instance method of <code>[TextNode](#exp_module_nodes/TextNode--TextNode)</code>  
<a name="module_nodes/BaseNode+isOutScene"></a>

#### textNode.isOutScene() ⇒ <code>Object</code>
**Kind**: instance method of <code>[TextNode](#exp_module_nodes/TextNode--TextNode)</code>  
<a name="module_nodes/BaseNode+isPointInsideBox"></a>

#### textNode.isPointInsideBox(vf, point) ⇒ <code>boolean</code>
**Kind**: instance method of <code>[TextNode](#exp_module_nodes/TextNode--TextNode)</code>  

| Param |
| --- |
| vf | 
| point | 

<a name="module_nodes/BaseNode+isVisible"></a>

#### textNode.isVisible() ⇒ <code>boolean</code> &#124; <code>\*</code>
**Kind**: instance method of <code>[TextNode](#exp_module_nodes/TextNode--TextNode)</code>  
<a name="module_nodes/BaseNode+move"></a>

#### textNode.move(pos)
**Kind**: instance method of <code>[TextNode](#exp_module_nodes/TextNode--TextNode)</code>  

| Param |
| --- |
| pos | 

<a name="module_nodes/BaseNode+moveDir"></a>

#### textNode.moveDir(speed)
**Kind**: instance method of <code>[TextNode](#exp_module_nodes/TextNode--TextNode)</code>  

| Param |
| --- |
| speed | 

<a name="module_nodes/BaseNode+moveTo"></a>

#### textNode.moveTo(to, t)
**Kind**: instance method of <code>[TextNode](#exp_module_nodes/TextNode--TextNode)</code>  

| Param |
| --- |
| to | 
| t | 

<a name="module_nodes/BaseNode+resizeBox"></a>

#### textNode.resizeBox(offset, size)
**Kind**: instance method of <code>[TextNode](#exp_module_nodes/TextNode--TextNode)</code>  

| Param |
| --- |
| offset | 
| size | 

<a name="module_nodes/BaseNode+rotateTo"></a>

#### textNode.rotateTo(to, t)
**Kind**: instance method of <code>[TextNode](#exp_module_nodes/TextNode--TextNode)</code>  

| Param |
| --- |
| to | 
| t | 

<a name="module_nodes/BaseNode+setAlpha"></a>

#### textNode.setAlpha(alpha)
**Kind**: instance method of <code>[TextNode](#exp_module_nodes/TextNode--TextNode)</code>  

| Param |
| --- |
| alpha | 

<a name="module_nodes/BaseNode+setLayer"></a>

#### textNode.setLayer(layer)
**Kind**: instance method of <code>[TextNode](#exp_module_nodes/TextNode--TextNode)</code>  

| Param |
| --- |
| layer | 

<a name="module_nodes/BaseNode+setParent"></a>

#### textNode.setParent(id)
**Kind**: instance method of <code>[TextNode](#exp_module_nodes/TextNode--TextNode)</code>  

| Param |
| --- |
| id | 

<a name="module_nodes/BaseNode+setPosition"></a>

#### textNode.setPosition(pos) ⇒ <code>\*</code>
**Kind**: instance method of <code>[TextNode](#exp_module_nodes/TextNode--TextNode)</code>  

| Param |
| --- |
| pos | 

<a name="module_nodes/BaseNode+setRotation"></a>

#### textNode.setRotation(angle)
**Kind**: instance method of <code>[TextNode](#exp_module_nodes/TextNode--TextNode)</code>  

| Param |
| --- |
| angle | 

<a name="module_nodes/TextNode--TextNode+setSize"></a>

#### textNode.setSize(sizePx)
Устанавливает размер текста

**Kind**: instance method of <code>[TextNode](#exp_module_nodes/TextNode--TextNode)</code>  
**Overrides:** <code>[setSize](#module_nodes/BaseNode+setSize)</code>  

| Param | Type |
| --- | --- |
| sizePx | <code>number</code> | 

<a name="module_nodes/TextNode--TextNode+setText"></a>

#### textNode.setText(text)
Устанавливает текст

**Kind**: instance method of <code>[TextNode](#exp_module_nodes/TextNode--TextNode)</code>  

| Param | Type |
| --- | --- |
| text | <code>string</code> | 

<a name="module_nodes/BaseNode+setVisible"></a>

#### textNode.setVisible(visible)
**Kind**: instance method of <code>[TextNode](#exp_module_nodes/TextNode--TextNode)</code>  

| Param |
| --- |
| visible | 

<a name="module_nodes/BaseNode+turn"></a>

#### textNode.turn(angle)
**Kind**: instance method of <code>[TextNode](#exp_module_nodes/TextNode--TextNode)</code>  

| Param |
| --- |
| angle | 

<a name="utils/MathUtil"></a>

## utils/MathUtil
MathUtil

**Kind**: global class  

* [utils/MathUtil](#utils/MathUtil)
    * [new MathUtil()](#new_utils/MathUtil_new)
    * [.is4VerticesIntersect(a, b)](#utils/MathUtil.is4VerticesIntersect) ⇒ <code>boolean</code>
    * [.isLineIntersect(a, b, c, d)](#utils/MathUtil.isLineIntersect) ⇒ <code>boolean</code>
    * [.isPointInRect(a, b, c, d, p)](#utils/MathUtil.isPointInRect) ⇒ <code>boolean</code>
    * [.isPointInTriangle(pt, a, b, c)](#utils/MathUtil.isPointInTriangle) ⇒ <code>boolean</code>
    * [.rad(num)](#utils/MathUtil.rad) ⇒ <code>number</code>
    * [.random(min, max, omitZero)](#utils/MathUtil.random) ⇒ <code>number</code>
    * [.rndColor(min, max, opacity)](#utils/MathUtil.rndColor) ⇒ <code>string</code>
    * [.v2f(x, y)](#utils/MathUtil.v2f) ⇒ <code>Object</code>
    * [.v2i(x, y)](#utils/MathUtil.v2i) ⇒ <code>Object</code>

<a name="new_utils/MathUtil_new"></a>

### new MathUtil()
Вспомогательный класс содержащий статичные методы для облегчения расчетов.

<a name="utils/MathUtil.is4VerticesIntersect"></a>

### utils/MathUtil.is4VerticesIntersect(a, b) ⇒ <code>boolean</code>
Проверка пересечения отрезков вершин двух фигур

**Kind**: static method of <code>[utils/MathUtil](#utils/MathUtil)</code>  

| Param | Type |
| --- | --- |
| a | <code>Array.&lt;{x: number, y: number}&gt;</code> | 
| b | <code>Array.&lt;{x: number, y: number}&gt;</code> | 

<a name="utils/MathUtil.isLineIntersect"></a>

### utils/MathUtil.isLineIntersect(a, b, c, d) ⇒ <code>boolean</code>
Проверка пересечения отрезков

**Kind**: static method of <code>[utils/MathUtil](#utils/MathUtil)</code>  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>Object</code> | Начальная точка первого отрезка |
| b | <code>Object</code> | Конечная точка первого отрезка |
| c | <code>Object</code> | Начальная точка второго отрезка |
| d | <code>Object</code> | Конечная точка второго отрезка |

<a name="utils/MathUtil.isPointInRect"></a>

### utils/MathUtil.isPointInRect(a, b, c, d, p) ⇒ <code>boolean</code>
Проверка принадлежности точки прямоугольнику

**Kind**: static method of <code>[utils/MathUtil](#utils/MathUtil)</code>  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>Object</code> | 1-я вершина прямоугольника |
| b | <code>Object</code> | 2-я вершина прямоугольника |
| c | <code>Object</code> | 3-я вершина прямоугольника |
| d | <code>Object</code> | 4-я вершина прямоугольника |
| p | <code>Object</code> | Точка |

<a name="utils/MathUtil.isPointInTriangle"></a>

### utils/MathUtil.isPointInTriangle(pt, a, b, c) ⇒ <code>boolean</code>
Проверка принадлежности точки треугольнику

**Kind**: static method of <code>[utils/MathUtil](#utils/MathUtil)</code>  

| Param | Type | Description |
| --- | --- | --- |
| pt | <code>Object</code> | Точка |
| a | <code>Object</code> | 1-я вершина прямоугольника |
| b | <code>Object</code> | 2-я вершина прямоугольника |
| c | <code>Object</code> | 3-я вершина прямоугольника |

<a name="utils/MathUtil.rad"></a>

### utils/MathUtil.rad(num) ⇒ <code>number</code>
Приведение градусов в радианы

**Kind**: static method of <code>[utils/MathUtil](#utils/MathUtil)</code>  

| Param | Type | Description |
| --- | --- | --- |
| num | <code>number</code> | 0..360 |

<a name="utils/MathUtil.random"></a>

### utils/MathUtil.random(min, max, omitZero) ⇒ <code>number</code>
Случайное число

**Kind**: static method of <code>[utils/MathUtil](#utils/MathUtil)</code>  

| Param | Description |
| --- | --- |
| min | Минимальное |
| max | Максимальное |
| omitZero | Включая нуль? |

<a name="utils/MathUtil.rndColor"></a>

### utils/MathUtil.rndColor(min, max, opacity) ⇒ <code>string</code>
Случайный цвет

**Kind**: static method of <code>[utils/MathUtil](#utils/MathUtil)</code>  
**Returns**: <code>string</code> - rgba(0..256, 0..256, 0..256, 0.0 ~ 1.0)  

| Param | Type | Description |
| --- | --- | --- |
| min | <code>number</code> | 0..256 |
| max | <code>number</code> | 0..256 |
| opacity | <code>number</code> | 0.0 ~ 1.0 |

<a name="utils/MathUtil.v2f"></a>

### utils/MathUtil.v2f(x, y) ⇒ <code>Object</code>
Вектор

**Kind**: static method of <code>[utils/MathUtil](#utils/MathUtil)</code>  

| Param | Type |
| --- | --- |
| x | <code>number</code> | 
| y | <code>number</code> | 

<a name="utils/MathUtil.v2i"></a>

### utils/MathUtil.v2i(x, y) ⇒ <code>Object</code>
Целочисленный вектор

**Kind**: static method of <code>[utils/MathUtil](#utils/MathUtil)</code>  

| Param | Type |
| --- | --- |
| x | <code>number</code> | 
| y | <code>number</code> | 

<a name="utils/TextureUtil"></a>

## utils/TextureUtil
TextureUtil

**Kind**: global class  

* [utils/TextureUtil](#utils/TextureUtil)
    * [new TextureUtil()](#new_utils/TextureUtil_new)
    * [.createImageMap(width, height, callback)](#utils/TextureUtil+createImageMap) ⇒ <code>Object</code>
    * [.loadImageMap(path)](#utils/TextureUtil+loadImageMap) ⇒ <code>Object</code>
    * [.templates](#utils/TextureUtil+templates) : <code>Object</code>
        * [.ellipse(context, size, color)](#utils/TextureUtil+templates.ellipse)
        * [.fillRect(context, size, color)](#utils/TextureUtil+templates.fillRect)
        * [.gradientL(context, size, colors, isHorizontal)](#utils/TextureUtil+templates.gradientL)
        * [.gradientR(context, size, pos1, r1, pos2, r2, colors)](#utils/TextureUtil+templates.gradientR)
        * [.strokeRect(context, size, color, lineWidth)](#utils/TextureUtil+templates.strokeRect)

<a name="new_utils/TextureUtil_new"></a>

### new TextureUtil()
Вспомогательный класс содержащий методы для генерации текстур.

<a name="utils/TextureUtil+createImageMap"></a>

### utils/TextureUtil.createImageMap(width, height, callback) ⇒ <code>Object</code>
Создает карту текстур

**Kind**: instance method of <code>[utils/TextureUtil](#utils/TextureUtil)</code>  

| Param | Type |
| --- | --- |
| width | <code>number</code> | 
| height | <code>number</code> | 
| callback | <code>function</code> | 

<a name="utils/TextureUtil+loadImageMap"></a>

### utils/TextureUtil.loadImageMap(path) ⇒ <code>Object</code>
Загружает из файла карту текстур

**Kind**: instance method of <code>[utils/TextureUtil](#utils/TextureUtil)</code>  

| Param | Type |
| --- | --- |
| path | <code>string</code> | 

<a name="utils/TextureUtil+templates"></a>

### utils/TextureUtil.templates : <code>Object</code>
Шаблоны

**Kind**: instance property of <code>[utils/TextureUtil](#utils/TextureUtil)</code>  

* [.templates](#utils/TextureUtil+templates) : <code>Object</code>
    * [.ellipse(context, size, color)](#utils/TextureUtil+templates.ellipse)
    * [.fillRect(context, size, color)](#utils/TextureUtil+templates.fillRect)
    * [.gradientL(context, size, colors, isHorizontal)](#utils/TextureUtil+templates.gradientL)
    * [.gradientR(context, size, pos1, r1, pos2, r2, colors)](#utils/TextureUtil+templates.gradientR)
    * [.strokeRect(context, size, color, lineWidth)](#utils/TextureUtil+templates.strokeRect)

<a name="utils/TextureUtil+templates.ellipse"></a>

#### templates.ellipse(context, size, color)
Рисует эллипс

**Kind**: static method of <code>[templates](#utils/TextureUtil+templates)</code>  

| Param | Type |
| --- | --- |
| context | <code>CanvasRenderingContext2D</code> | 
| size | <code>number</code> | 
| color | <code>string</code> | 

<a name="utils/TextureUtil+templates.fillRect"></a>

#### templates.fillRect(context, size, color)
Рисует прямоугольник закрашенный

**Kind**: static method of <code>[templates](#utils/TextureUtil+templates)</code>  

| Param | Type |
| --- | --- |
| context | <code>CanvasRenderingContext2D</code> | 
| size | <code>number</code> | 
| color | <code>string</code> | 

<a name="utils/TextureUtil+templates.gradientL"></a>

#### templates.gradientL(context, size, colors, isHorizontal)
Рисует линейным градиентом

**Kind**: static method of <code>[templates](#utils/TextureUtil+templates)</code>  

| Param | Type |
| --- | --- |
| context | <code>CanvasRenderingContext2D</code> | 
| size | <code>number</code> | 
| colors | <code>Array.&lt;string&gt;</code> | 
| isHorizontal | <code>boolean</code> | 

<a name="utils/TextureUtil+templates.gradientR"></a>

#### templates.gradientR(context, size, pos1, r1, pos2, r2, colors)
Рисует радиальным градиентом

**Kind**: static method of <code>[templates](#utils/TextureUtil+templates)</code>  

| Param | Type |
| --- | --- |
| context | <code>CanvasRenderingContext2D</code> | 
| size | <code>Object</code> | 
| pos1 | <code>Object</code> | 
| r1 | <code>number</code> | 
| pos2 | <code>Object</code> | 
| r2 | <code>number</code> | 
| colors | <code>Array.&lt;string&gt;</code> | 

<a name="utils/TextureUtil+templates.strokeRect"></a>

#### templates.strokeRect(context, size, color, lineWidth)
Рисует пустой прямоугольник

**Kind**: static method of <code>[templates](#utils/TextureUtil+templates)</code>  

| Param | Type |
| --- | --- |
| context | <code>CanvasRenderingContext2D</code> | 
| size | <code>number</code> | 
| color | <code>string</code> | 
| lineWidth | <code>number</code> | 


## License

Zlib. © 2015-2016 Нагель Петр

