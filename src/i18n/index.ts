import jp from '@/locales/jp.json'
import tw from '@/locales/tw.json'
import us from '@/locales/us.json'
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  locale: 'us',
  fallbackLocale: 'us',
  messages: {
    us,
    tw,
    jp
  },
  globalInjection: true,
  // if you need to use composition APi, must set it to false
  legacy: false
})

export default i18n
