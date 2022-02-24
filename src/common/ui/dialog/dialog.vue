<script lang="jsx">
import { ElDialog, ElDrawer } from 'element-plus';
import { h } from 'vue';
export default {
    name: 'ManualDialog',
    emits: ['ok', 'close', 'closed'],
    props: {
        dialog: {
            type: Object,
            default() {
                return {};
            }
        },
        ext: {
            type: Object,
            default() {
                return {};
            }
        },
        isDrawer: {
            type: Boolean,
            default: false
        },
        Child: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            modelValue: true
        };
    },
    methods: {
        close() {
            this.modelValue = false;
        },
        ok(...payload) {
            this.$emit('ok', ...payload);
            this.modelValue = false;
        },
        asyncOk() {
            this.$emit('ok', ...arguments, () => {
                this.modelValue = false;
            });
        },
        innerClose() {
            this.beforeClose(() => {
                this.modelValue = false;
            });
        },
        beforeClose(done) {
            if (typeof this.$refs.view.$options.beforeClose === 'function') {
                this.$refs.view.$options.beforeClose.call(this.$refs.view, done);
            }
            else {
                done();
            }
        },
        tryDestroy() {
            this.$emit('close', this);
        }
    },
    render() {
        let me = this;
        const WrapperView = this.isDrawer ? ElDrawer : ElDialog;
        return h(WrapperView,
            Object.assign(this.dialog, {
                modelValue: this.modelValue, // 是否展示
                appendToBody: true, // 是否添加到body中
                closeOnClickModal: this.dialog.closeOnClickModal ?? !!this.isDrawer, // 是否可以通过点击 modal 关闭 Dialog
                width: this.dialog.width, // todo
                size: this.dialog.width, // todo
                beforeClose(done) {
                    me.beforeClose(done);
                },
                onClose: this.close,
                onClosed: this.tryDestroy
            }),
            {
                // title 插槽
                title: () => h('div', { style: { color: '#000', fontSize: '16px', lineHeight: '24px' } }, this.dialog.title),
                // 匿名插槽
                default: () => h(this.Child, {
                    ...this.ext,
                    ref: 'view',
                    isChild: true,
                    onOk: this.ok,
                    onClose: this.innerClose,
                    onAsyncOk: this.asyncOk
                }, {
                })
            }
        );
    }
};
</script>
<style lang="less" scoped>
//:global(.el-dialog__body) {
//    padding: var(--el-dialog-padding-primary);
//
//}
//.el-dialog__footer {
//    padding: 20px 0 0;
//}
//
//.el-drawer__body {
//    overflow-y: auto;
//    padding: 10px 15px 15px;
//}
//
//.el-drawer__header {
//    margin-bottom: 0;
//    padding: 15px;
//    background: red !important;
//}
//
//.el-button--default {
//    padding: 8px 16px;
//    font-size: 14px;
//    border-radius: 2px;
//}
</style>
