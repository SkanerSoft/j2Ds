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


## License

Zlib. © 2015 Нагель Петр

