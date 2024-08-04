<script setup lang="ts">
import wasSuccessfullySendSVG from '@/assets/wasSuccessfullySend.svg'
import noImgSVG from '@/assets/noImage.svg'
import preloaderSVG from '@/assets/preloader.svg'
import warningSVG from '@/assets/warning.svg'

import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

import StyleButton from '@/components/buttons/StyleButton.vue'
import TextInput from '@/components/inputs/TextInput.vue'
import FileInput from '@/components/inputs/FileInput.vue'
import PageWrapper from '@/components/PageWrapper.vue'

import { useCounterStore } from '@/stores/contactUs'

const contactUs = useCounterStore()
const { t } = useI18n()

const wasSuccessfullySend = ref(false)
const name = ref<string>('')
const email = ref<string>('')
const phone = ref<string>('')
const interest = ref<string>('')
let image = ref<File | undefined>(undefined)

function selectFiles(files: FileList) {
  image.value = files?.[0]
}
const SERVER_URL = APP_SERVER_URL

const isAllowedToSend = ref(false)

function checkIsAllowedToSend(event: Event) {
  if (event.currentTarget instanceof HTMLFormElement) {
    isAllowedToSend.value = event.currentTarget.checkValidity()
  }
}

function appeal(event: Event) {
  if (event.currentTarget instanceof HTMLFormElement) {
    if (event.currentTarget.checkValidity()) {
      let formData = new FormData()
      formData.append('name', name.value)
      formData.append('email', email.value)
      formData.append('phone', phone.value.replace(/\D/g, ''))
      formData.append('interest', interest.value)

      if (image.value) formData.append('image', image.value)

      contactUs.postAppellant(formData).then((response: Response) => {
        if (response.ok) {
          wasSuccessfullySend.value = true
          contactUs.fetchAppellants(contactUs.currentOffset)
        }
      })
    }
  }
}

onMounted(async () => {
  contactUs.fetchAppellants()
})
</script>
<template>
  <PageWrapper>
    <header>
      <div class="logo">
        <svg viewBox="150.75 124.44 538.78 291.4" xmlns="http://www.w3.org/2000/svg">
          <path
            d="m241.11 308.74q-1.73-1.26-3.17-1.71c-30.3-9.66-50.12-16.1-74.16-27.02-4.49-2.04-18.47-8.58-10.74-14.23q8.24-6.03 22.32-9.85c21.22-5.76 39.22-4.85 64.47-3.35a1.05 1.04 78.2 0 0 0.99-1.52c-12.19-23.8-16.18-52.03-16.44-78.56q-0.19-19.03 4.43-37.49c5.76-23.03 18.88-2.23 24.08 5.67q18.57 28.17 44.49 49.92 4.65 3.9 9.84 7.07 0.51 0.3 0.07 0.7c-8.14 7.47-13.4 13.71-18.11 23.67a0.25 0.25 0 0 0 0.37 0.31c14.05-10.92 29.34-18.31 46.72-23.06 34.91-9.56 70.76-10.81 108.04-9.12 33.94 1.53 68.84 7.36 97.86 26.19q3.98 2.58 7.14 5.56a0.5 0.49 12.1 0 0 0.81-0.52c-3.26-9.43-9.87-16.62-17.35-22.9q-0.44-0.37 0.05-0.67 4.25-2.58 8.01-5.73 20.94-17.59 37.46-39.24c3.99-5.23 19.21-31.37 26.88-28.14 3.14 1.33 5.32 7.32 6.09 10.27 6.89 26.34 5.19 54.97-0.29 81.75q-3.84 18.78-12.03 35.05-0.27 0.53 0.32 0.62 1.8 0.29 3.49 0.13c28.08-2.7 60.31-2.52 84.47 13.42 7.67 5.06-5.78 11.57-10.3 13.63q-28.72 13.13-58.95 22.34-9.81 2.98-19.33 6.79-1 0.4 0.07 0.43c0.81 0.03 1.18-0.01 1.93 0.38q26.74 13.79 53.83 26.87c5.09 2.45 7.32 5.41 2.22 9.74-6.6 5.62-13.14 8.41-22.21 10.19q-28.08 5.49-56.45 7a1.33 1.33 0 0 1-1.32-1.79c0.99-2.67 2.23-5.07 2.61-7.85q1.1-8.07 1.25-14.49 0.09-3.79-1.42-0.31c-14.44 33.26-43.47 53.99-77.91 65.32-26.45 8.7-54.35 11.5-82.81 11.63-54.25 0.25-116.61-13.45-149.2-61.33-3.37-4.94-6.5-11.24-9.7-16.91q-0.39-0.69-0.48 0.1-0.14 1.21 0.35 2.31 0.2 0.46 0.18 0.95-0.37 10.96 3.65 21.1a1.06 1.06 0 0 1-0.98 1.45c-11.23 0.09-23.37-2.12-34.57-3.41-9.67-1.12-20.33-2.92-28.43-5.33-5.71-1.69-17.87-7.06-19.49-13.05q-0.13-0.47 0.16-0.88 2.39-3.29 4.33-4.16 26.8-12.1 48.98-23.91 4.38-2.32 7.81-3.52 0.53-0.18 0.07-0.51zm87.184-17.381a21.53 21.22 90.6 0 0 21.444-21.307 21.53 21.22 90.6 0 0-20.993-21.751 21.53 21.22 90.6 0 0-21.444 21.307 21.53 21.22 90.6 0 0 20.993 21.751zm165.54-32.609c-13.72 20.2 12.57 43.32 31.22 27.88q5.12-4.24 6.98-10.38c4.11-13.59-6.04-24.68-18.56-27.88-6.81-1.73-16.35 5.53-19.64 10.38zm-156.79 64.87c10.72 23.2 30.93 41.25 55.72 47.37 23.84 5.89 50.83 4.65 72.9-7.09 17.92-9.53 34.06-28.8 39.86-48.36a2.03 2.02-67.6 0 0-0.98-2.36c-20.34-10.94-48.1-16.22-70.82-18.3-27.41-2.51-57.1 2.86-83.06 11.77q-8.21 2.82-15.74 6.78a1.24 1.23-18.9 0 0-0.65 1.31q0.81 4.63 2.77 8.88z"
            fill="yellow"
            stroke="black"
            stroke-width="2%"
          />
        </svg>
        <span>Vector Studio</span>
      </div>
      <div class="login">
        <StyleButton disabled>Users</StyleButton>
        <StyleButton disabled>Sign up</StyleButton>
      </div>
    </header>
  </PageWrapper>

  <PageWrapper>
    <main>
      <article class="hello">
        <div class="container">
          <h1>Why us?</h1>
          <p>
            At Vector Studio, we blend affordability with excellence. Our small yet passionate team
            crafts high-quality code that won’t break your budget. Whether it’s a personal blog, a
            startup site, or an e-commerce platform, we tailor solutions to fit your needs. Expect
            responsive communication, results-driven development, and a collaborative journey. Let’s
            build something remarkable together!
          </p>
          <StyleButton disabled>Sign up</StyleButton>
        </div>
      </article>

      <div v-if="contactUs.appellants.length > 0" class="recent">
        <h1>Recent Contacts</h1>
        <div class="container">
          <div class="grid">
            <div v-for="appellant in contactUs.appellants" :key="appellant.id" class="appellant">
              <img
                class="tile"
                v-if="appellant.image"
                v-lazy="{
                  src: SERVER_URL + 'file/' + appellant.image,
                  loading: preloaderSVG,
                  error: warningSVG
                }"
                alt="appellant image"
              />

              <div v-else class="tile photo">
                <img :src="noImgSVG" alt="No Image" />
              </div>
              <div class="text">
                {{ appellant.name }}
              </div>
              <div class="title text">{{ appellant.interest }}</div>
              <div class="text">
                {{ appellant.email }}
              </div>
              <div class="text">
                {{ appellant.phone }}
              </div>
            </div>
          </div>
          <div v-if="contactUs.currentOffset < contactUs.XTotalCount" class="center">
            <StyleButton type="button" @click="contactUs.fetchAppellants(contactUs.currentOffset)"
              >Load more</StyleButton
            >
          </div>
        </div>
      </div>

      <div v-if="wasSuccessfullySend" class="appeal">
        <h1>Great, our team will contact you soon :)</h1>
        <img class="block" :src="wasSuccessfullySendSVG" alt="wasSuccessfullySend" />
        <div class="center" v-if="wasSuccessfullySend">
          <StyleButton class="block" @click="wasSuccessfullySend = false">Back!</StyleButton>
        </div>
      </div>
      <div v-else class="appeal">
        <h1 class="block">Contact US</h1>
        <form @submit.prevent="appeal" @input="checkIsAllowedToSend">
          <TextInput
            v-model="name"
            required
            type="text"
            class="block width"
            placeholder="Name"
            name="name"
          />
          <TextInput
            v-model="email"
            required
            type="email"
            class="block width"
            placeholder="Email"
            name="email"
          />
          <TextInput
            v-model="phone"
            required
            type="phone"
            class="block width"
            placeholder="Phone"
            name="phone"
          />

          <div class="project block">
            <span>Select your field of interest</span>
            <label>
              <input
                v-model="interest"
                value="WEB Development"
                type="radio"
                name="interest"
                checked
              />
              <span class="figure"> </span>
              <span class="text">{{ t('WEB Development') }}</span>
            </label>
            <label>
              <input
                v-model="interest"
                value="PC/Mobile App Development"
                type="radio"
                name="interest"
              />
              <span class="figure"></span>
              <span class="text">{{ t('PC/Mobile App Development') }}</span>
            </label>
            <label>
              <input v-model="interest" value="AI Development" type="radio" name="interest" />
              <span class="figure"></span>
              <span class="text">{{ t('AI Development') }}</span>
            </label>
            <label>
              <input
                v-model="interest"
                value="CyberSecurity Research"
                type="radio"
                name="interest"
              />
              <span class="figure"></span>
              <span class="text">{{ t('CyberSecurity Research') }}</span>
            </label>
            <label>
              <input v-model="interest" value="Our Project Support" type="radio" name="interest" />
              <span class="figure"></span>
              <span class="text">{{ t('Our project support') }}</span>
            </label>
            <label>
              <input v-model="interest" value="Other" type="radio" name="interest" />
              <span class="figure"></span>
              <span class="text">{{ t('Other') }}</span>
            </label>
          </div>

          <FileInput
            class="block uploader"
            :placeholder="t('Upload your project image')"
            :text="t('Upload')"
            name="image"
            accept="image/*"
            :maxTotalSize="100 * 1024"
            :maxSingleSize="100 * 1024"
            @change="selectFiles"
          ></FileInput>
          <StyleButton
            class="block horizontal-center"
            type="submit"
            :pretendDisabled="!isAllowedToSend"
            >GO!</StyleButton
          >
        </form>
      </div>
    </main>
  </PageWrapper>
</template>

<style scoped lang="scss">
header {
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding: 13px 16px;
  box-sizing: border-box;
  .logo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    svg {
      margin-right: 5px;
      width: 38px;
      height: 26px;
    }
  }
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    button {
      margin: 0 5px;
      &:first-child {
        margin-left: 0;
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
main {
  h1 {
    font-family: 'Nunito';
    font-style: normal;
    font-weight: 400;
    font-size: 40px;
    line-height: 40px;

    text-align: center;
  }
  .hello {
    width: 100%;
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    background-image: url('@/assets/road.svg');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;

    .container {
      max-width: 380px;
      width: 100%;

      min-height: 500px;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 0 16px;

      font-family: 'Nunito';
      font-style: normal;
      font-weight: 400;
      text-align: center;
      margin: 21px 0px;
      color: #ffffff;

      p {
        font-size: 16px;
        line-height: 26px;
      }
    }
  }
  .recent {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h1 {
      color: rgba(0, 0, 0, 0.87);
      padding: 0 16px;
    }
    .container {
      width: 100%;
      padding: 32px;
      box-sizing: border-box;
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(344px, 1fr));
        grid-template-rows: repeat(auto-fit, 254px);
        align-items: flex-start;
        justify-items: center;
        grid-gap: 16px;
        .appellant {
          border-radius: 10px;
          width: 344px;
          height: 254px;
          padding: 20px;
          box-sizing: border-box;
          background: rgb(255, 247, 223);
          cursor: pointer;
          transition:
            box-shadow 0.2s ease-in,
            background-color 0.2s ease-in;

          &:hover {
            background: rgb(250, 235, 196);
            box-shadow:
              rgb(196, 183, 148) 0 10px 20px -10px inset,
              rgb(196, 183, 148) 0 2px 4px -2px inset;
          }
          .tile {
            display: block;
            object-fit: cover;

            width: 70px;
            height: 70px;
            border-radius: 50%;
            margin: 0 auto;

            overflow: hidden;

            position: relative;

            .tape {
              position: absolute;
              bottom: 10%;
              height: 25%;
              width: 100%;

              display: flex;
              justify-content: center;
              align-items: center;
              background: rgb(192, 76, 76);
              img {
                height: 100%;
              }
            }
          }
          .photo {
            background: white;
            border: 1px solid #aaaaaa;

            display: flex;
            justify-content: center;
            align-items: center;
            img {
              width: 50%;
              height: 50%;
            }
          }

          .text {
            width: 100%;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

            font-family: 'Nunito';
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 26px;
          }
          .title {
            margin: 20px 0;
          }
        }
      }
    }
  }
  .appeal {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1 {
      color: rgba(0, 0, 0, 0.87);
      padding: 0 16px;
    }
    form {
      max-width: 380px;
      width: 100%;

      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      padding: 16px;
      box-sizing: border-box;

      .project {
        display: flex;
        flex-direction: column;
        font-family: 'Nunito';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 26px;
        width: 300px;
        span {
          color: rgba(0, 0, 0, 0.87);
        }
        label {
          display: flex;
          align-items: center;
          margin: 3.5px 0;
          &:first-child {
            margin-top: 0;
          }
          &:first-child {
            margin-bottom: 0;
          }

          input {
            display: none;
          }

          span {
            cursor: pointer;
            transition: 0.25s;
          }
          .figure {
            height: 20px;
            width: 20px;
            border: 1px solid #d0cfcf;
            border-radius: 50%;
            position: relative;

            display: flex;
            justify-content: center;
            align-items: center;
          }
          .text {
            margin-left: 12px;
          }

          input:checked + .figure {
            border: 1px solid #00bdd3;
          }
          input + .figure::before {
            content: '';
            position: absolute;
            width: 0;
            height: 0;
            opacity: 0;
            border-radius: 50%;
            background: #00bdd3;
            transition: 0.25s;
          }
          input:checked + .figure::before {
            width: 10px;
            height: 10px;
            opacity: 1;
          }

          input:disabled ~ span {
            cursor: unset;
          }
          input:disabled + .figure {
            border: 1px solid rgba(56, 56, 56, 0.438);
          }
          input:disabled ~ .text {
            color: rgba(56, 56, 56, 0.438);
          }
        }
      }
      .uploader {
        width: 100%;
        height: 54px;
      }
      .horizontal-center {
        margin-right: auto;
        margin-left: auto;
      }
    }
    .block {
      margin-bottom: 50px;
    }
  }

  .center {
    width: 100%;
    display: flex;
    margin-top: 5px;
    justify-content: center;
    align-items: center;
  }
}
</style>
