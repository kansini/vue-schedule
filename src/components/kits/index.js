import ohButton from './button'
import theme from './theme'
import ohAnimation from './animation'
import ohTab from './tab'
import ohDialog from './dialog'

const components = {
    ohButton,
    theme,
    ohAnimation,
    ohTab,
    ohDialog
}

const install = (Vue, opts = {}) => {
    Object.keys(components).forEach((key) => {
        Vue.component(key, components[key])
    })
}

export default install
