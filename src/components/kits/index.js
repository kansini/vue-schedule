import ohButton from './button'
import theme from './theme'


const components = {
    ohButton,
    theme
}

const install = (Vue, opts = {}) => {
    Object.keys(components).forEach((key) => {
        Vue.component(key, components[key])
    })
}

export default install
