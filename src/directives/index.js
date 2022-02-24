import permission from './permission'
import draggable from './draggable'
import showTips from './showTips'
import inputLimit from './inputLimit'
import preventClick from './preventClick'
import Vue from 'vue'

export default {
    install: () => {
        const directives = {
            // permission,
            // draggable,
            // showTips,
            inputLimit,
            // preventClick
        }
        Object.keys(directives).map(key => {
            Vue.directive(key, directives[key])
        })
    }
}
