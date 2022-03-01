/**
 * MIT License
 *
 * Copyright (c) 2022 Software AG, Darmstadt, Germany and/or its licensors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */


import {AbstractPortalElement} from '../../abstract.portal.element';
import {RequestDataService} from '../../service/request.service';
import {AllData, LEExcludingBox} from '../../model/data/alldata.model';

/**
 * This web component will add a locale icon for each of the locales configured for an API.
 * It is designed (and tested) to work only when placed on the 'API Default Box' component.
 * Right now, it will only work with a small list of locales (en, de, fr, es, jp, ru).
 */
export class ApiGalleryI18ninfo extends AbstractPortalElement {
  locales: any = {};
  currentLocale = '';
  theShadowRoot: ShadowRoot;
  allEventListeners: any[] = [];

  constructor() {
    super();
  }

  connectedCallback() {
    this.theShadowRoot = this.attachShadow({ mode: 'open' });
  }

  async render(): Promise<any> {
    const service = new RequestDataService();
    if (this.getData().id && this.checkIfValidUUID(this.getData().id)) {
      // retrieve the locale information configured for this API
      const thisData: AllData = await service.getAsJSON(
        '/portal/rest/v1/apis/' + this.getData().id + '/i18n'
      );
      const apiLocales: string[] = [];
      if (thisData.summary && thisData.summary.localStrings) {
        for (const item in thisData.summary.localStrings) {
          apiLocales.push(item);
        }
      }

      const rootDiv = document.createElement('div');
      rootDiv.className = 'i18n-wrapper';

      apiLocales.forEach((l) => {
        const localeItem = document.createElement('span');
        // listen to the click events to swith locale in the title/summary/description of the api
        localeItem.addEventListener('click', (evt) => {
          evt.preventDefault();
          this.switchLocale(l);
        });

        // localeItem.innerText = l;
        const country = l.substring(l.indexOf('_') + 1);
        localeItem.className = 'fi fi-' + country.toLowerCase();
        rootDiv.appendChild(localeItem);

        // store name, summary and description for later usage
        this.locales[l] = {
          name: thisData.name.localStrings[l as LEExcludingBox],
          summary: thisData.summary.localStrings[l as LEExcludingBox],
          description: thisData.description.localStrings[l as LEExcludingBox],
        };
      });
      // to enable more locales, the list below should be enhanced with the needed fi-* and fi-*.fis classes
      this.shadowRoot.innerHTML = `
                <style>
                    .i18n-wrapper {
                        text-align: right;
                    }
                    .fi {
                        background-size: contain;
                        background-position: 50%;
                        background-repeat: no-repeat;
                        position: relative;
                        display: inline-block;
                        width: 1.33333333em;
                        line-height: 1em;
                        margin: 0 2px;
                    }
                    .fi:before {
                        content: '\\00a0';
                    }
                    .fi.fis {
                        width: 1em;
                    }
                    .fi-de {
                        background-image: url(https://raw.githubusercontent.com/lipis/flag-icons/main/flags/4x3/de.svg);
                    }
                    .fi-de.fis {
                        background-image: url(https://raw.githubusercontent.com/lipis/flag-icons/main/flags/4x3/de.svg);
                    }
                    .fi-fr {
                        background-image: url(https://raw.githubusercontent.com/lipis/flag-icons/main/flags/4x3/fr.svg);
                    }
                    .fi-fr.fis {
                        background-image: url(https://raw.githubusercontent.com/lipis/flag-icons/main/flags/4x3/fr.svg);
                    }
                    .fi-us {
                        background-image: url(https://raw.githubusercontent.com/lipis/flag-icons/main/flags/4x3/us.svg);
                    }
                    .fi-us.fis {
                        background-image: url(https://raw.githubusercontent.com/lipis/flag-icons/main/flags/4x3/us.svg);
                    }
                    .fi-es {
                        background-image: url(https://raw.githubusercontent.com/lipis/flag-icons/main/flags/4x3/es.svg);
                    }
                    .fi-es.fis {
                        background-image: url(https://raw.githubusercontent.com/lipis/flag-icons/main/flags/4x3/es.svg);
                    }
                    .fi-jp {
                        background-image: url(https://raw.githubusercontent.com/lipis/flag-icons/main/flags/4x3/jp.svg);
                    }
                    .fi-jp.fis {
                        background-image: url(https://raw.githubusercontent.com/lipis/flag-icons/main/flags/4x3/jp.svg);
                    }
                    .fi-ru {
                        background-image: url(https://raw.githubusercontent.com/lipis/flag-icons/main/flags/4x3/ru.svg);
                    }
                    .fi-ru.fis {
                        background-image: url(https://raw.githubusercontent.com/lipis/flag-icons/main/flags/4x3/ru.svg);
                    }
                </style>`;
      this.shadowRoot.appendChild(rootDiv);
    } else {
      console.debug(
        '+-+ api-gallery-i18n: no api id found to check for locales... only an empty box will be rendered'
      );
      const rootHtml = document.createElement('div');
      rootHtml.className = 'i18n-wrapper';
      rootHtml.innerHTML = 'i18n locale icons';
      this.shadowRoot.innerHTML = `
                <style>
                    .i18n-wrapper {
                        border: 1px solid #000011;
                    }
                </style>`;
      this.shadowRoot.appendChild(rootHtml);
    }
  }
  doSwitch(event: any, localeCode: string, me: any) {
    event.preventDefault();
    this.switchLocale(localeCode);
  }

  switchLocale(l: any) {
    // go up the html tree to match the api name element
    const apiTitleElement = this.getClosestBySelector(
      this,
      `yap-div > yap-link[data-yap-name="${this.getData().name}"]`
    );
    if (apiTitleElement !== null) {
      const linkElement = apiTitleElement.querySelector('a');
      if (linkElement !== null) {
        linkElement.textContent = this.locales[l].name;
      }
      const summaryElement =
        apiTitleElement.parentElement.querySelector('yap-paragraph p');
      if (summaryElement !== null) {
        summaryElement.textContent = this.locales[l].summary;
      }
    }
  }

  getClosestBySelector(elem: any, selector: string) {
    for (; elem && elem !== document; elem = elem.parentNode) {
      const found = elem.querySelector(selector);
      if (found != null) return found;
    }
    return null;
  }
  private checkIfValidUUID(str: string) {
    // Regular expression to check if string is a valid UUID
    const regexExp =
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

    return regexExp.test(str);
  }
}
