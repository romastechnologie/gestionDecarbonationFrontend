import { ref } from 'vue';
export function paginationFields(getAll, initialPage = 1, initialLimit = 10) {
    const searchTerm = ref('');
    const page = ref(1);
    const totalPages = ref(0);
    const limit = ref(10);
    const totalElements = ref(0);
    return {
        searchTerm,
        page,
        totalPages,
        limit,
        totalElements
    };
}
//# sourceMappingURL=paginationFields.js.map