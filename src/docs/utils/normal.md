
## debounce

防抖

### 入参

|  参数名 |类型 | 是否必传 | 解释 |
|---|---|---|---|
|  action |function | 是 | 回调函数 |
|  delay | number | 是 | 延迟（毫秒数） |
|  maxDelay | number |否 | 最大延迟数，如果设置则成函数节流 |

### 用法

```javascript
import { debounce } from '@wxfe/utils';

// 防抖
debounce(()=>{
  console.log(1);
}, 300)

// 节流
debounce(()=>{
  console.log(1);
}, 0, 500)
```
