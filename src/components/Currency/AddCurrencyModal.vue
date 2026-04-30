<template>
    <div class="modal fade" id="AddCurrencyModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title fw-bold text-black">Ajouter une devise</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        @click="resetForm"></button>
                </div>
                <Form ref="currencyForm" @submit="addCurrency" :validation-schema="currencySchema">
                    <div class="modal-body p-15 p-sm-20 p-md-25">
                        <div class="row">

                            <div class="col-md-12">
                                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                    <label class="d-block text-black fw-semibold mb-10">
                                        Code <span class="text-danger">*</span>
                                    </label>
                                    <Field
                                        name="code"
                                        type="text"
                                        class="form-control shadow-none fs-md-15 text-black"
                                        placeholder="Ex: USD, EUR, XOF"
                                        maxlength="3"
                                        @input="toUpperCase"
                                    />
                                    <ErrorMessage name="code" class="text-danger" />
                                    <small class="text-muted">Code ISO 4217 — 3 lettres majuscules</small>
                                </div>
                            </div>

                            <div class="col-md-12">
                                <div class="form-group mb-15 mb-sm-20 mb-md-25">
                                    <label class="d-block text-black fw-semibold mb-10">
                                        Nom <span class="text-danger">*</span>
                                    </label>
                                    <Field
                                        name="name"
                                        type="text"
                                        class="form-control shadow-none fs-md-15 text-black"
                                        placeholder="Ex: US Dollar, Euro, Franc CFA"
                                        maxlength="100"
                                    />
                                    <ErrorMessage name="name" class="text-danger" />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button"
                            class="btn btn-secondary transition border-0 lh-1 fw-medium"
                            data-bs-dismiss="modal" @click="resetForm">
                            Annuler
                        </button>
                        <button
                            class="default-btn transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16 bg-success"
                            type="submit"
                            :disabled="isLoading">
                            {{ isLoading ? 'Enregistrement...' : 'Enregistrer' }}
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref } from "vue";
    import { Form, Field, ErrorMessage } from "vee-validate";
    import * as Yup from "yup";
    import { Modal } from "bootstrap";
    import ApiService from "../../services/ApiService";
    import { error, success } from "../../utils/utils";

    export default defineComponent({
        name: "AddCurrencyModal",
        components: { Form, Field, ErrorMessage },
        emits: ["close"],
        setup(_, { emit }) {
            const currencyForm = ref<any>(null);
            const isLoading = ref(false);

            const currencySchema = Yup.object().shape({
                code: Yup.string()
                    .required("Le code est obligatoire")
                    .matches(/^[A-Z]{3}$/, "Le code doit contenir exactement 3 lettres majuscules"),
                name: Yup.string()
                    .required("Le nom est obligatoire")
                    .max(100, "Le nom ne peut pas dépasser 100 caractères"),
            });

            const toUpperCase = (e: Event) => {
                const el = e.target as HTMLInputElement;
                el.value = el.value.toUpperCase();
            };

            const resetForm = () => {
                currencyForm.value?.resetForm();
            };

            const closeModal = () => {
                const modalEl = document.getElementById("AddCurrencyModal");
                if (modalEl) {
                    const modal = Modal.getInstance(modalEl);
                    modal?.hide();
                }
            };

            const addCurrency = async (values: any) => {
                isLoading.value = true;
                try {
                    const response = await ApiService.post("/addCurrency", {
                        code: values.code.toUpperCase(),
                        name: values.name,
                    });

                    if (response.status === 201 || response.status === 200) {
                        success(response.data.message || "Devise ajoutée avec succès.");
                        resetForm();
                        closeModal();
                        emit("close");
                    }
                } catch (err: any) {
                    error(err?.response?.data?.message || "Une erreur est survenue.");
                } finally {
                    isLoading.value = false;
                }
            };

            return {
                currencyForm,
                currencySchema,
                isLoading,
                toUpperCase,
                resetForm,
                addCurrency,
            };
        },
    });
</script>