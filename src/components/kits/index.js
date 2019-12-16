import ohButton from './button'
import theme from './theme'
import ohAnimation from './animation'
import ohTab from './tab'
import ohDialog from './dialog'
import ohInput from './form/Input'
import ohFormItem from './form/FormItem'

const components = {
    ohButton,
    theme,
    ohAnimation,
    ohTab,
    ohDialog,
    ohInput,
    ohFormItem

}

const install = (Vue, opts = {}) => {
    Object.keys(components).forEach((key) => {
        Vue.component(key, components[key])
    })
}

export default install
