<template>
  <div class="d-flex justify-content-center align-items-center min-vh-100">
    <div class="container-box">
      <div :class="['forms-column', isLoginActive ? 'login-narrow' : 'register-wide']">
        <div class="fo">
          <div class="form-header" style="padding-top:0!important; margin-top:0!important;">
            <img src="@/assets/images/logo_iacd.png" alt="logo" class="logo-img" v-if="isLoginActive" />
            <h3 class="fw-bold mb-4">{{ isLoginActive ? "Connectez-vous" : "Inscrivez-vous" }}</h3>
          </div>

          <!-- STEPPER -->
          <div class="stepper d-flex justify-content-center align-items-center mb-4" v-if="!isLoginActive">
            <div class="step" :class="{ active: currentStep >= 1, completed: currentStep > 1 }">
              <div class="step-circle">
                <i v-if="currentStep > 1" class="bi bi-check-lg"></i>
                <span v-else>1</span>
              </div>
              <span class="step-label">Organisation</span>
            </div>
            <div class="step-line" :class="{ completed: currentStep > 1 }"></div>
            <div class="step" :class="{ active: currentStep >= 2, completed: currentStep > 2 }">
              <div class="step-circle">
                <i v-if="currentStep > 2" class="bi bi-check-lg"></i>
                <span v-else>2</span>
              </div>
              <span class="step-label">Moyens de Transport</span>
            </div>
            <div class="step-line" :class="{ completed: currentStep > 2 }"></div>
            <div class="step" :class="{ active: currentStep >= 3, completed: currentStep > 3 }">
              <div class="step-circle">
                <i v-if="currentStep > 3" class="bi bi-check-lg"></i>
                <span v-else>3</span>
              </div>
              <span class="step-label">Administrateur</span>
            </div>
            <div class="step-line" :class="{ completed: currentStep > 3 }"></div>
            <div class="step" :class="{ active: currentStep >= 4 }">
              <div class="step-circle">4</div>
              <span class="step-label">Récapitulatif</span>
            </div>
          </div>

          <div class="form-content">
            <transition name="fade">
              <div v-if="globalSuccess" class="alert alert-success d-flex align-items-center mb-4 rounded-3" role="alert">
                <i class="bi bi-check-circle-fill me-2"></i>
                <div class="fw-medium">{{ globalSuccess }}</div>
              </div>
            </transition>
            <transition name="fade">
              <div v-if="globalError" class="alert alert-danger d-flex align-items-center mb-4 rounded-3" role="alert">
                <i class="bi bi-exclamation-triangle-fill me-2"></i>
                <div class="fw-medium">{{ globalError }}</div>
              </div>
            </transition>

            <transition name="slide-fade" mode="out-in">
              <div>
                <!-- ========== FORMULAIRE INSCRIPTION ========== -->
                <Form v-if="!isLoginActive" ref="registerForm" @submit="onSubmitRegister" :validation-schema="registerSchema">
                  <div class="form-box register-box">

                    <!-- ===== ÉTAPE 1 : ORGANISATION ===== -->
                    <div v-show="currentStep === 1" class="row g-3">
                      <div class="col-12 mb-1">
                        <h6 class="section-title"><i class="bi bi-building me-2"></i>Informations sur l'Organisation</h6>
                      </div>
                      <div class="col-sm-4">
                        <label class="form-label small">Nom de l'organisation <span class="text-danger">*</span></label>
                        <Field name="orgName" type="text" class="form-control" placeholder="Ex: Mon Entreprise SARL" />
                        <ErrorMessage name="orgName" class="text-danger small" />
                      </div>
                      <div class="col-sm-4">
                        <label class="form-label small">Type d'organisation <span class="text-danger">*</span></label>
                        <Field name="orgType" v-slot="{ field }">
                          <Multiselect :options="orgTypeOptions" v-model="field.value" v-bind="field"
                            placeholder="Sélectionner le type" :loading="loadingOrgTypes" :searchable="true"
                            no-options-text="Aucun type disponible" />
                        </Field>
                        <ErrorMessage name="orgType" class="text-danger small" />
                      </div>
                      <div class="col-sm-4">
                        <label class="form-label small">Catégorie</label>
                        <Field name="orgCategory" type="text" class="form-control" placeholder="Ex: Import/Export" />
                        <ErrorMessage name="orgCategory" class="text-danger small" />
                      </div>
                      <div class="col-sm-4">
                        <label class="form-label small">Numéro fiscal (Tax)</label>
                        <Field name="taxNumber" type="text" class="form-control" placeholder="Numéro fiscal" />
                        <ErrorMessage name="taxNumber" class="text-danger small" />
                      </div>
                      <div class="col-sm-4">
                        <label class="form-label small">Numéro RCCM</label>
                        <Field name="rccmNumber" type="text" class="form-control" placeholder="Numéro RCCM" />
                        <ErrorMessage name="rccmNumber" class="text-danger small" />
                      </div>
                      <div class="col-sm-4">
                        <label class="form-label small">Site web</label>
                        <Field name="website" type="text" class="form-control" placeholder="https://monentreprise.com" />
                        <ErrorMessage name="website" class="text-danger small" />
                      </div>
                      <div class="col-sm-4">
                        <label class="form-label small">Email de l'organisation <span class="text-danger">*</span></label>
                        <Field name="orgEmail" type="text" class="form-control" placeholder="contact@organisation.com" />
                        <ErrorMessage name="orgEmail" class="text-danger small" />
                      </div>
                      <div class="col-sm-4">
                        <label class="form-label small">Téléphone organisation</label>
                        <Field name="orgPhone" type="text" class="form-control" placeholder="+229 XX XX XX XX" />
                        <ErrorMessage name="orgPhone" class="text-danger small" />
                      </div>
                      <div class="col-sm-4">
                        <label class="form-label small">Fax</label>
                        <Field name="fax" type="text" class="form-control" placeholder="Numéro fax" />
                        <ErrorMessage name="fax" class="text-danger small" />
                      </div>

                      <div class="col-12 mt-2 mb-1">
                        <h6 class="section-title"><i class="bi bi-geo-alt me-2"></i>Localisation</h6>
                      </div>
                      <div class="col-sm-4">
                        <label class="form-label small">Adresse <span class="text-danger">*</span></label>
                        <Field name="address" type="text" class="form-control" placeholder="Rue, BP..." />
                        <ErrorMessage name="address" class="text-danger small" />
                      </div>
                      <div class="col-sm-4">
                        <label class="form-label small">Pays <span class="text-danger">*</span></label>
                        <Field name="countryCode" v-slot="{ field }">
                          <Multiselect :options="paysOptions" v-model="field.value" v-bind="field"
                            placeholder="Sélectionnez votre pays" :loading="loadingPays" :searchable="true"
                            no-options-text="Aucun pays disponible" @change="onPaysChange" />
                        </Field>
                        <ErrorMessage name="countryCode" class="text-danger small mt-1" />
                      </div>
                      <div class="col-sm-4">
  <label class="form-label small">Ville <span class="text-danger">*</span></label>
  <Field name="city" type="text" class="form-control" placeholder="Ex: Cotonou, Lomé..." />
  <ErrorMessage name="city" class="text-danger small" />
</div>
                      <div class="col-sm-4">
                        <label class="form-label small">Code Postal</label>
                        <Field name="postalCode" type="text" class="form-control" placeholder="Code postal" />
                        <ErrorMessage name="postalCode" class="text-danger small" />
                      </div>
                      <!-- <div class="col-12">
                        <label class="form-label small">Message (facultatif)</label>
                        <Field name="message" v-slot="{ field }">
                          <textarea v-bind="field" class="form-control" rows="2"
                            placeholder="Ajoutez un message si vous le souhaitez..."></textarea>
                        </Field>
                      </div> -->
                    </div>

                    <!-- ===== ÉTAPE 2 : MOYENS DE TRANSPORT ===== -->
                    <div v-show="currentStep === 2" class="row g-3">
                      <div class="col-12 mb-1">
                        <h6 class="section-title"><i class="bi bi-truck me-2"></i>Moyens de Transport</h6>
                        <p class="text-muted small mb-0">Ajoutez un ou plusieurs moyens de transport utilisés par votre organisation.</p>
                      </div>
                      <div class="col-12" v-if="transports.length > 0">
                        <div class="transport-list">
                          <div class="transport-card" v-for="(t, index) in transports" :key="index">
                            <div class="transport-card-header">
                              <span class="transport-badge">
                                <i class="bi bi-truck me-1"></i>{{ t.typeTransportAsset || 'Véhicule' }} — {{ t.identifier }}
                              </span>
                              <div class="d-flex gap-2">
                                <button type="button" class="btn btn-sm btn-outline-primary" @click="editTransport(index)">Modifier
                                  <i class="bi bi-pencil"></i>
                                </button>
                                <button type="button" class="btn btn-sm btn-outline-danger" @click="removeTransport(index)">Suppprimer
                                  <i class="bi bi-trash"></i>
                                </button>
                              </div>
                            </div>
                            <div class="transport-card-body">
                              <span v-if="t.name"><strong>Nom :</strong> {{ t.name }}</span>
                              <span v-if="t.fuelType"><strong>Carburant :</strong> {{ t.fuelType }}</span>
                              <span v-if="t.typeMotor"><strong>Moteur :</strong> {{ t.typeMotor }}</span>
                              <span v-if="t.category"><strong>Catégorie :</strong> {{ t.category }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-12 text-center">
                        <button type="button" class="btn btn-add-transport" @click="openTransportModal()">
                          <i class="bi bi-plus-circle me-2"></i>Ajouter un moyen de transport
                        </button>
                      </div>
                      <div class="col-12" v-if="transports.length === 0">
                        <div class="empty-transport">
                          <i class="bi bi-truck fs-1 text-muted"></i>
                          <p class="text-muted mt-2">Aucun moyen de transport ajouté.<br />
                            <small>Vous pouvez en ajouter plusieurs avant de continuer.</small>
                          </p>
                        </div>
                      </div>
                    </div>

                    <!-- ===== ÉTAPE 3 : ADMINISTRATEUR + DOCUMENT ===== -->
                    <div v-show="currentStep === 3" class="row g-3">
                      <div class="col-12 mb-1">
                        <h6 class="section-title"><i class="bi bi-person-badge me-2"></i>Informations de l'Administrateur</h6>
                      </div>
                      <div class="col-sm-4">
                        <label class="form-label small">Nom <span class="text-danger">*</span></label>
                        <Field name="nom" type="text" class="form-control" placeholder="Nom" />
                        <ErrorMessage name="nom" class="text-danger small" />
                      </div>
                      <div class="col-sm-4">
                        <label class="form-label small">Prénom <span class="text-danger">*</span></label>
                        <Field name="prenom" type="text" class="form-control" placeholder="Prénom" />
                        <ErrorMessage name="prenom" class="text-danger small" />
                      </div>
                      <div class="col-sm-4">
                        <label class="form-label small">Email <span class="text-danger">*</span></label>
                        <Field name="email" type="text" class="form-control" placeholder="email@exemple.com" />
                        <ErrorMessage name="email" class="text-danger small" />
                      </div>
                      <div class="col-sm-4">
                        <label class="form-label small">Statut <span class="text-danger">*</span></label>
                        <Field name="statut" v-slot="{ field }">
                          <Multiselect :options="statutOptions" v-model="field.value" v-bind="field" placeholder="Statut" :searchable="true" />
                        </Field>
                        <ErrorMessage name="statut" class="text-danger small" />
                      </div>
                      <div class="col-sm-4">
                        <label class="form-label small">Sexe</label>
                        <Field name="sexe" v-slot="{ field }">
                          <Multiselect :options="sexeOptions" v-model="field.value" v-bind="field" placeholder="Sexe" />
                        </Field>
                        <ErrorMessage name="sexe" class="text-danger small" />
                      </div>
                      <div class="col-sm-4">
                        <label class="form-label small">Numéro National</label>
                        <Field name="numeroNational" type="text" class="form-control" placeholder="Numéro National" />
                        <ErrorMessage name="numeroNational" class="text-danger small" />
                      </div>
                      <div class="col-md-6">
                        <label class="form-label small">Téléphone <span class="text-danger">*</span></label>
                        <Field name="telephone" v-slot="{ field }">
                          <div class="tel-input-fix">
                            <VueTelInput v-model="field.value" v-bind="field" mode="international"
                              :defaultCountry="selectedCountryCode" :key="selectedCountryCode"
                              :inputOptions="{ placeholder: 'Numéro de téléphone' }" @on-input="onTelInput" />
                          </div>
                        </Field>
                        <ErrorMessage name="telephone" class="text-danger small mt-1" />
                      </div>
                      <div class="col-md-6">
                        <label class="form-label small">Télécopieur (Fax)</label>
                        <Field name="telecopieur" type="text" class="form-control" placeholder="Numéro fax admin" />
                        <ErrorMessage name="telecopieur" class="text-danger small" />
                      </div>

                      <!-- DOCUMENT JUSTIFICATIF -->
                      <div class="col-12 mt-2 mb-1">
                        <h6 class="section-title"><i class="bi bi-file-earmark-text me-2"></i>Document Justificatif</h6>
                      </div>
                      <div class="col-sm-4">
                        <label class="form-label small">Type de document <span class="text-danger">*</span></label>
                        <Field name="typeDocument" v-slot="{ field }">
                          <Multiselect :options="documentOptions" v-model="field.value" v-bind="field"
                            placeholder="Type de document" :searchable="true" />
                        </Field>
                        <ErrorMessage name="typeDocument" class="text-danger small" />
                      </div>
                      <div class="col-sm-8">
                        <label class="form-label small">Fichier <span class="text-danger">*</span></label>
                        <Field name="document" v-slot="{ field }">
                          <div id="myDropzone" class="dropzone custom-dropzone-mini"
                            :class="{ 'disabled-dropzone': !registerForm?.values?.typeDocument }" v-bind="field">
                            <div class="dz-message needsclick">
                              <i class="bi bi-cloud-upload-fill text-primary me-1"></i>
                              <span class="small">Cliquez ou déposez votre <strong>{{ selectedDocumentLabel }}</strong> ici</span>
                            </div>
                          </div>
                        </Field>
                        <p v-if="!registerForm?.values?.typeDocument" class="text-muted small mt-1">
                          Sélectionnez d'abord le type de document
                        </p>
                        <ErrorMessage name="document" class="text-danger small" />
                      </div>

                      <div class="col-12 mt-2 mb-1">
                        <h6 class="section-title"><i class="bi bi-shield-lock me-2"></i>Sécurité</h6>
                      </div>
                      <div class="col-md-6">
                        <label class="form-label small">Mot de passe <span class="text-danger">*</span></label>
                        <div class="position-relative">
                          <Field name="password" :type="showPassword ? 'text' : 'password'" class="form-control pe-5"
                            placeholder="Mot de passe" />
                          <i class="bi password-eye position-absolute"
                            :class="showPassword ? 'bi-eye' : 'bi-eye-slash'" @click="togglePassword"
                            style="top:50%;right:10px;transform:translateY(-50%);cursor:pointer;"></i>
                        </div>
                        <ErrorMessage name="password" class="text-danger small mt-1" />
                      </div>
                      <div class="col-md-6">
                        <label class="form-label small">Confirmer le mot de passe <span class="text-danger">*</span></label>
                        <div class="position-relative">
                          <Field name="confirm_password" :type="showPassword ? 'text' : 'password'" class="form-control"
                            placeholder="Confirmer mot de passe" />
                          <i class="bi password-eye position-absolute"
                            :class="showPassword ? 'bi-eye' : 'bi-eye-slash'" @click="togglePassword"
                            style="top:50%;right:10px;transform:translateY(-50%);cursor:pointer;"></i>
                        </div>
                        <ErrorMessage name="confirm_password" class="text-danger small" />
                      </div>
                    </div>

                    <!-- ===== ÉTAPE 4 : RÉCAPITULATIF ===== -->
                    <div v-show="currentStep === 4" class="row g-3">
                      <div class="col-12">
                        <h5 class="mb-3 fw-bold">Récapitulatif de votre inscription</h5>
                        <div class="recap-section">
                          <div class="recap-section-title"><i class="bi bi-building me-2"></i>Organisation</div>
                          <div class="recap-grid">
                            <div class="recap-item"><strong>Nom :</strong> {{ registerForm?.values.orgName }}</div>
                            <div class="recap-item"><strong>Type :</strong> {{ registerForm?.values.orgType }}</div>
                            <div class="recap-item"><strong>Email :</strong> {{ registerForm?.values.orgEmail }}</div>
                            <div class="recap-item"><strong>Téléphone :</strong> {{ registerForm?.values.orgPhone }}</div>
                            <div class="recap-item"><strong>Adresse :</strong> {{ registerForm?.values.address }}</div>
                            <div class="recap-item"><strong>Ville :</strong> {{ registerForm?.values.city }}</div>
                            <div class="recap-item"><strong>Pays :</strong> {{ registerForm?.values.countryCode }}</div>
                            <div class="recap-item"><strong>RCCM :</strong> {{ registerForm?.values.rccmNumber }}</div>
                            <div class="recap-item"><strong>N° Fiscal :</strong> {{ registerForm?.values.taxNumber }}</div>
                            <div class="recap-item"><strong>Site web :</strong> {{ registerForm?.values.website }}</div>
                            <div class="recap-item"><strong>Message :</strong> {{ registerForm?.values.message }}</div>
                          </div>
                        </div>
                        <div class="recap-section mt-3">
                          <div class="recap-section-title"><i class="bi bi-truck me-2"></i>Moyens de Transport ({{ transports.length }})</div>
                          <div v-if="transports.length === 0" class="text-muted small">Aucun transport ajouté.</div>
                          <div class="recap-grid" v-else>
                            <div class="recap-item" v-for="(t, i) in transports" :key="i">
                              <strong>{{ i + 1 }}. {{ t.typeTransportAsset }}</strong> — {{ t.identifier }}<br />
                              <small>{{ t.name }} | {{ t.fuelType }} | {{ t.typeMotor }}</small>
                            </div>
                          </div>
                        </div>
                        <div class="recap-section mt-3">
                          <div class="recap-section-title"><i class="bi bi-person-badge me-2"></i>Administrateur</div>
                          <div class="recap-grid">
                            <div class="recap-item"><strong>Nom :</strong> {{ registerForm?.values.nom }}</div>
                            <div class="recap-item"><strong>Prénom :</strong> {{ registerForm?.values.prenom }}</div>
                            <div class="recap-item"><strong>Email :</strong> {{ registerForm?.values.email }}</div>
                            <div class="recap-item"><strong>Statut :</strong> {{ registerForm?.values.statut }}</div>
                            <div class="recap-item"><strong>Téléphone :</strong> {{ registerForm?.values.telephone }}</div>
                            <div class="recap-item"><strong>Sexe :</strong> {{ registerForm?.values.sexe }}</div>
                            <div class="recap-item"><strong>Type doc :</strong> {{ registerForm?.values.typeDocument }}</div>
                          </div>
                        </div>
                        <div class="alert alert-info mt-3">
                          <i class="bi bi-info-circle me-2"></i>
                          Vérifiez vos informations avant de valider votre inscription.
                        </div>
                      </div>
                    </div>

                    <!-- BOUTONS NAVIGATION -->
                    <div class="d-flex justify-content-between mt-4">
                      <button v-if="currentStep > 1" type="button" class="btn btn-secondary" @click="prevStep">
                        <i class="bi bi-arrow-left me-1"></i> Précédent
                      </button>
                      <div v-else></div>
                      <button v-if="currentStep < totalSteps" type="button" class="btn btn-primary" @click="nextStep">
                        Suivant <i class="bi bi-arrow-right ms-1"></i>
                      </button>
                      <button v-else type="submit" class="btn btn-success" :disabled="isLoginDisabled">
                        <span v-if="isLoginDisabled"><i class="bi bi-hourglass-split me-1"></i>Patientez {{ otpCode }}s</span>
                        <span v-else><i class="bi bi-check-circle me-1"></i>Valider l'inscription</span>
                      </button>
                    </div>
                  </div>
                </Form>

                <!-- ========== FORMULAIRE LOGIN ========== -->
                <Form v-else ref="loginForm" @submit="onSubmitLogin" :validation-schema="loginSchema">
                  <div class="form-box login-box">
                    <div class="input-box mb-3">
                      <div class="position-relative">
                        <i class="bi bi-envelope me-5"></i>
                        <Field name="email" type="text" class="form-control shadow-none fs-md-15 text-black"
                          placeholder="Entrez votre email" />
                      </div>
                      <ErrorMessage name="email" class="text-danger" />
                    </div>
                    <div class="input-box mb-4">
                      <div class="position-relative">
                        <i class="bi bi-lock me-5"></i>
                        <Field name="password" :type="showPassword ? 'text' : 'password'"
                          class="form-control shadow-none fs-md-15 text-black" placeholder="Entrez votre mot de passe" />
                        <i class="bi password-eye" :class="showPassword ? 'bi-eye' : 'bi-eye-slash'"
                          @click="togglePassword"
                          style="top:50%;right:10px;transform:translateY(-50%);cursor:pointer;"></i>
                      </div>
                      <ErrorMessage name="password" class="text-danger" />
                    </div>
                    <button class="btn btn-primary btn-custom w-100" :disabled="isLoginDisabled">
                      <span v-if="isLoginDisabled">Patientez {{ Code }} secondes</span>
                      <span v-else>Connectez-vous</span>
                    </button>
                  </div>
                </Form>
              </div>
            </transition>
          </div>
        </div>
      </div>

      <!-- PANEL DROIT -->
      <div class="panel">
        <h1 class="fw-bold text-center panel-title" style="color:white;">
          {{ isLoginActive ? 'Bienvenue à nouveau' : 'Soyez le Bienvenu' }}
        </h1>
        <p class="panel-sub" style="color:white;">
          {{ isLoginActive ? "Pas encore de compte ?" : "Avez-vous déjà un compte ?" }}
        </p>
        <button class="btn btn-light px-4" @click="toggleSlide">
          {{ isLoginActive ? 'Inscrivez-vous' : 'Connectez-vous' }}
        </button>
      </div>
    </div>
  </div>

  <!-- ========== MODAL TRANSPORT ========== -->
  <teleport to="body">
    <div v-if="showTransportModal" class="my-ultimate-otp-modal">
      <div class="my-ultimate-otp-card transport-modal-card">
        <div class="header">
          <h5 class="text-center mb-0">
            <i class="bi bi-truck me-2"></i>
            {{ editingTransportIndex !== null ? 'Modifier le transport' : 'Ajouter un moyen de transport' }}
          </h5>
          <button type="button" class="btn-close" @click="showTransportModal = false"></button>
        </div>
        <div class="body">
          <div class="row g-3">
            <div class="col-sm-6">
              <label class="form-label small">Type d'asset <span class="text-danger">*</span></label>
              <Multiselect v-model="currentTransport.typeTransportAsset" :options="transportAssetOptions"
                placeholder="-- Sélectionner --" :searchable="true" />
            </div>
            <div class="col-sm-6">
              <label class="form-label small">Type <span class="text-danger">*</span></label>
              <input v-model="currentTransport.type" type="text" class="form-control" placeholder="Ex: Camion, Bus..." />
            </div>
            <div class="col-sm-6">
              <label class="form-label small">Identifiant (Immat. / IMO) <span class="text-danger">*</span></label>
              <input v-model="currentTransport.identifier" type="text" class="form-control" placeholder="Ex: BJ-1234-AB" />
            </div>
            <div class="col-sm-6">
              <label class="form-label small">Nom</label>
              <input v-model="currentTransport.name" type="text" class="form-control" placeholder="Nom du véhicule" />
            </div>
            <div class="col-sm-6">
              <label class="form-label small">Catégorie</label>
              <input v-model="currentTransport.category" type="text" class="form-control" placeholder="Ex: Poids lourd" />
            </div>
            <div class="col-sm-6">
              <label class="form-label small">Type de moteur</label>
              <Multiselect v-model="currentTransport.typeMotor" :options="typeMotorOptions"
                placeholder="-- Sélectionner --" :searchable="true" />
            </div>
            <div class="col-sm-6">
              <label class="form-label small">Type de carburant</label>
              <Multiselect v-model="currentTransport.fuelType" :options="fuelTypeOptions"
                placeholder="-- Sélectionner --" :searchable="true" />
            </div>
            <div class="col-sm-6">
              <label class="form-label small">Date de mise en production</label>
              <input v-model="currentTransport.DateMiseProduction" type="date" class="form-control" />
            </div>
            <div class="col-sm-6">
              <label class="form-label small">Vitesse moyenne (km/h)</label>
              <input v-model.number="currentTransport.speedAvgKmh" type="number" class="form-control" placeholder="Ex: 80" />
            </div>
            <div class="col-sm-6">
              <label class="form-label small">Vitesse maximale (km/h)</label>
              <input v-model.number="currentTransport.speedMaxKmh" type="number" class="form-control" placeholder="Ex: 120" />
            </div>
            <div class="col-sm-6">
              <label class="form-label small">Propriétaire</label>
              <input v-model="currentTransport.ownerName" type="text" class="form-control" placeholder="Nom du propriétaire" />
            </div>
          </div>
          <div v-if="transportModalError" class="alert alert-danger mt-3 small">
            <i class="bi bi-exclamation-triangle me-2"></i>{{ transportModalError }}
          </div>
        </div>
        <div class="footer">
          <button class="btn btn-outline-secondary" @click="showTransportModal = false">Annuler</button>
          <button class="btn btn-primary" @click="saveTransport">
            <i class="bi bi-check-lg me-1"></i>
            {{ editingTransportIndex !== null ? 'Mettre à jour' : 'Ajouter' }}
          </button>
        </div>
      </div>
    </div>
  </teleport>

  <!-- ========== MODAL OTP LOGIN ========== -->
  <teleport to="body">
    <div v-if="showOtpModal" class="my-ultimate-otp-modal">
      <div class="my-ultimate-otp-card">
        <div class="header">
          <h5 class="text-center">Vérification en deux étapes</h5>
          <button type="button" class="btn-close" @click="showOtpModal = false"></button>
        </div>
        <div class="body">
          <p class="text-muted small mb-3">Entrez le code à 6 chiffres reçu par email</p>
          <transition name="fade">
            <div v-if="globalSuccess" class="alert alert-success d-flex align-items-center mb-3 rounded-3" role="alert">
              <i class="bi bi-check-circle-fill me-2"></i>
              <div class="fw-medium">{{ globalSuccess }}</div>
            </div>
          </transition>
          <transition name="fade">
            <div v-if="globalError" class="alert alert-danger d-flex align-items-center mb-3 rounded-3" role="alert">
              <i class="bi bi-exclamation-triangle-fill me-2"></i>
              <div class="fw-medium">{{ globalError }}</div>
            </div>
          </transition>
          <div class="otp-container">
            <input v-for="i in 6" :key="i" v-model="otp[i - 1]" @input="jumpToNext(i)"
              @keydown.backspace="jumpBack($event, i)" type="text" inputmode="numeric" maxlength="1" class="otp-input"
              :ref="(el) => setOtpRef(el as Element | null, i - 1)" autocomplete="off" @keyup.enter="verifyOtpLogin"
              @paste.prevent="handlePaste($event)" />
          </div>
        </div>
        <div class="footer">
          <button class="btn btn-outline-secondary" @click="showOtpModal = false">Annuler</button>
          <button class="btn btn-outline-success" @click="sendOtp" :disabled="otpCode > 0">
            <span v-if="otpCode === 0">Nouveau code</span>
            <span v-else>Réessayez dans {{ otpCode }}s</span>
          </button>
          <button class="btn btn-primary" @click="verifyOtpLogin" :disabled="otp.join('').length !== 6">Valider</button>
        </div>
      </div>
    </div>
  </teleport>

  <!-- ========== MODAL OTP INSCRIPTION ========== -->
  <teleport to="body">
    <div v-if="showRegisterOtpModal" class="my-ultimate-otp-modal">
      <div class="my-ultimate-otp-card">
        <div class="header">
          <h5 class="text-center">Activez votre compte</h5>
          <button type="button" class="btn-close" @click="showRegisterOtpModal = false"></button>
        </div>
        <div class="body">
          <p class="text-muted small mb-3">Entrez le code à 6 chiffres reçu par email</p>
          <transition name="fade">
            <div v-if="globalSuccess" class="alert alert-success d-flex align-items-center mb-3 rounded-3" role="alert">
              <i class="bi bi-check-circle-fill me-2"></i>
              <div class="fw-medium">{{ globalSuccess }}</div>
            </div>
          </transition>
          <transition name="fade">
            <div v-if="globalError" class="alert alert-danger d-flex align-items-center mb-3 rounded-3" role="alert">
              <i class="bi bi-exclamation-triangle-fill me-2"></i>
              <div class="fw-medium">{{ globalError }}</div>
            </div>
          </transition>
          <div class="otp-container">
            <input v-for="i in 6" :key="i" v-model="registerOtp[i - 1]" @input="jumpNext(i)"
              @keydown.backspace="jumpToBack($event, i)" type="text" inputmode="numeric" maxlength="1" class="otp-input"
              :ref="(el) => setOtpRef(el as Element | null, i - 1)" autocomplete="off" @keyup.enter="verifyOtpRegister"
              @paste.prevent="Pastehandle($event)" />
          </div>
        </div>
        <div class="footer">
          <button class="btn btn-outline-secondary" @click="showRegisterOtpModal = false">Annuler</button>
          <button class="btn btn-outline-success" @click="sendOtp" :disabled="otpCode > 0">
            <span v-if="otpCode === 0">Nouveau code</span>
            <span v-else>Réessayez dans {{ otpCode }}s</span>
          </button>
          <button class="btn btn-primary" @click="verifyOtpRegister" :disabled="registerOtp.join('').length !== 6">Valider</button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick, onMounted, onUnmounted, watch, computed } from "vue";
import { Form, Field, ErrorMessage, useForm } from "vee-validate";
import * as Yup from "yup";
import { useRouter } from "vue-router";
import { useAuthStore } from '@/services/auth';
import Multiselect from '@vueform/multiselect';
import Dropzone from "dropzone";
import { VueTelInput } from 'vue3-tel-input';
import 'vue3-tel-input/dist/vue3-tel-input.css';
import ApiService from "@/services/ApiService";
import type { FormContext } from "vee-validate";
import JwtService from "@/services/JwtService";

interface TransportForm {
  typeTransportAsset: string;
  type: string;
  identifier: string;
  name: string;
  category: string;
  typeMotor: string;
  fuelType: string;
  DateMiseProduction: string;
  speedAvgKmh: number | null;
  speedMaxKmh: number | null;
  ownerName: string;
}

const emptyTransport = (): TransportForm => ({
  typeTransportAsset: '', type: '', identifier: '', name: '',
  category: '', typeMotor: '', fuelType: '', DateMiseProduction: '',
  speedAvgKmh: null, speedMaxKmh: null, ownerName: '',
});

export default defineComponent({
  name: "InscriptionForm",
  components: { Form, Field, ErrorMessage, Multiselect, VueTelInput },
  setup() {

    const loginSchema = Yup.object().shape({
      email: Yup.string().email("L'email est invalide").required("L'email est obligatoire"),
      password: Yup.string().min(8, "Min 8 caractères").required("Le mot de passe est obligatoire"),
    });

    const registerSchema = Yup.object({
      orgName: Yup.string().required("Le nom de l'organisation est obligatoire"),
      orgType: Yup.string().required("Le type d'organisation est obligatoire"),
      orgEmail: Yup.string().email("Email invalide").required("L'email de l'organisation est obligatoire"),
      address: Yup.string().required("L'adresse est obligatoire"),
      city: Yup.string().required("La ville est obligatoire"),
      countryCode: Yup.string().required("Le pays est obligatoire"),
      typeDocument: Yup.string().required("Sélectionnez le type de document"),
      document: Yup.mixed().required("Joindre la pièce justificative")
        .test("fileRequired", "Joindre la pièce justificative", (v) => v !== null),
      nom: Yup.string().required("Le nom est obligatoire"),
      prenom: Yup.string().required("Le prénom est obligatoire"),
      email: Yup.string().email("Email invalide").required("L'email est obligatoire"),
      statut: Yup.string().required("Sélectionnez un statut"),
      telephone: Yup.string().required("Le téléphone est obligatoire")
        .test("is-valid-phone", "Numéro invalide", v => typeof v === 'string' && v.trim().length > 3),
      password: Yup.string().min(8, "Min 8 caractères").required("Le mot de passe est obligatoire"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref('password')], "Les mots de passe ne correspondent pas")
        .required("Confirmez votre mot de passe"),
    });

    const loginForm = ref<FormContext<any> | null>(null);
    const registerForm = ref<FormContext | null>(null);
    const telephone = ref("");
    const documentFile = ref<File | null>(null);
    const router = useRouter();
    const showOtpModal = ref(false);
    const otp = ref<string[]>(Array(6).fill(""));
    const loginUserId = ref<number | null>(null);
    const showRegisterOtpModal = ref(false);
    const registerUserId = ref<number | null>(null);
    const registerOtp = ref<string[]>(Array(6).fill(""));
    const isLoginDisabled = ref(false);
    const showPassword = ref(false);
    const selectedCountryCode = ref("bj");
    const isLoginActive = ref(true);
    const globalError = ref<string | null>(null);
    const globalSuccess = ref<string | null>(null);
    const { values } = useForm();

    const transports = ref<TransportForm[]>([]);
    const showTransportModal = ref(false);
    const currentTransport = ref<TransportForm>(emptyTransport());
    const editingTransportIndex = ref<number | null>(null);
    const transportModalError = ref<string | null>(null);

    const currentStep = ref(1);
    const totalSteps = 4;
    const steps: string[][] = [
      ['orgName', 'orgType', 'orgEmail', 'address', 'city', 'countryCode'],
      [],
      ['nom', 'prenom', 'email', 'statut', 'telephone', 'password', 'confirm_password', 'typeDocument', 'document'],
    ];

    const boxes = ref<(HTMLInputElement | null)[]>(Array(6).fill(null));
    const otpCode = ref(0);
    let otpInterval: number | null = null;

    const orgTypeOptions = ref<{ label: string; value: string }[]>([]);
    const paysOptions = ref<{ label: string; value: string; nameEn?: string }[]>([]);
    const villesOptions = ref<{ label: string; value: string }[]>([]);
    const loadingOrgTypes = ref(false);
    const loadingPays = ref(false);
    const loadingVilles = ref(false);

    const fetchOrgTypes = async () => {
      loadingOrgTypes.value = true;
      try {
        const response = await ApiService.get("/type-organisations");
        const raw = response.data;
        const data = raw?.data?.data || raw?.data || raw || [];
        const arr = Array.isArray(data) ? data : [];
        orgTypeOptions.value = arr
          .filter((t: any) => t.isActive !== false)
          .map((t: any) => ({ label: t.label, value: t.code || String(t.id) }));
      } catch (e) {
        console.error("Erreur fetchOrgTypes:", e);
      } finally {
        loadingOrgTypes.value = false;
      }
    };

    const fetchPays = async () => {
      loadingPays.value = true;
      try {
        const response = await ApiService.get("/getPays");
        const raw = response.data;
        const data = raw?.data?.data || raw?.data || raw || [];
        const arr = Array.isArray(data) ? data : [];
        paysOptions.value = arr.map((p: any) => ({
          label: p.nom || p.name,
          value: p.code,
          nameEn: p.nameEn || p.name || p.nom,
        }));
      } catch (e) {
        console.error("Erreur fetchPays:", e);
      } finally {
        loadingPays.value = false;
      }
    };

    onMounted(() => {
      fetchOrgTypes();
      fetchPays();
    });

    watch(isLoginActive, (val) => {
      if (!val) {
        if (orgTypeOptions.value.length === 0) fetchOrgTypes();
        if (paysOptions.value.length === 0) fetchPays();
      }
    });

    const statutOptions = [
      { label: "Chargeur ou son représentant à l'international", value: "Chargeur ou son représentant à l'international" },
      { label: "Commissionnaire en Douane Agrée (CDA) Togolais", value: "Commissionnaire en Douane Agrée(CDA) Togolais" },
    ];
    const sexeOptions = [
      { label: "Masculin", value: "M" },
      { label: "Féminin", value: "F" },
      { label: "Autre", value: "Autre" },
    ];
    const documentOptions = [
      { label: "Registre de Commerce ou Équivalent", value: "Régistre de Commerce ou Equivalent" },
      { label: "Document d'identification Fiscale ou Équivalent", value: "Document d'identification Fisacle ou Equivalent" },
    ];
    const transportAssetOptions = [
      { label: "Navire (VESSEL)", value: "VESSEL" },
      { label: "Aéronef (AIRCRAFT)", value: "AIRCRAFT" },
      { label: "Véhicule (VEHICLE)", value: "VEHICLE" },
      { label: "Train (TRAIN)", value: "TRAIN" },
    ];
    const typeMotorOptions = [
      { label: "Diesel", value: "DIESEL" },
      { label: "Essence", value: "ESSENCE" },
      { label: "Électrique", value: "ELECTRIQUE" },
      { label: "Hybride", value: "HYBRIDE" },
      { label: "GNL", value: "GNL" },
      { label: "GNC", value: "GNC" },
    ];
    const fuelTypeOptions = [
      { label: "Diesel", value: "DIESEL" },
      { label: "Essence", value: "ESSENCE" },
      { label: "Électricité", value: "ELECTRICITE" },
      { label: "GNL", value: "GNL" },
      { label: "GNC", value: "GNC" },
      { label: "Hydrogène", value: "HYDROGENE" },
    ];

    const selectedDocumentLabel = computed(() => registerForm.value?.values?.typeDocument || 'document');

    const fetchVilles = async (paysNom: string) => {
      if (!paysNom) return;
      loadingVilles.value = true;
      villesOptions.value = [];
      try {
        const response = await fetch('https://countriesnow.space/api/v0.1/countries/cities', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ country: paysNom })
        });
        const data = await response.json();
        if (data.data && Array.isArray(data.data)) {
          villesOptions.value = data.data.map((v: string) => ({ label: v, value: v }));
        } else {
          villesOptions.value = [];
        }
      } catch (e) {
        console.error("Erreur fetchVilles:", e);
        villesOptions.value = [];
      } finally {
        loadingVilles.value = false;
      }
    };

    const onPaysChange = (val: string) => {
      registerForm.value?.setFieldValue("countryCode", val);
      registerForm.value?.setFieldValue("city", "");
      villesOptions.value = [];
      const paysObj = paysOptions.value.find(p => p.value === val);
      if (paysObj) fetchVilles(paysObj.nameEn || paysObj.label);
    };

    const openTransportModal = (index: number | null = null) => {
      editingTransportIndex.value = index;
      transportModalError.value = null;
      currentTransport.value = index !== null ? { ...transports.value[index] } : emptyTransport();
      showTransportModal.value = true;
    };
    const editTransport = (index: number) => openTransportModal(index);
    const removeTransport = (index: number) => transports.value.splice(index, 1);
    const saveTransport = () => {
      transportModalError.value = null;
      if (!currentTransport.value.typeTransportAsset) { transportModalError.value = "Le type d'asset est obligatoire."; return; }
      if (!currentTransport.value.identifier) { transportModalError.value = "L'identifiant est obligatoire."; return; }
      if (editingTransportIndex.value !== null) {
        transports.value[editingTransportIndex.value] = { ...currentTransport.value };
      } else {
        transports.value.push({ ...currentTransport.value });
      }
      showTransportModal.value = false;
    };

    const nextStep = async () => {
      if (!registerForm.value) return;
      const fieldsToValidate = steps[currentStep.value - 1];
      if (fieldsToValidate && fieldsToValidate.length > 0) {
        let valid = true;
        for (const f of fieldsToValidate) {
          const r = await registerForm.value.validateField(f);
          if (!r.valid) valid = false;
        }
        if (!valid) return;
      }
      if (currentStep.value < totalSteps) currentStep.value++;
    };
    const prevStep = () => { if (currentStep.value > 1) currentStep.value--; };

    const setOtpRef = (el: Element | null, index: number) => {
      boxes.value[index] = el instanceof HTMLInputElement ? el : null;
    };
    const startOtpCooldown = (seconds: number) => {
      otpCode.value = seconds; isLoginDisabled.value = true;
      if (otpInterval) clearInterval(otpInterval);
      otpInterval = window.setInterval(() => {
        if (otpCode.value > 0) otpCode.value--;
        else { clearInterval(otpInterval!); otpInterval = null; isLoginDisabled.value = false; }
      }, 1000);
    };
    const stopOtpCooldown = () => {
      if (otpInterval) { clearInterval(otpInterval); otpInterval = null; }
      otpCode.value = 0; isLoginDisabled.value = false;
    };
    const jumpToNext = async (i: number) => { if (otp.value[i - 1] && i < 6) { await nextTick(); boxes.value[i]?.focus(); boxes.value[i]?.select(); } };
    const jumpBack = async (e: KeyboardEvent, i: number) => { if (e.key === 'Backspace' && !otp.value[i - 1] && i > 1) { await nextTick(); boxes.value[i - 2]?.focus(); boxes.value[i - 2]?.select(); } };
    const handlePaste = (e: ClipboardEvent) => {
      const digits = (e.clipboardData?.getData('text') || '').replace(/\D/g, '').slice(0, 6);
      if (digits.length) { for (let i = 0; i < 6; i++) otp.value[i] = digits[i] || ''; nextTick(() => { boxes.value[Math.min(digits.length, 5)]?.focus(); if (digits.length === 6) verifyOtpLogin(); }); }
    };
    const jumpNext = async (i: number) => { if (registerOtp.value[i - 1] && i < 6) { await nextTick(); boxes.value[i]?.focus(); boxes.value[i]?.select(); } };
    const jumpToBack = async (e: KeyboardEvent, i: number) => { if (e.key === 'Backspace' && !registerOtp.value[i - 1] && i > 1) { await nextTick(); boxes.value[i - 2]?.focus(); boxes.value[i - 2]?.select(); } };
    const Pastehandle = (e: ClipboardEvent) => {
      const digits = (e.clipboardData?.getData('text') || '').replace(/\D/g, '').slice(0, 6);
      if (digits.length) { for (let i = 0; i < 6; i++) registerOtp.value[i] = digits[i] || ''; nextTick(() => { boxes.value[Math.min(digits.length, 5)]?.focus(); if (digits.length === 6) verifyOtpRegister(); }); }
    };

    watch(showOtpModal, (v) => { if (v) { otp.value = Array(6).fill(''); nextTick(() => boxes.value[0]?.focus()); startOtpCooldown(600); } });
    watch(showRegisterOtpModal, (v) => { if (v) startOtpCooldown(600); });
    // watch(() => otp.value.join(""), (c) => { if (c.length === 6 && /^\d{6}$/.test(c)) nextTick(() => verifyOtpLogin()); });
    // watch(() => registerOtp.value.join(""), (c) => { if (c.length === 6 && /^\d{6}$/.test(c)) nextTick(() => verifyOtpRegister()); });

    const onTelInput = (tel: any) => {
      const value = tel.number?.international || "";
      telephone.value = value;
      registerForm.value?.setFieldValue("telephone", value);
    };

    const toggleSlide = () => { isLoginActive.value = !isLoginActive.value; };
    const togglePassword = () => { showPassword.value = !showPassword.value; };

    let myDropzone: Dropzone | null = null;

    watch(currentStep, (step) => {
      if (step === 3) {
        nextTick(() => {
          const dzElement = document.getElementById("myDropzone");
          if (dzElement && !myDropzone) {
            myDropzone = new Dropzone("#myDropzone", {
              url: "#", autoProcessQueue: false, clickable: true, maxFiles: 1,
              acceptedFiles: "image/*,.pdf,.doc,.docx,.xls,.xlsx",
              dictDefaultMessage: "", dictRemoveFile: "Supprimer", addRemoveLinks: true,
              previewTemplate: `
                <div class="dz-preview dz-file-preview dz-mini-preview">
                  <div class="dz-mini-info">
                    <i class="bi bi-file-earmark-check text-success me-1"></i>
                    <span class="dz-filename"><span data-dz-name></span></span>
                    <span class="dz-size text-muted ms-1" data-dz-size></span>
                    <a class="dz-remove ms-2 text-danger" href="javascript:undefined;" data-dz-remove>
                      <i class="bi bi-x-circle"></i>
                    </a>
                  </div>
                </div>
              `,
              init: function (this: Dropzone) {
                const msgEl = dzElement.querySelector(".dz-message") as HTMLElement | null;
                this.on("addedfile", (file) => {
                  if (msgEl) msgEl.style.display = "none";
                  documentFile.value = file;
                  registerForm.value?.setFieldValue("document", file);
                  registerForm.value?.setFieldError("document", undefined);
                });
                this.on("removedfile", () => {
                  if (msgEl) msgEl.style.display = "flex";
                  documentFile.value = null;
                  registerForm.value?.setFieldValue("document", null);
                });
              }
            });
          }
        });
      }
    });

    const onSubmitLogin = async (values: any) => {
      globalError.value = null; globalSuccess.value = null;
      try {
        const response = await ApiService.post("/auth/login", { email: values.email.toLowerCase().trim(), password: values.password });
        if (response.data.code === 200) {
  const data = response.data.data;
  localStorage.setItem("id_token", data.token || data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken || "");
  const authStore = useAuthStore();
  authStore.login(data.user);
  JwtService.saveUser(data.user.id);
  JwtService.saveUserName(data.user.nom || "");
  JwtService.setUserEmail(data.user.email || "");
  globalSuccess.value = `Bienvenue ${data.user.nom} !`;
  setTimeout(() => router.push({ name: "tableauBordPage" }), 800);
  return;
}
        throw new Error(response.data.message || "Réponse inattendue");
      } catch (error: any) {
        const msg = error.response?.data?.message || error.message || "Login échoué";
        if (error.response?.status === 403) {
          const data = error.response.data;
          if (data?.requireActivation) { globalError.value = "Votre email n'est pas encore vérifié."; loginForm.value?.setFieldValue("password", ""); return; }
          if (data?.approvalStatus === 'PENDING') { globalError.value = "Votre compte est en attente de validation par un administrateur."; loginForm.value?.setFieldValue("password", ""); return; }
          if (data?.approvalStatus === 'REJECTED') { globalError.value = "Votre demande d'inscription a été refusée."; loginForm.value?.setFieldValue("password", ""); return; }
        }
        globalError.value = msg;
        loginForm.value?.setFieldValue("password", "");
      }
    };

    const sendOtp = async () => {
      const userId = loginUserId.value || registerUserId.value;
      if (!userId) { globalError.value = "Impossible de renvoyer le code."; return; }
      try {
        await ApiService.post("/sendOtp", { userId, purpose: loginUserId.value ? "login" : "inscription", channel: "email" });
        globalSuccess.value = "Un nouveau code vous a été envoyé !"; startOtpCooldown(120);
        otp.value = []; registerOtp.value = []; globalError.value = null;
        setTimeout(() => globalSuccess.value = null, 5000);
      } catch (err: any) {
        const msg = err.response?.data?.message || "Erreur lors du renvoi";
        globalError.value = msg;
        if (msg.includes("patienter") || msg.includes("minute")) startOtpCooldown(120);
      }
    };

    const verifyOtpLogin = async () => {
      if (!loginUserId.value || otp.value.join("").length !== 6) { globalError.value = "Veuillez saisir 6 chiffres"; return; }
      try {
        const response = await ApiService.post("/verifyOtp", { userId: loginUserId.value, otp: otp.value.join(""), purpose: "login" });
        if (response.data.code === 200 || response.data.success) {
          const data = response.data.data || response.data;
          localStorage.setItem("id_token", data.token || data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken || "");
          const authStore = useAuthStore();
          authStore.login(data.user);
          JwtService.saveUser(data.user.id);
          JwtService.saveUserName(data.user.nom || data.user.prenom || "");
          JwtService.setUserEmail(data.user.email || "");
          JwtService.saveUserPhone(data.user.telephone || "");
          localStorage.setItem("user_role", JSON.stringify(data.user.roles || []));
          localStorage.setItem("user_privilege", JSON.stringify(data.user.permissions || []));
          JwtService.saveRole(JSON.stringify(data.user.roles || []));
          JwtService.savePrivilege(JSON.stringify(data.user.permissions || []));
          const nomComplet = data.user.nom ? `${data.user.nom} ${data.user.prenom || ''}`.trim() : data.user.email;
          globalSuccess.value = `Connexion réussie ! Bienvenue ${nomComplet} !`;
          showOtpModal.value = false; otp.value = Array(6).fill('');
          setTimeout(() => router.push({ name: "tableauBordPage" }), 800);
        } else {
          globalError.value = response.data.message || "Code OTP incorrect";
        }
      } catch (error: any) {
        globalError.value = error.response?.data?.message || "Code invalide ou expiré";
      }
    };

    const verifyOtpRegister = async () => {
      if (!registerUserId.value || registerOtp.value.join("").length !== 6) { globalError.value = "Veuillez saisir 6 chiffres"; return; }
      try {
        const response = await ApiService.post("/verifyOptInscription", { userId: registerUserId.value, otp: registerOtp.value.join(""), purpose: "inscription" });
        if (response.data.code === 200 || response.data.success) {
          globalSuccess.value = "Votre email a été vérifié ! Redirection vers la connexion...";
          stopOtpCooldown();
          showRegisterOtpModal.value = false;
          registerOtp.value = [];
          registerUserId.value = null;
          setTimeout(() => {
            isLoginActive.value = true;
            currentStep.value = 1;
            registerForm.value?.resetForm();
          }, 3000);
        } else {
          globalError.value = response.data.message || "Code OTP incorrect";
        }
      } catch (error: any) {
        globalError.value = error.response?.data?.message || "Code invalide ou expiré";
      }
    };

    const onSubmitRegister = async (values: any) => {
      globalError.value = null; globalSuccess.value = null;
      try {
        const fd = new FormData();
        fd.append("nomOrganisation", values.orgName);
        fd.append("typeOrganisationCode", values.orgType);
        fd.append("emailOrganisation", values.orgEmail);
        fd.append("telephoneOrganisation", values.orgPhone ?? "");
        fd.append("fax", values.fax ?? "");
        fd.append("adresse", values.address);
        fd.append("ville", values.city);
        fd.append("codePostal", values.postalCode ?? "");
        fd.append("paysCode", values.countryCode);
        fd.append("siteweb", values.website ?? "");
        fd.append("ifu", values.taxNumber ?? "");
        fd.append("rccm", values.rccmNumber ?? "");
        fd.append("orgCategory", values.orgCategory ?? "");
        fd.append("typeDocument", values.typeDocument);
        fd.append("message", values.message ?? "");
        fd.append("vehicules", JSON.stringify(transports.value));
        fd.append("nom", values.nom);
        fd.append("prenom", values.prenom);
        fd.append("email", values.email);
        fd.append("statut", values.statut);
        fd.append("telephone", values.telephone);
        fd.append("telecopieur", values.telecopieur ?? "");
        fd.append("sexe", values.sexe ?? "");
        fd.append("numeroNational", values.numeroNational ?? "");
        fd.append("password", values.password);
        fd.append("confirm_password", values.confirm_password);

        if (documentFile.value) {
          fd.append("document", documentFile.value);
        } else if (myDropzone?.files.length) {
          fd.append("document", myDropzone.files[0]);
        } else {
          globalError.value = "Veuillez joindre un document justificatif.";
          currentStep.value = 3;
          return;
        }

        const response = await ApiService.vueInstance.axios.post("/auth/register", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        console.log("RESPONSE REGISTER:", response.data);

        // Gestion robuste de la réponse — plusieurs structures possibles
        const userId = response.data?.data?.userId
          || response.data?.data?.id
          || response.data?.userId
          || response.data?.id
          || null;

        console.log("userId extrait:", userId);

        if (!userId) {
          // L'inscription a réussi mais pas d'OTP — on bascule vers login
          globalSuccess.value = "Inscription enregistrée ! Vous pouvez maintenant vous connecter.";
          setTimeout(() => {
            isLoginActive.value = true;
            currentStep.value = 1;
            registerForm.value?.resetForm();
            globalSuccess.value = null;
          }, 3000);
          return;
        }

        registerUserId.value = userId;
        globalSuccess.value = "Inscription réussie ! Vérifiez votre email pour le code OTP.";
       
        showRegisterOtpModal.value = true;
        setTimeout(() => globalSuccess.value = null, 5000);
      } catch (error: any) {
        globalError.value = error.response?.data?.message || "Erreur lors de l'inscription. Veuillez réessayer.";
      }
    };

    watch(globalError, (v) => { if (v) setTimeout(() => globalError.value = null, 5000); });
    watch(isLoginActive, () => { globalError.value = null; });
    onUnmounted(() => { myDropzone?.destroy(); });

    return {
      isLoginActive, toggleSlide, loginForm, registerForm,
      loginSchema, registerSchema, onSubmitLogin, onSubmitRegister,
      currentStep, totalSteps, nextStep, prevStep,
      transports, showTransportModal, currentTransport, editingTransportIndex,
      transportModalError, openTransportModal, editTransport, removeTransport, saveTransport,
      orgTypeOptions, paysOptions, villesOptions, loadingOrgTypes, loadingPays, loadingVilles,
      statutOptions, sexeOptions, documentOptions,
      transportAssetOptions, typeMotorOptions, fuelTypeOptions,
      showOtpModal, showRegisterOtpModal, otp, registerOtp, otpCode,
      isLoginDisabled, sendOtp, verifyOtpLogin, verifyOtpRegister,
      boxes, setOtpRef, jumpToNext, jumpBack, handlePaste,
      jumpNext, jumpToBack, Pastehandle,
      showPassword, togglePassword, selectedCountryCode,
      globalError, globalSuccess, selectedDocumentLabel,
      telephone, values, onTelInput, onPaysChange, stopOtpCooldown,
    };
  },
});
</script>

<style scoped>
.section-title {
  font-size: 0.95rem; font-weight: 700; color: #0b4899;
  border-bottom: 2px solid #e8edf8; padding-bottom: 6px; margin-bottom: 4px;
}
.transport-list { display: flex; flex-direction: column; gap: 10px; }
.transport-card { border: 1px solid #d0ddf5; border-radius: 12px; background: #f4f7ff; overflow: hidden; }
.transport-card-header { display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; background: #e8edf8; }
.transport-badge { font-size: 0.9rem; font-weight: 600; color: #0b4899; }
.transport-card-body { display: flex; flex-wrap: wrap; gap: 8px 20px; padding: 10px 14px; font-size: 0.85rem; color: #444; }
.empty-transport { text-align: center; padding: 40px 20px; background: #f8f9fa; border-radius: 12px; border: 2px dashed #d0ddf5; }
.btn-add-transport { background: #0b4899; color: white; border-radius: 10px; padding: 10px 24px; font-size: 0.95rem; border: none; transition: background 0.2s; }
.btn-add-transport:hover { background: #0a3d80; color: white; }
.transport-modal-card { max-width: 700px !important; }
.recap-section { background: #f8f9fa; border-radius: 12px; padding: 16px; border: 1px solid #e0e0e0; }
.recap-section-title { font-size: 0.95rem; font-weight: 700; color: #0b4899; margin-bottom: 12px; border-bottom: 1px solid #d0ddf5; padding-bottom: 6px; }
.recap-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px 20px; }
.recap-item { background: white; border-radius: 8px; padding: 10px 14px; font-size: 0.9rem; border: 1px solid #e0e0e0; word-break: break-word; }
@media (max-width: 700px) { .recap-grid { grid-template-columns: 1fr; } }
</style>

<style>
body { background: #dfe7f6; font-family: "Poppins", sans-serif; }
.container-box { max-width: 1200px; width: 100%; background: white; border-radius: 25px; overflow: hidden; display: flex; flex-direction: row; box-shadow: 0 5px 25px rgba(0,0,0,0.1); min-height: 530px; }
.forms-column { flex: 1; padding: 40px 30px; display: flex; flex-direction: column; justify-content: flex-start; transition: width 0.3s cubic-bezier(.4,2,.6,1), max-width 0.3s cubic-bezier(.4,2,.6,1); max-height: calc(100vh - 60px); overflow-y: auto; }
.forms-column.register-wide { width: 1100px; max-width: 1100px; }
.forms-column.login-narrow { width: 400px; max-width: 400px; }
.fo { display: flex; flex-direction: column; justify-content: center; align-items: stretch; width: 100%; }
.form-header { text-align: center; padding-top: 15px !important; margin-top: 0 !important; }
.form-content { flex: 1 1 auto; padding-right: 10px; }
.form-box { width: 100%; max-width: 1200px; background: white; }
.logo-img { width: 200px; height: 50px; object-fit: contain; display: block; margin: 0 auto !important; transform: translateY(-15px); }
.panel { width: 320px; background: #2d6e499a; color: white; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 40px; min-width: 260px; }
.panel-title { font-size: 22px; margin-bottom: 8px; }
.panel-sub { margin-bottom: 20px; }
.form-control { border-radius: 10px; height: 44px; width: 100%; min-width: 0; box-sizing: border-box; font-size: 1rem; }
textarea.form-control { min-height: 90px !important; height: auto !important; }
.input-box { position: relative; margin-bottom: 12px; }
.input-box i { position: absolute; left: 5px; top: 50%; transform: translateY(-50%); color: gray; pointer-events: none; }
.input-box .password-eye { right: 12px; left: auto !important; pointer-events: auto; cursor: pointer; z-index: 10; }
.input-box .form-control { padding-left: 38px; padding-right: 38px; }
.stepper { gap: 8px; flex-wrap: wrap; }
.step { display: flex; flex-direction: column; align-items: center; gap: 6px; flex: 1; max-width: 120px; }
.step-circle { width: 40px; height: 40px; border-radius: 50%; background: #e0e0e0; color: #999; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 15px; transition: all 0.3s ease; border: 3px solid #e0e0e0; }
.step.active .step-circle, .step.completed .step-circle { background: #6f92f7; color: white; border-color: #6f92f7; }
.step.completed .step-circle { background: #28a745; border-color: #28a745; }
.step-label { font-size: 11px; color: #666; text-align: center; }
.step.active .step-label { color: #6f92f7; font-weight: 600; }
.step-line { flex: 1; height: 2px; background: #e0e0e0; margin-top: 20px; transition: background 0.3s; }
.step-line.completed { background: #28a745; }

/* DROPZONE MINI — reste petite même après ajout du fichier */
.custom-dropzone-mini {
  border: 2px dashed #9c9c9c;
  border-radius: 10px;
  background: #fafafa;
  padding: 6px 14px;
  cursor: pointer;
  min-height: 46px;
  max-height: 56px;
  display: flex;
  align-items: center;
  overflow: hidden;
  flex-wrap: nowrap;
  gap: 8px;
}
.custom-dropzone-mini .dz-message {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0;
  font-size: 0.85rem;
  white-space: nowrap;
}
.custom-dropzone-mini .dz-preview {
  margin: 0 !important;
  min-height: unset !important;
  display: flex !important;
  align-items: center;
}
.custom-dropzone-mini .dz-preview .dz-image { display: none !important; }
.custom-dropzone-mini .dz-preview .dz-details { display: none !important; }
.custom-dropzone-mini .dz-preview .dz-progress { display: none !important; }
.custom-dropzone-mini .dz-preview .dz-error-mark { display: none !important; }
.custom-dropzone-mini .dz-preview .dz-success-mark { display: none !important; }
.dz-mini-info {
  display: flex;
  align-items: center;
  font-size: 0.82rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}
.dz-mini-info .dz-filename { max-width: 200px; overflow: hidden; text-overflow: ellipsis; }
.disabled-dropzone { opacity: 0.5; pointer-events: none; cursor: not-allowed; }

.alert-danger { background: #f8d7da; color: #721c24; border: none; padding: 12px 18px; font-size: 14px; }
.alert-success { background: #d1e7dd; color: #0f5132; border: none; padding: 12px 18px; font-size: 14px; }
.fade-enter-active, .fade-leave-active { transition: all 0.35s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-10px); }
.slide-fade-enter-active, .slide-fade-leave-active { transition: all 0.4s ease; }
.slide-fade-enter-from { opacity: 0; transform: translateX(40px); }
.slide-fade-leave-to { opacity: 0; transform: translateX(-40px); }
.my-ultimate-otp-modal { position: fixed !important; inset: 0 !important; background: rgba(0,0,0,0.7) !important; display: flex !important; align-items: center !important; justify-content: center !important; z-index: 99999 !important; backdrop-filter: blur(8px) !important; }
.my-ultimate-otp-card { background: white !important; border-radius: 16px !important; width: 95% !important; max-width: 500px !important; box-shadow: 0 20px 50px rgba(0,0,0,0.3) !important; overflow: hidden !important; animation: pop 0.3s ease-out !important; }
.my-ultimate-otp-card .header { padding: 18px 24px 12px !important; display: flex !important; justify-content: space-between !important; align-items: center !important; border-bottom: 1px solid #eee !important; }
.my-ultimate-otp-card .body { padding: 24px !important; text-align: center !important; }
.my-ultimate-otp-card .footer { padding: 14px 24px !important; display: flex !important; justify-content: center !important; gap: 10px !important; background: #f8f9fa !important; border-top: 1px solid #eee !important; }
.my-ultimate-otp-card .footer .btn { padding: 8px 14px; font-size: 14px; }
@keyframes pop { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
.otp-container { display: flex; gap: 12px; justify-content: center; margin: 20px 0; }
.otp-input { width: 52px; height: 52px; text-align: center; font-size: 22px; font-weight: bold; border: 2px solid #ddd; border-radius: 12px; transition: all 0.2s; background: white; color: #333; }
.otp-input:focus { outline: none; border-color: #0b4899; box-shadow: 0 0 0 3px rgba(11,72,153,0.15); transform: scale(1.05); }
.tel-input-fix .vti__input { height: 40px; border-radius: 5px; padding: 0.375rem 0.75rem; font-size: 1rem; }
@media (max-width: 1200px) { .forms-column.register-wide { width: 100%; max-width: 100%; } }
@media (max-width: 860px) {
  .container-box { flex-direction: column; border-radius: 16px; min-height: unset; }
  .forms-column { width: 100% !important; max-width: 100% !important; padding: 20px 12px; max-height: none; overflow-y: visible; }
  .panel { width: 100%; min-width: unset; border-radius: 0 0 16px 16px; padding: 24px 12px; }
  .step-label { font-size: 9px; }
}
@media (max-width: 480px) {
  .otp-input { width: 44px; height: 44px; font-size: 18px; }
  .otp-container { gap: 6px; }
  .step-circle { width: 30px; height: 30px; font-size: 12px; }
}
</style>

