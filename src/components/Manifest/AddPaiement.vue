<template>
  <div
    class="modal fade createNewModal"
    id="AddPaiementModal"
    tabindex="-1"
    ref="addModalRef"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-0">
        <div class="modal-header d-block ps-0 p-5 pe-0 pt-0 pb-15 pb-md-25"
         style="background-color: #0b4899;">
          <h5 class="modal-title fw-bold text-white text-center pt-1">{{ title }}</h5>
        </div>
        <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25">

          <div class="row" v-if="!paiementSuccess">
            <div class="col-md"></div>
           <!-- <button @click="payer">Payer maintenant</button> -->
           <div class="col-md-3 text-center mb-20">
             <img src="@/assets/images/momo.png" style="width: 100px; height: auto;" alt=""
             @click="payerKKIA">
             <div style="clear:both;"></div>
             <span class="fw-bold">Mobile Money</span>
           </div>


            <div class="col-md-3 text-center mb-20">
             <img src="@/assets/images/paypal.png" style="width: 100px; height: auto;" alt=""
             @click="payerPaypal">
             <div style="clear:both;"></div>
             <span class="fw-bold">PayPal</span>
           </div>


           <div class="col-md-3 text-center mb-20">
             <img src="@/assets/images/stripe.png" style="width: 100px; height: auto;" alt=""
             @click="payerStripe">
             <div style="clear:both;"></div>
             <span class="fw-bold">Stripe</span>
           </div>
           <div class="col-md"></div>
           <br><br><br>
          </div>

          <div v-else>
            <div class="alert alert-success" v-if="paiementSuccess">
                <img src="@/assets/images/success.png" alt="">
              <div style="clear:both;"></div>
              Paiement effectué avec succès !
            </div>
          </div>


         
          
        </div>
        <button
          type="button"
          class="btn-close shadow-none"
          data-bs-dismiss="modal"
          aria-label="Close"
          @click="resetValue()"
        ></button>
      </div>
    </div>
  </div>

  

</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import ApiService from '../../services/ApiService';
import * as Yup from 'yup';
import { error , success, hideModal } from '../../utils/utils';
import { HsCode } from '@/models/HsCode';
import { Paiement } from '@/models/Paiement';

import {
  openKkiapayWidget,
  addKkiapayListener,
  removeKkiapayListener,
} from "kkiapay";

export default defineComponent({
    name: "addPaiementModal",
  //   components: {
  //   Form,
  //   Field,
  //   ErrorMessage
  // },
  props: {
    item: {
      type: Number,
      default: 0,
    }
  },
  setup(props, { emit }){
    const postSchema = Yup.object().shape({
      libelle: Yup.string().required('Le libelle est obligatoire'),
    
    });

    const paiementForm = ref<Paiement | null>(null);
    const addModalRef = ref<null | HTMLElement>(null);
    const localItem = ref(props.item);
    const isUPDATE = ref(false);
    const title = ref("Paiement de la facture");
    const btntext = ref('Ajouter');

    const montantMomo = ref(0);
    const paiementSuccess = ref(false);


    //###################### KKIAPAY

    // const payer = () => {
    //   openKkiapayWidget({
    //     amount: 5000,
    //     api_key: "VOTRE_PUBLIC_KEY",
    //     sandbox: true,
    //     phone: "97000000",
    //     name: "Client Test",
    //     email: "client@test.com",
    //     data: "commande_123"
    //   })
    // }

    onMounted( async () => {
      addKkiapayListener('success', successHandler)
    });

    const payerKKIA = () => {
      openKkiapayWidget({
        amount: montantMomo.value,
        api_key: "bbcb2b106aaf11efa016f944ed967890",
        sandbox: true,
        phone: "97000000",
      });
    }

    const payerPaypal = () => {
      (window as any).openKkiapayWidget({
        amount: 5000,
        api_key: "bbcb2b106aaf11efa016f944ed967890",
        sandbox: true,
        phone: "97000000",
        name: "Client Test",
        email: "client@test.com",
        data: "commande_123"
      })
    }

    const payerStripe = () => {
      (window as any).openKkiapayWidget({
        amount: 5000,
        api_key: "bbcb2b106aaf11efa016f944ed967890",
        sandbox: true,
        phone: "97000000",
        name: "Client Test",
        email: "client@test.com",
        data: "commande_123"
      })
    }

    const successHandler = (response) => {
      console.log(response);
      const data = {
        reference: response,
        mode: 'KKIAPAY',
      }
      addPaiement(data);

    };

    //############################# ENDKKIA

    // Fonction pour récupérer dynamiquement le taux de change EUR/XOF
    const exchangeRate = ref<number | null>(null);

    const fetchExchangeRate = async () => {
      try {
        const response = await fetch('https://api.exchangerate.host/latest?base=EUR&symbols=XOF');
        const data = await response.json();
        exchangeRate.value = data.rates.XOF;
      } catch (e) {
        // Fallback sur le taux fixe si erreur
        exchangeRate.value = 655.957;
      }
    };

    // Appel au chargement du composant
    fetchExchangeRate();

    const convertAmountEuroToCFA = (amountInEuro: number): number => {
      if (!exchangeRate.value) return 0;
      return amountInEuro * exchangeRate.value;
    };

    watch(() => props.item, (newValue) => {
      getData(newValue);
      isUPDATE.value = true;
    });

   

    const getData = async (id: any) => {
      return ApiService.get("/facture/manifest/"+id)
      .then( async ({ data }) => {
        const donnees = data.data;
        montantMomo.value = await convertAmountEuroToCFA(Number(donnees.montant));
        console.log("Données de la facture récupérées:", donnees);
        emit('openmodal', addModalRef.value);

      })
      .catch(({ response }) => {
        error(response.data.message)
      });
    }

    const addPaiement = async (values: any) => {
      values = values as Paiement;
        ApiService.post("/payment/",values)
        .then(({ data }) => {
            if(data.code == 201) { 
              success(data.message);
              hideModal(addModalRef.value);
              // isUPDATE.value=false;
              emit('close');
            }
        })
        .catch(({ response }) => {
            error(response.data.message);
        });
    };

    const resetValue = () => {
      const formFields = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea');
        isUPDATE.value=false;
      formFields.forEach(field => {
        field.value = '';
      });
    };

    return { postSchema,
      addModalRef,
      addPaiement,
      paiementForm,
      title,btntext,
      resetValue,
      payerKKIA,
      payerStripe,
      payerPaypal,
      getData,
      montantMomo,
      paiementSuccess
    };
  },
});
</script>