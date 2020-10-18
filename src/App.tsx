import { defineComponent, onMounted } from 'vue'
import ThePhone from './components/ThePhone'
import TheCamera from './components/TheCamera'

export default defineComponent(() => {
  /* 移除页面加载动画 */
  onMounted(() => $removeLoading())

  return () => (
    <div>
      <ThePhone>{() => <TheCamera />}</ThePhone>
    </div>
  )
})
