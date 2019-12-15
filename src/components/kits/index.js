import ohButton from './button'
import theme from './theme'
import ohAnimation from './animation'
import ohTab from './tab'
import ohDialog from './dialog'
import ohInput from './formItem/Input'
import ohDatePicker from './formItem/DatePicker'

const components = {
    ohButton,
    theme,
    ohAnimation,
    ohTab,
    ohDialog,
    ohInput,
    ohDatePicker

}

const install = (Vue, opts = {}) => {
    Object.keys(components).forEach((key) => {
        Vue.component(key, components[key])
    })
}

export default install
