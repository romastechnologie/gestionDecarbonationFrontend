import { Modal } from "bootstrap";
import ApiService from "@/services/ApiService";
import { watch } from "vue";
import Swal from "sweetalert2";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
const getDatePlusXDays = (x) => {
    const currentDate = new Date();
    const futureDate = new Date();
    futureDate.setDate(currentDate.getDate() + x);
    // Obtenez les composants de la date
    const year = futureDate.getFullYear();
    const month = (futureDate.getMonth() + 1).toString().padStart(2, '0'); // Les mois commencent à 0
    const day = futureDate.getDate().toString().padStart(2, '0');
    // Formattez la date comme "YYYY-MM-DD"
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
};
const destroyTinyMCE = (editor) => {
    if (editor) {
        editor.destroy();
    }
};
const hideModal = (modalEl) => {
    if (!modalEl) {
        return;
    }
    const myModal = Modal.getInstance(modalEl);
    myModal?.hide();
};
const showModal = (modalEl) => {
    if (!modalEl) {
        return;
    }
    const myModal = new Modal(modalEl);
    myModal?.show();
};
const success = (message) => {
    Swal.fire({
        title: 'Succès',
        text: message,
        icon: "success",
        toast: true,
        timer: 5000,
        position: 'top-right',
        showConfirmButton: false,
    });
};
const error = (message) => {
    Swal.fire({
        title: 'Erreur',
        text: message,
        icon: "error",
        toast: true,
        timer: 5000,
        position: 'top-right',
        showConfirmButton: false
    });
};
const format_date = (value) => {
    if (value) {
        return format(new Date(value), 'dd-MM-yyyy HH:mm', { locale: fr });
        //return moment(String(value)).format('DD-MM-YYYY hh:mm')
    }
};
const format_Date = (date) => {
    if (date) {
        return format(new Date(date), 'dd-MM-yyyy', { locale: fr });
    }
};
const separateur = (montant) => {
    if (montant) {
        return montant.toLocaleString('fr-FR');
    }
};
const removeModalBackdrop = () => {
    if (document.querySelectorAll(".modal-backdrop.fade.show").length) {
        document.querySelectorAll(".modal-backdrop.fade.show").forEach((item) => {
            item.remove();
        });
    }
};
const getUrlApiForFiles = (nomFichier) => {
    if (nomFichier) {
        return `${ApiService.vueInstance.axios.defaults.baseURL?.split("api")[0]}uploads/${nomFichier}`;
    }
    else {
        return `${ApiService.vueInstance.axios.defaults.baseURL?.split("api")[0]}uploads/Erreur404.pdf`;
    }
};
const getUrlApiForFilesWithFolder = (dossier, nomFichier) => {
    if (dossier) {
        return `${ApiService.vueInstance.axios.defaults["updateUrl"]}uploads/${dossier}/${nomFichier}`;
    }
    else {
        return `${ApiService.vueInstance.axios.defaults["updateUrl"]}uploads/Erreur404.pdf`;
    }
};
const getUrlApiForProductFiles = (nomFichier) => {
    if (nomFichier) {
        return `${ApiService.vueInstance.axios.defaults.baseURL?.split("api")[0]}uploads/Produits/${nomFichier}`;
    }
    else {
        return `${ApiService.vueInstance.axios.defaults.baseURL?.split("api")[0]}uploads/Erreur404.pdf`;
    }
};
const getAssetPath = (path) => {
    return '' + path;
};
const isNumber = (evt) => {
    evt = evt ? evt : window.event;
    const charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
    }
    else {
        return true;
    }
};
// function getAllCategorieAbonnes(route:string,element:any) {
//   return ApiService.get(`/${route}`)
//   .then(({ data }) => {
//     console.log(data);
//     element.value = data.data
//   })
//   .catch(({ response }) => {
//     console.log(response)
//   });
// } 
const suppression = (id, element, route, entite) => {
    Swal.fire({
        text: "Vous êtes sur le point de supprimer " + entite + ". Etes-vous sûr ?",
        icon: "warning",
        buttonsStyling: true,
        showCancelButton: true,
        confirmButtonText: "Supprimer",
        cancelButtonText: `Annuler`,
        heightAuto: false,
        customClass: {
            confirmButton: "btn btn-danger",
        },
    }).then((result) => {
        if (result.isConfirmed) {
            ApiService.delete(`/${route}/${id}`)
                .then(({ data }) => {
                Swal.fire({
                    title: 'Succès',
                    text: data.message,
                    icon: "success",
                    toast: true,
                    timer: 5000,
                    position: 'top-right',
                    showConfirmButton: false,
                });
                for (let i = 0; i < element.length; i++) {
                    if (element[i].id === id) {
                        element.splice(i, 1);
                    }
                }
            }).catch(({ response }) => {
                Swal.fire({
                    text: response.data.message, //'Oups il y a un problème',//
                    icon: "error",
                    buttonsStyling: false,
                    confirmButtonText: "Réssayer à nouveau!",
                    heightAuto: false,
                    customClass: {
                        confirmButton: "btn fw-semobold btn-light-danger",
                    },
                });
            });
        }
        else if (result.isDenied) {
            Swal.fire("La suppression n'est pas passée", "", "info");
        }
    });
};
const monSwal = (question, btnAcceptText = "Accepter", btnAcceptColor = "btn btn-danger", btnCancelText = "Annuler", cancelMessage = "L'opération a été annulée") => {
    return Swal.fire({
        text: question,
        icon: "warning",
        buttonsStyling: true,
        showCancelButton: true,
        confirmButtonText: btnAcceptText,
        cancelButtonText: btnCancelText,
        heightAuto: false,
        customClass: {
            confirmButton: btnAcceptColor,
        },
    }).then((result) => {
        if (result.isConfirmed) {
            return true;
        }
        else {
            if (result.isDismissed) {
                Swal.fire(cancelMessage, "", "info");
            }
            return false;
        }
    });
};
const formatMontant = (montant) => {
    if (montant === null || montant === undefined) {
        return "0";
    }
    return montant.toLocaleString('fr-FR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
};
const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${year}-${month}-${day}`;
};
const openAndPrint = (url) => {
    const newWindow = window.open(url, "_blank");
    if (newWindow) {
        newWindow.onload = () => {
            newWindow.print();
        };
    }
    else {
        console.error("Impossible d'ouvrir la fenêtre");
    }
};
function openNewWindow(data, folderName) {
    openAndPrint(getUrlApiForFilesWithFolder(folderName, data + ".pdf"));
}
export { getDatePlusXDays, removeModalBackdrop, suppression, separateur, hideModal, getAssetPath, format_Date, showModal, format_date, success, error, destroyTinyMCE, getUrlApiForFiles, getUrlApiForProductFiles, isNumber, monSwal, getCurrentDate, openNewWindow, formatMontant, watch };
//# sourceMappingURL=utils.js.map