import ohButton from './button'
import theme from './theme'
import ohAnimation from './animation'
import ohTab from './tab'
import ohDialog from './dialog'
import ohFormItem from './form/FormItem'
import ohInput from './form/Input'
import ohSwitch from './form/Switch' //ohDatePicker
import ohDatePicker from './form/DatePicker'


const components = {
    ohButton,
    theme,
    ohAnimation,
    ohTab,
    ohDialog,
    ohInput,
    ohFormItem,
    ohSwitch,
    ohDatePicker
}

const install = (Vue, opts = {}) => {
    Object.keys(components).forEach((key) => {
        Vue.component(key, components[key])
    })
}

export default install
