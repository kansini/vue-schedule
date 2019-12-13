import ohButton from './button'
import theme from './theme'
import ohAnimation from './animation'

const components = {
    ohButton,
    theme,
    ohAnimation
}

const install = (Vue, opts = {}) => {
    Object.keys(components).forEach((key) => {
        Vue.component(key, components[key])
    })
}

export default install