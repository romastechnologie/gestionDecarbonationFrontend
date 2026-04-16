import { reactive } from "vue";
const stateStore = reactive({
    open: false,
    onChange() {
        stateStore.open = !stateStore.open;
    },
});
export default stateStore;
//# sourceMappingURL=store.js.map