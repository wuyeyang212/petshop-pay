import Dialog from './dialog.vue';
import { h } from 'vue';

function getUuid(){
    return 'dialog_' + Math.random().toString().substr(2,10);
}
let AppCache;
export default {
    create(app, router, initApp) {
        if (!AppCache) {
            AppCache = [];
            router.afterEach(() => {
                // 路由调整的时候，将所有的弹窗都销毁
                AppCache.forEach(app => {
                    console.log(app);
                    app.unmount();
                    let $el = app._container;
                    if ($el && $el.parentNode) {
                        $el.parentNode.removeChild($el);
                    }
                });
                AppCache = [];
            });
        }
        // 注册$showDrawer
        app.config.globalProperties.$showDrawer = function (Child, extOptions = {}, dialogOptions = {}) {
            return app.config.globalProperties.$showDialog(Child, extOptions, dialogOptions, true);
        };
        // 注册$showDialog
        app.config.globalProperties.$showDialog = function (
            Child,
            extOptions = {},
            dialogOptions = {},
            isDrawer = false
        ) {
            Child.emits = ['ok', 'close', 'asyncOk', ...(Child.emits || [])];
            // 定义isChild扩展字段，让内容组件中可以有效区分是否为弹窗展示
            if (Child.props && !Child.props.isChild) {
                Child.props.isChild = Boolean;
            }
            let app2 = null;
            return new Promise(((resolve, reject) => {
                // 拷贝
                const NewDialog = Object.create(Dialog);
                // 创建render函数
                const id = getUuid();
                let vm = {
                    data() {
                        return {
                            el: id
                        };
                    },
                    render() {
                        let me = this;
                        return h(NewDialog,
                            {
                                ext: extOptions,
                                dialog: dialogOptions,
                                isDrawer,
                                Child,
                                onOk: async function (...payload) {
                                    resolve(...payload);
                                    // 延迟.3s 卸载
                                    await new Promise(resolve => setTimeout(resolve,300));
                                    app2.unmount();
                                    let $el = app2._container;
                                    if ($el && $el.parentNode) {
                                        $el.parentNode.removeChild($el);
                                    }
                                },
                                onClose: async function (...payload) {
                                    await reject(...payload);
                                    await new Promise(resolve => setTimeout(resolve,300));
                                    app2.unmount();
                                    let $el = app2._container;
                                    if ($el && $el.parentNode) {
                                        $el.parentNode.removeChild($el);
                                    }
                                }
                            }
                        );
                    }
                };
                app2 = initApp(vm, router, true);
                // 绑定指令全局过滤器和那个
                app2.config.globalProperties.$showDrawer = app.config.globalProperties.$showDrawer;
                app2.config.globalProperties.$showDialog = app.config.globalProperties.$showDialog;

                let dom = document.createElement('div');
                dom.setAttribute('id', id);
                document.body.appendChild(dom);
                app2.mount(`#${id}`);
                AppCache.push(app2);
            })).finally(() => {
                const idx = AppCache.indexOf(app2);
                if (idx !== -1) {
                    AppCache.splice(idx, 1);
                }
            });
        };
    }
};
